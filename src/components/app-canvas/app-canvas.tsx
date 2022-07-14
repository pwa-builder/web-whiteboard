import { Component, Element, Prop, State, Watch, Method, h } from '@stencil/core';
import { toastController as toastCtrl, alertController as alertCtrl, toastController, alertController } from '@ionic/core';

import { debounce } from "typescript-debounce-decorator";
import { set, get, del } from 'idb-keyval';
import { fileSave } from 'browser-nativefs';

import { findLocalImage, doAI, getInkInfo } from '../../canvas.worker';
import { randoRoom } from '../../helpers/utils';


declare var ClipboardItem;
declare var io: any;

@Component({
  tag: 'app-canvas',
  styleUrl: 'app-canvas.css'
})
export class AppCanvas {

  @Element() el: HTMLElement;

  @Prop() color: string = '#000000';
  @Prop() mode: string = 'pen';
  @Prop() savedDrawing: string | null = null;
  @Prop({ mutable: true }) dragMode: boolean = false;

  @State() drawing: boolean = true;
  @State() copyingText: boolean = false;
  @State() openContextMenu: boolean = false;
  @State() doDrag: boolean = false;
  @State() saving: boolean = false;
  @State() inkShape: boolean = false;
  @State() room: string | null = null;

  canvasElement: HTMLCanvasElement;
  gridCanvas: HTMLCanvasElement;
  gridContext: CanvasRenderingContext2D;
  context: CanvasRenderingContext2D;
  dragCanvasElement: HTMLCanvasElement;
  dragContext: CanvasRenderingContext2D;
  contextElement: HTMLDivElement;
  fileHandle: any;
  fileWriter: any;
  contextAnimation: Animation;
  rect: any;
  timerId: number;
  offscreen = null;
  gridWorker = null;
  dragToast: HTMLIonToastElement;
  socket: any = null;
  presenter: any = null;

  waveforms = {
    click: 4099,
    buzz_continuous: 4100,
    rumble_continuous: 4101,
    press: 4102,
    release: 4103,
    hover: 4104,
    success: 4105,
    error: 4106,
    ink_continuous: 4107,
    pencil_continuous: 4108,
    marker_continuous: 4109,
    chisel_marker_continuous: 4110,
    brush_continuous: 4111,
    eraser_continuous: 4112,
    first_custom_vendor_defined: 10752,
    second_custom_vendor_defined: 8479,
    galaxy_pen_continuous: 4113,
  };

  async componentDidLoad() {
    window.addEventListener('resize', () => {
      console.log('resizing');
      this.resizeCanvas();
    });

    (window as any).requestIdleCallback(async () => {
      await this.setupCanvas();
    });

    this.setupEvents();

    if (location.search === "?startLive") {
      await this.liveConnect();
    }

    const canvasState = await (get('canvasState') as any);
    if (canvasState) {
      const tempImage = new Image();
      tempImage.onload = () => {
        this.context.drawImage(tempImage, 0, 0);
      }
      tempImage.src = canvasState;
    }
  }

  setupEvents() {
    this.canvasElement.oncontextmenu = async (event: any) => {
      event.preventDefault();

      this.mode = 'stop';

      this.openContextMenu = true;

      setTimeout(() => {
        this.contextElement.style.top = `${event.clientY}px`;
        this.contextElement.style.left = `${event.clientX}px`;

        this.contextAnimation = this.contextElement.animate([
          { transform: 'translateY(0)', opacity: 0 },
          { transform: 'translateY(20px)', opacity: 1 }
        ], {
          duration: 100,
          fill: 'both'
        })
      }, 40);


      let that = this;
      this.canvasElement.addEventListener('click', async function handler() {
        that.contextAnimation.reverse();

        that.contextAnimation.onfinish = () => {
          that.openContextMenu = false;

          that.mode = 'pen';
        }

        that.canvasElement.removeEventListener('click', handler);
      });
    }
  }

  @Method()
  async resizeCanvas(width?: number, height?: number) {
    const canvasState = await (get('canvasState') as any);

    this.context.canvas.width = width || window.innerWidth;
    this.context.canvas.height = height || window.innerHeight;

    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);

    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';
    this.context.strokeStyle = this.color;
    this.context.lineWidth = 4;

    this.rect = this.canvasElement.getBoundingClientRect();

    if (canvasState) {
      const tempImage = new Image();
      tempImage.onload = () => {
        this.context.drawImage(tempImage, 0, 0);
      }
      tempImage.src = canvasState;
    }

    await this.getInkPresenter();
  }

  async getInkPresenter() {
    if ((navigator as any).ink) {
      const options = { presentationArea: this.canvasElement };
      console.log(options);

      try {
        this.presenter = await (navigator as any).ink.requestPresenter(options);
      }
      catch (err) {
        console.error("You are probably on Edge Stable with the ink flag turned on, this impl is broken");
      }
    }
  }

  async pasteImage(ev) {
    console.log(ev);
    this.contextAnimation.reverse();

    this.contextAnimation.onfinish = () => {
      console.log('in here');
      this.openContextMenu = false;
    }

    const clipboardItems = await (navigator.clipboard as any).read();
    console.log(clipboardItems);

    if (clipboardItems) {

      try {
        let blobOutput = null;

        blobOutput = await clipboardItems[0].getType('image/png');

        if (blobOutput) {
          const imageURL = window.URL.createObjectURL(blobOutput);

          const tempImage = new Image();
          tempImage.onload = () => {
            this.context.drawImage(tempImage, ev.clientX, ev.clientY);
          }
          tempImage.src = imageURL;

        }
      }
      catch (err) {
        let textOutput = null;

        textOutput = await clipboardItems[0].getType('text/plain');
        console.log(clipboardItems[0]);
        console.log(textOutput);

        if (textOutput) {
          const reader = new FileReader();
          reader.onload = async () => {
            await this.addTextToCanvas(ev, reader.result);
          }
          reader.readAsText(textOutput);
        }
      }
    }
  }

  async insertText(ev) {
    console.log('insert', ev);

    this.contextAnimation.reverse();

    this.contextAnimation.onfinish = () => {
      console.log('in here');
      this.openContextMenu = false;
    }

    const alert = await alertController.create({
      header: "Add Text",
      message: "Enter the text you would like to add to this board",
      inputs: [
        {
          name: 'insertText',
          type: 'textarea',
          placeholder: 'Some text to add'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Add',
          handler: (data) => {
            console.log('Confirm Okay', data.insertText);
            this.addTextToCanvas(ev, data.insertText);
          }
        }
      ]
    });
    await alert.present();
  }

  addTextToCanvas(ev, textToInsert) {
    this.mode = 'something';

    console.log(ev, textToInsert);

    this.context.fillStyle = 'black';

    if (ev) {
      this.context.fillText(textToInsert, ev.clientX, ev.clientY);
    }

    this.mode = "pen";
  }

  copyImage() {
    this.contextAnimation.reverse();

    this.contextAnimation.onfinish = () => {
      this.openContextMenu = false;
    }

    this.canvasElement.toBlob(async (blob) => {
      await (navigator.clipboard as any).write([
        new ClipboardItem(Object.defineProperty({}, blob.type, {
          value: blob,
          enumerable: true
        }))
      ]);
    });
  }

  @Watch('savedDrawing')
  handleSaved() {
    console.log(this.savedDrawing);
    let tempImage = new Image();
    tempImage.onload = async () => {
      console.log('image loaded');
      await this.clearCanvas();

      this.context.drawImage(tempImage, 0, 0);

      let canvasState = this.canvasElement.toDataURL();
      await set('canvasState', canvasState);

      tempImage = null
    }
    tempImage.src = this.savedDrawing;
  }

  @Method()
  async shareCanvas() {
    this.canvasElement.toBlob(async (blob) => {
      console.log(blob);

      const file = new File([blob], "default.png", { type: blob.type });

      if ((navigator as any).canShare && (navigator as any).canShare(file)) {
        try {
          await (navigator as any).share({
            files: [file],
            title: 'Whiteboard',
            text: 'Check out this whiteboard from WebBoard https://webboard-app.web.app',
          })
        }
        catch(err) {
          console.error(err);
        }
      } else {
        console.log('Your system doesn\'t support sharing files.');

        await (navigator.clipboard as any).write([
          new ClipboardItem({
            [blob.type]: blob
          })
        ]);

        const toast = await toastController.create({
          message: "board copied to clipboard",
          duration: 1800
        });
        await toast.present();
      }

    });
  }

  @Watch('color')
  changeColor() {
    console.log(this.color);
    this.context.strokeStyle = this.color;
  }

  @Watch('mode')
  checkMode() {
    console.log(this.mode);
  }

  @Watch('dragMode')
  checkDrag() {
    if (this.dragMode === true) {
      console.log(this.dragMode);

      console.log('inside drag');
      const drawImage = this.canvasElement.toDataURL();

      setTimeout(() => {
        this.dragCanvasElement.width = window.innerWidth;
        this.dragCanvasElement.height = window.innerHeight;

        this.dragContext = this.dragCanvasElement.getContext("2d");

        console.log(drawImage);

        let tempImage = new Image();
        tempImage.onload = async () => {
          console.log('image loaded');
          this.dragContext.drawImage(tempImage, 0, 0);

          tempImage = null
        }
        tempImage.src = drawImage;

        console.log(this.dragContext);
        return;
      }, 50);
    }
    else {
      const drawImage = this.dragCanvasElement.toDataURL();


      setTimeout(() => {
        this.setupCanvas();

        // this.canvasElement.style.display = 'none';
        console.log(this.canvasElement);

        let tempImage = new Image();
        tempImage.onload = async () => {
          console.log('image loaded');
          this.context.drawImage(tempImage, 0, 0);

          URL.revokeObjectURL(drawImage);

          tempImage = null
        }
        tempImage.src = drawImage;
      }, 50);
    }
  }

  @Method()
  async clearCanvas() {
    this.fileHandle = null;
    this.fileWriter = null;

    this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);

    if (this.savedDrawing) {
      this.savedDrawing = null;
    }

    return await del('canvasState');
  }

  @Method()
  async liveConnect() {
    const alert = await alertCtrl.create({
      header: "Live Session",
      message: "Start a live session and draw in real time with a teammate? If you already have a session ID you can input it below to join.",
      inputs: [
        {
          name: 'sessionID',
          type: 'text',
          placeholder: 'Enter your session ID'
        },
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Start",
          handler: async (data) => {
            const nav = document.querySelector('ion-nav');

            if (data.sessionID) {
              const navCtrl: HTMLIonRouterElement = await (nav as any).componentOnReady();
              await navCtrl.push(`/live/${data.sessionID}`);
            }
            else {
              const room = randoRoom();

              const navCtrl: HTMLIonRouterElement = await (nav as any).componentOnReady();
              await navCtrl.push(`/live/${room}`);
            }
          }
        }
      ],
      backdropDismiss: false
    });
    await alert.present();
  }

  socket_connect(room: any) {
    return io('https://live-canvas-server.azurewebsites.net/', {
      query: 'r_var=' + room
    });
  }

  setupLiveEvents() {
    const secondCanvas: HTMLCanvasElement | null | undefined = this.el?.querySelector('#secondCanvas');
    const secondContext = secondCanvas?.getContext("bitmaprenderer");

    if (secondCanvas) {
      secondCanvas.width = window.innerWidth;
      secondCanvas.height = window.innerHeight;
    }

    const thirdContext = this.context;

    let offscreenContext;
    let offscreen;

    if ('OffscreenCanvas' in window) {
      // @ts-ignore
      offscreen = new OffscreenCanvas(window.innerWidth, window.innerHeight);
      offscreenContext = offscreen.getContext('2d');
    }

    if (offscreenContext) {
      offscreenContext.font = '20px sans-serif';
    }

    this.socket.on('drawing', (data: any) => {
      if (thirdContext) {
        thirdContext.strokeStyle = data.color;

        thirdContext.globalCompositeOperation = data.globalCompositeOperation;

        if (data.pointerType === 'pen') {
          let tweakedPressure = data.pressure * 6;
          thirdContext.lineWidth = data.width + tweakedPressure;
        }

        else if (data.pointerType === 'touch') {
          thirdContext.lineWidth = data.width - 20;
        }
        else if (data.pointerType === 'mouse') {
          thirdContext.lineWidth = 4;
        }

        if (data.globalCompositeOperation === 'destination-out') {
          thirdContext.lineWidth = 18;
        }

        if (data.user && offscreenContext) {
          offscreenContext?.fillText(data.user, data.x0 + 14, data.y0);

          let bitmapOne = offscreen.transferToImageBitmap();
          secondContext?.transferFromImageBitmap(bitmapOne);
        }


        thirdContext.beginPath();

        thirdContext.moveTo(data.x0, data.y0);


        thirdContext.lineTo(data.x1, data.y1);


        thirdContext.stroke();
      }

    });
  }

  async doTextCopy() {
    this.copyingText = true;

    const canvasImage = this.canvasElement.toDataURL();


    const splitData = canvasImage.split(',')[1];

    URL.revokeObjectURL(canvasImage);

    const bytes = window.atob(splitData);
    const buf = new ArrayBuffer(bytes.length);
    let byteArr = new Uint8Array(buf);

    for (var i = 0; i < bytes.length; i++) {
      byteArr[i] = bytes.charCodeAt(i);
    }

    const response = await fetch("https://westus2.api.cognitive.microsoft.com/vision/v2.0/read/core/asyncBatchAnalyze", {
      headers: {
        "Ocp-Apim-Subscription-Key": "d930861b5bba49e5939b843f9c4e5846",
        "Content-Type": "application/octet-stream"
      },
      method: "POST",
      body: byteArr
    });

    console.log(response);
    const headers = response.headers;

    setTimeout(async () => {
      console.log('trying to get data');

      const textURL = headers.get("Operation-Location");
      console.log(textURL);

      const response = await fetch(textURL, {
        headers: {
          "Ocp-Apim-Subscription-Key": "d930861b5bba49e5939b843f9c4e5846",
          "Content-Type": "application/octet-stream"
        }
      });
      const textData = await response.json();

      console.log('textData', textData);
      console.log(textData.recognitionResults.lines);

      const textArray = [];

      if (textData.recognitionResults[0].lines) {
        textData.recognitionResults[0].lines.forEach((textObj) => {
          if (textObj.text) {
            textArray.push(textObj.text);
          }
        });

        const fullText = textArray.join('.');
        console.log(fullText);

        if (fullText.length > 0) {
          await navigator.clipboard.writeText(fullText);

          (window as any).requestIdleCallback(async () => {
            const toast = await toastCtrl.create({
              message: 'Text copied to clipboard',
              duration: 1200
            });
            await toast.present();
          })
        }

        this.copyingText = false;
      }
      else {
        this.copyingText = false;

        (window as any).requestIdleCallback(async () => {
          const toast = await toastCtrl.create({
            message: 'No text to copy',
            duration: 1200
          });
          await toast.present();
        })
      }

    }, 10000);
  }

  @Method()
  async saveCanvas(name: string, fileHandle?) {
    const canvasImage = this.canvasElement.toDataURL();
    const images: any[] = await get('images');

    const localImage: any = await findLocalImage(images, name);

    let handle = null;

    // AI
    const aiToken = localStorage.getItem('ai');
    if (aiToken) {

      const data = await doAI(canvasImage);

      if (images) {
        const handle = await this.saveToFS(fileHandle);
        console.log('saveToFS in ai', fileHandle);

        const desc = data.description.captions[0] ? data.description.captions[0].text : "No Description";

        /*if (handle) {
          images.push({ name: handle.name, color: data.color, desc, tags: data.tags, url: canvasImage });
        }
        else {
          images.push({ name, color: data.color, desc, tags: data.tags, url: canvasImage });
        }*/
        if (localImage) {
          console.log('setting local image', localImage);
          localImage.color = data.color;
          localImage.desc = desc;
          localImage.tags = data.tags;
          localImage.url = canvasImage;
          // localImage.url = 'something';

          images.map((image) => {
            if (image.name === name) {
              image.color = localImage.color;
              image.desc = localImage.desc;
              image.tags = localImage.tags;
              image.url = localImage.url;
            }
          });

          console.log('images after change', images);
        }
        else {
          if (handle) {
            images.push({ name: handle.name, handle: handle, color: data.color, desc, tags: data.tags, url: canvasImage });
          }
          else {
            images.push({ name, color: data.color, handle: handle, desc, tags: data.tags, url: canvasImage });
          }
        }

        await set('images', images);
      }
      else {
        const handle = await this.saveToFS(fileHandle);


        const desc = data.description.captions[0] ? data.description.captions[0].text : "No Description";

        if (handle) {
          await set('images', [{ name: handle.name, handle: handle, color: data.color, tags: data.tags, url: canvasImage, desc }]);
        }
        else {
          await set('images', [{ name, color: data.color, handle: handle, tags: data.tags, url: canvasImage, desc }]);
        }

        // await this.saveImages(remoteImages);

      }
    }
    else {
      if (images) {
        handle = await this.saveToFS(fileHandle);
        console.log(handle);
        /*if (handle) {
          images.push({ name: handle.name, url: canvasImage });
        }
        else {
          images.push({ name, url: canvasImage });
        }*/

        if (localImage) {
          localImage.url = canvasImage;
          console.log(images);

          images.map((image) => {
            if (image.name === name) {
              image.url = localImage.url;
            }
          });
        }
        else {
          if (handle) {
            images.push({ name: handle.name, handle: handle, url: canvasImage });
          }
          else {
            images.push({ name, url: canvasImage, handle: handle });
          }
        }

        await set('images', images);
      }
      else {
        handle = await this.saveToFS(fileHandle);

        if (handle) {
          await set('images', [{ name: handle.name, handle: handle, url: canvasImage }]);
        }
        else {
          await set('images', [{ name, url: canvasImage, handle: handle }]);
        }

        /*if (images) {
          let remoteImages = [];
 
          images.forEach((image) => {
            if (image) {
              remoteImages.push(image);
            }
          });
 
 
          await this.saveImages(remoteImages);
        }*/
      }
    }

    URL.revokeObjectURL(canvasImage);

    return fileHandle || handle;

  }

  async saveToFS(fileHandle?): Promise<any> {
    console.log('saveToFS handle', fileHandle);

    return new Promise((resolve, reject) => {
      const options: any = {
        // Suggested file name to use, defaults to `''`.
        fileName: 'webboard',
        extensions: [".jpeg"]
      };

      try {
        this.canvasElement.toBlob(async (blob) => {
          if (fileHandle) {
            await fileSave(blob, options, fileHandle);
          }
          else {
            this.fileHandle = await fileSave(blob, options);
          }

          console.log('fileHandle', this.fileHandle);

          resolve(this.fileHandle);
        });
      }
      catch (err) {
        reject(err);
      }
    });
  }

  async setupCanvas() {
    this.canvasElement.height = window.innerHeight;
    this.canvasElement.width = window.innerWidth;

    this.rect = this.canvasElement.getBoundingClientRect();

    this.context = (this.canvasElement.getContext('2d', {
      // desynchronized: navigator.userAgent.toLowerCase().includes("android") ? false : true,
    }) as CanvasRenderingContext2D);

    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);

    this.context.font = "30px Arial";

    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';

    this.context.strokeStyle = this.color;

    this.context.lineWidth = 4;

    console.log(this.color);

    (window as any).requestIdleCallback(async () => {
      await this.setupMouseEvents();
    })
    // this.setupMouseEvents();

    // this.renderCanvas();
  }

  @Method()
  drawGrid() {
    // @ts-ignore
    if (window.OffscreenCanvas) {
      if (!this.offscreen) {
        this.gridCanvas.height = window.innerHeight;
        this.gridCanvas.width = window.innerWidth;

        // @ts-ignore
        this.offscreen = this.gridCanvas.transferControlToOffscreen();

        this.gridWorker = new Worker('/assets/grid-canvas.js');
        this.gridWorker.postMessage({ canvas: this.offscreen, draw: true }, [this.offscreen]);
      }
      else {
        this.gridWorker.postMessage({ draw: true });
      }

      // this.gridContext = this.gridCanvas.getContext("2d");

      // this.gridContext.globalAlpha = 0.6;
    }
    else {
      return new Promise(() => {
        this.gridCanvas.height = window.innerHeight;
        this.gridCanvas.width = window.innerWidth;

        this.gridContext = this.gridCanvas.getContext("2d");

        this.gridContext.globalAlpha = 0.6;

        const bw = this.gridCanvas.width;
        const bh = this.gridCanvas.height;
        const p = 2;

        for (let x = 0; x <= bw; x += 40) {
          this.gridContext.moveTo(0.5 + x + p, p);
          this.gridContext.lineTo(0.5 + x + p, bh + p);
        }

        for (let x = 0; x <= bh; x += 40) {
          this.gridContext.moveTo(p, 0.5 + x + p);
          this.gridContext.lineTo(bw + p, 0.5 + x + p);
        }

        this.gridContext.lineWidth = 2;
        this.gridContext.strokeStyle = "lightgrey";
        this.gridContext.stroke();
      })
    }

  }

  @Method()
  clearGrid() {
    return new Promise(() => {
      // this.gridContext.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
      this.gridWorker.postMessage({ draw: false });
    })
  }

  async setupMouseEvents() {
    console.log('setting up mouse events');
    this.drawing = false;

    // this.mousePos = { x: 0, y: 0 };

    let points;

    // import PointerTracker from 'pointer-tracker';
    const PointerTracker = await import('../../helpers/PointerTracker');

    let that = this;

    await this.getInkPresenter();

    new PointerTracker.default(this.canvasElement, {
      start(pointer, event: PointerEvent) {
        // Called when a pointer is pressed/touched within the element.
        // pointer - The new pointer. This pointer isn't included in this.currentPointers or
        //    this.startPointers yet.
        // event - The event related to this pointer.

        event.preventDefault();

        console.log('start', pointer, event);

        if (that.inkShape === true) {
          points = [];
          points.push({ x: event.clientX, y: event.clientY });
        }

        if (event.pointerType !== 'touch') {
          that.drawing = true;
        }

        return true;


      },
      move(previousPointers, changedPointers, event: PointerEvent) {
        // Called when pointers have moved.
        // previousPointers - The state of the pointers before this event. This contains the same number
        //   of pointers, in the same order, as this.currentPointers and this.startPointers.
        // changedPointers - The pointers that have changed since the last move callback.
        // event - The event related to the pointer changes.

        if (that.mode === 'pen') {
          that.context.globalCompositeOperation = 'source-over';

          changedPointers.forEach((pointer) => {
            const previous = previousPointers.find(p => p.id === pointer.id);

            if (that.inkShape === true) {
              points.push({ x: pointer.clientX, y: pointer.clientY });
            }

            if ((pointer.nativePointer as PointerEvent).pointerType === 'pen') {

              let tweakedPressure = (pointer.nativePointer as PointerEvent).pressure * 6;
              that.context.lineWidth = (pointer.nativePointer as PointerEvent).width + tweakedPressure;

              if ((pointer.nativePointer as PointerEvent).buttons === 32 && (pointer.nativePointer as PointerEvent).button === -1) {
                // eraser

                // @ts-ignore
                (pointer.nativePointer as any).haptics.play(new HapticsPredefinedWaveform({
                  waveformId: that.waveforms.eraser_continuous,
                  intensity: 50
                }));

                let tweakedPressure = (pointer.nativePointer as PointerEvent).pressure * 6;
                that.context.lineWidth = (pointer.nativePointer as PointerEvent).width + tweakedPressure;

                that.context.lineWidth = 15;

                that.context.globalCompositeOperation = 'destination-out';
                that.context.beginPath();
                that.context.moveTo(previous.clientX, previous.clientY);
                for (const point of pointer.getCoalesced()) {
                  that.context.lineTo(point.clientX, point.clientY);
                }
                that.context.stroke();

                that.context.closePath();
              }
              else {

                // @ts-ignore
                (pointer.nativePointer as any).haptics.play(new HapticsPredefinedWaveform({
                  waveformId: that.waveforms.ink_continuous,
                  intensity: 50
                }));

                that.context.globalCompositeOperation = 'source-over';

                that.context.beginPath();
                that.context.moveTo(previous.clientX, previous.clientY);

                for (const point of pointer.getCoalesced()) {
                  that.context.lineTo(point.clientX, point.clientY);
                  // that.context.stroke();
                }

                that.context.stroke();

                that.context.closePath();

                if (that.presenter) {
                  that.presenter.updateInkTrailStartPoint(event, {
                    color: that.color,
                    diameter: that.context.lineWidth
                  });
                }
              }
            }
            else if ((pointer.nativePointer as PointerEvent).pointerType === 'touch') {
              that.context.lineWidth = (pointer.nativePointer as PointerEvent).width - 20;

              that.context.globalCompositeOperation = 'source-over';

              changedPointers.forEach((pointer) => {
                that.context.beginPath();
                that.context.moveTo(previous.clientX, previous.clientY);
                for (const point of pointer.getCoalesced()) {
                  that.context.lineTo(point.clientX, point.clientY);
                }
                that.context.stroke();

                if (that.presenter) {
                  that.presenter.updateInkTrailStartPoint(event, {
                    color: that.color,
                    diameter: that.context.lineWidth
                  });
                }
              });
            }
            else if ((pointer.nativePointer as PointerEvent).pointerType === 'mouse') {
              that.context.lineWidth = 4;

              that.context.globalCompositeOperation = 'source-over';

              changedPointers.forEach((pointer) => {
                that.context.beginPath();
                that.context.moveTo(previous.clientX, previous.clientY);
                for (const point of pointer.getCoalesced()) {
                  that.context.lineTo(point.clientX, point.clientY);
                }
                that.context.stroke();

                if (that.presenter) {
                  that.presenter.updateInkTrailStartPoint(event, {
                    color: that.color,
                    diameter: that.context.lineWidth
                  });
                }
              });
            }
          })
        }
        else if (that.mode === 'erase') {
          that.context.globalCompositeOperation = 'destination-out';
          /*this.context.beginPath();
          this.context.moveTo(this.lastPos.x, this.lastPos.y);
          this.context.lineTo(this.mousePos.x, this.mousePos.y);

          this.context.lineWidth = 60;

          this.context.stroke();
          this.context.closePath();

          this.lastPos = this.mousePos;*/

          changedPointers.forEach((pointer) => {
            const previous = previousPointers.find(p => p.id === pointer.id);

            that.context.beginPath();
            that.context.moveTo(previous.clientX, previous.clientY);
            for (const point of pointer.getCoalesced()) {
              that.context.lineTo(point.clientX, point.clientY);
            }
            that.context.stroke();
          });
        }
      },
      async end(pointer, event, cancelled) {
        // Called when a pointer is released.
        // pointer - The final state of the pointer that ended. This pointer is now absent from
        //   this.currentPointers and this.startPointers.
        // event - The event related to this pointer.
        // cancelled - True if the event was cancelled.  Actions are cancelled when the OS takes over
        //   pointer events, for actions such as scrolling.

        that.quickInkSave();

        console.log(pointer, event, cancelled);
      },
    });

    const roomNumber = location.pathname.split("/").pop();
    this.room = roomNumber;

    if (roomNumber) {
      this.socket = this.socket_connect(roomNumber);
      this.setupLiveEvents();

      const toast = await toastController.create({
        message: "You have joined a live session",
        position: "top",
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            handler: async () => {
              await toast.dismiss();
            }
          }
        ],
        duration: 1200
      });
      await toast.present();
    }
  }

  quickInkSave() {
    (window as any).requestIdleCallback(async () => {
      let canvasState = this.canvasElement.toDataURL();
      await set('canvasState', canvasState);

      if ("chooseFileSystemEntries" in window && this.fileHandle) {
        console.log('writing to file');
        this.fileWriter = await this.fileHandle.createWriter();

        console.log('this.fileWriter in pointer up', this.fileWriter);
        console.log("chooseFileSystemEntries" in window);

        this.canvasElement.toBlob(async (blob) => {
          await this.fileWriter.write(0, blob);
          await this.fileWriter.close();
        }, 'image/jpeg');
      }
    })
  }

  @debounce(1000)
  async sendInk(points: any[]) {
    const data = await getInkInfo(points);

    console.log(data.recognitionUnits);

    if (data.recognitionUnits[0].recognizedObject === "cloud" || data.recognitionUnits[0].recognizedObject === "ellipse" || data.recognitionUnits[0].recognizedObject === "circle") {
      this.drawCircle(data);
      this.quickInkSave();
    }
    else {
      this.drawShape(data);
      this.quickInkSave();
    }
  }

  drawCircle(data) {
    this.context.clearRect(data.recognitionUnits[0].boundingRectangle.topX - 20, data.recognitionUnits[0].boundingRectangle.topY - 20, data.recognitionUnits[0].boundingRectangle.width + 60, data.recognitionUnits[0].boundingRectangle.height + 60);

    this.context.beginPath();
    this.context.ellipse(data.recognitionUnits[0].center.x, data.recognitionUnits[0].center.y, data.recognitionUnits[0].boundingRectangle.height - 100, data.recognitionUnits[0].boundingRectangle.width - 100, Math.PI / 4, 0, 2 * Math.PI);
    this.context.stroke();
    this.context.closePath();
  }

  drawShape(data) {
    this.context.clearRect(data.recognitionUnits[0].boundingRectangle.topX - 20, data.recognitionUnits[0].boundingRectangle.topY - 20, data.recognitionUnits[0].boundingRectangle.width + 60, data.recognitionUnits[0].boundingRectangle.height + 60);

    this.context.globalCompositeOperation = 'source-over';
    this.context.beginPath();

    let lastPoint = data.recognitionUnits[0].points[0];

    data.recognitionUnits[0].points.forEach((point) => {
      this.context.moveTo(lastPoint.x, lastPoint.y);


      this.context.lineTo(point.x, point.y);

      this.context.stroke();

      lastPoint = point;
    });

    this.context.moveTo(lastPoint.x, lastPoint.y);
    this.context.lineTo(data.recognitionUnits[0].points[0].x, data.recognitionUnits[0].points[0].y)
    this.context.stroke();
  }

  @Method()
  addImageToCanvas(imageString: string) {
    this.mode = "something";

    return new Promise(() => {
      let base_image = new Image();
      base_image.crossOrigin = "Anonymous";

      base_image.src = imageString;

      base_image.onload = async () => {
        const toast = await toastCtrl.create({
          message: "Tap where you would like the image"
        })
        await toast.present();

        const canvasElement = this.canvasElement;
        const context = this.context;

        // weirdness
        let that = this;
        this.canvasElement.addEventListener('click', async function handler(ev) {

          if (window.matchMedia("(min-width: 1200px)").matches) {
            context.drawImage(base_image, ev.clientX, ev.clientY, base_image.naturalWidth / 8, base_image.naturalHeight / 8);
          }
          else {
            context.drawImage(base_image, ev.clientX, ev.clientY, base_image.naturalWidth / 4, base_image.naturalHeight / 4);
          }

          await toast.dismiss();

          canvasElement.removeEventListener('click', handler);
          that.mode = "pen";
        });
      }
    })
  }


  @Method()
  async inkToShape() {
    this.inkShape = !this.inkShape;
    await this.setupMouseEvents();
  }

  async handleDragEnter() {
    this.dragToast = await toastController.create({
      message: "Drop image to add it to your board..."
    });
    await this.dragToast.present();
  }

  handleDragOver(event: DragEvent) {
    console.log('dragOver');
    event.preventDefault();
  }

  handleDrop(event: DragEvent) {
    console.log('drop');
    event.preventDefault();

    this.dragToast.dismiss();

    if (event.dataTransfer.items) {
      console.log('have items', event.dataTransfer.items.length);
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < event.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        console.log('farther', event.dataTransfer.items[i].kind);
        if (event.dataTransfer.items[i].kind === 'file') {
          const file: any = event.dataTransfer.items[i].getAsFile();
          console.log('... file[' + i + '].name = ' + file.name);

          let fr = new FileReader();

          fr.onload = async () => {
            console.log(fr.result);
            console.log(file);

            await this.addImageToCanvas((fr.result as string));
          }
          fr.readAsDataURL(file);
        }
        else if (event.dataTransfer.items[i].kind === 'string') {
          console.log(event.dataTransfer.items[i]);

          if (event.dataTransfer.items[i].type === 'text/plain') {
            event.dataTransfer.items[i].getAsString((data) => {
              console.log(data);

              this.addTextToCanvas(event, data);
            });
          }
        }
      }
    }
  }

  render() {
    return [
      <div>

        {
          this.openContextMenu ?
            <div ref={(el) => this.contextElement = el as HTMLDivElement} id="customContextMenu">
              <button onClick={() => this.copyImage()}>
                <ion-icon name="copy-outline"></ion-icon>

                <span>Copy</span>
              </button>

              <button onClick={(event) => this.pasteImage(event)}>
                <ion-icon name="albums-outline"></ion-icon>

                <span>Paste</span>
              </button>

              <button onClick={(event) => this.insertText(event)}>
                <ion-icon name="text-outline"></ion-icon>

                Add Text
              </button>
            </div>
            : null
        }

        {window.matchMedia("(min-width: 1200px)").matches ? <button id="copyTextButton" onClick={() => this.doTextCopy()}>
          {this.copyingText ? <ion-spinner></ion-spinner> : <span>Copy Text</span>}
        </button> : null}

        <canvas id="gridCanvas" ref={(el) => this.gridCanvas = el as HTMLCanvasElement}></canvas>

        <canvas id="secondCanvas"></canvas>

        <canvas id="regCanvas" onDragEnter={() => this.handleDragEnter()} onDrop={(event) => this.handleDrop(event)} onDragOver={(event) => this.handleDragOver(event)} ref={(el) => this.canvasElement = el as HTMLCanvasElement}></canvas>
      </div >
    ];
  }
}
