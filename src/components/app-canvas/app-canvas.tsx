import { Component, Element, Prop, State, Watch, Method, h } from '@stencil/core';
import { toastController as toastCtrl, alertController as alertCtrl, modalController, toastController, alertController } from '@ionic/core';

import { debounce } from "typescript-debounce-decorator";
import { set, get, del } from 'idb-keyval';

import { b64toBlob } from '../../helpers/utils';
import { getNewFileHandle, readFile } from '../../helpers/files-api';

import { exportToOneNote, createActivity } from '../../services/graph';
import { saveImagesS } from '../../services/api';

import { findLocalImage, doAI, getInkInfo } from '../../canvas.worker';


declare var ClipboardItem;

@Component({
  tag: 'app-canvas',
  styleUrl: 'app-canvas.css'
})
export class AppCanvas {

  @Element() el: HTMLElement;

  @Prop() color: string = 'red';
  @Prop() mode: string = 'pen';
  @Prop() savedDrawing: string | null = null;
  @Prop({ mutable: true }) dragMode: boolean = false;

  @State() drawing: boolean = true;
  @State() copyingText: boolean = false;
  @State() openContextMenu: boolean = false;
  @State() doDrag: boolean = false;
  @State() saving: boolean = false;
  @State() inkShape: boolean = false;

  canvasElement: HTMLCanvasElement;
  gridCanvas: HTMLCanvasElement;
  gridContext: CanvasRenderingContext2D;
  context: CanvasRenderingContext2D;
  dragCanvasElement: HTMLCanvasElement;
  dragContext: CanvasRenderingContext2D;
  contextElement: HTMLDivElement;
  lastPos: any;
  mousePos: any;
  fileHandle: any;
  fileWriter: any;
  contextAnimation: Animation;
  rect: any;
  timerId: number;
  offscreen = null;
  gridWorker = null;
  dragToast: HTMLIonToastElement;

  componentDidLoad() {
    window.addEventListener('resize', () => {
      console.log('resizing');
      this.resizeCanvas();
    });

    (window as any).requestIdleCallback(() => {
      this.setupCanvas();
    });

    (window as any).requestIdleCallback(async () => {
      const canvasState = await (get('canvasState') as any);

      if (canvasState && !this.savedDrawing) {
        const tempImage = new Image();
        tempImage.onload = () => {
          this.context.drawImage(tempImage, 0, 0);
        }
        tempImage.src = canvasState;
      }
    });

    this.setupEvents();
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

    document.addEventListener('keydown', async (ev) => {
      if (ev.key.toLowerCase() === "s".toLowerCase() && ev.shiftKey && ev.ctrlKey) {
        console.log('here');
        await this.saveToFS();
      }

      else if (ev.key.toLowerCase() === "s".toLowerCase() && ev.ctrlKey) {
        this.quickSave(ev);
      }
    })
  }

  @Method()
  async resizeCanvas(width?: number, height?: number) {
    console.log('resizing canvas');
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

      /*let blobOutput = null;

      try {
        blobOutput = await clipboardItems[0].getType('image/png');
      }
      catch (err) {
        console.error(err);
      }

      if (blobOutput) {
        const imageURL = window.URL.createObjectURL(blobOutput);

        const tempImage = new Image();
        tempImage.onload = () => {
          this.context.drawImage(tempImage, ev.clientX, ev.clientY);
        }
        tempImage.src = imageURL;

      }*/

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
  async writeNativeFile(fileHandler) {
    this.fileHandle = fileHandler;

    if (this.fileHandle) {
      const fileContents: any = await readFile(this.fileHandle);
      console.log(fileContents);

      let tempImage = new Image();
      tempImage.onload = async () => {
        console.log('image loaded');

        this.context.drawImage(tempImage, 0, 0);
        this.setupMouseEvents();

        tempImage = null
      }
      tempImage.src = fileContents;
    }
  }

  @Method()
  async shareCanvas() {
    this.canvasElement.toBlob(async (blob) => {
      console.log(blob);

      const file = new File([blob], "default.jpg");

      if ((navigator as any).canShare && (navigator as any).canShare(file)) {
        await (navigator as any).share({
          files: [file],
          title: 'Whiteboard',
          text: 'Check out this whiteboard from WebBoard https://webboard-app.web.app',
        })
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
      message: "Start a live session and draw in real time with a teammate?",
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Choose Teammates",
          handler: async () => {
            const modal = await modalController.create({
              component: "contacts-modal"
            });

            await modal.present();
          }
        }
      ],
      backdropDismiss: false
    });
    await alert.present();
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
  async saveCanvas(name: string) {
    const canvasImage = this.canvasElement.toDataURL();
    const images: any[] = await get('images');

    const localImage: any = await findLocalImage(images, name);

    // AI
    const aiToken = localStorage.getItem('ai');
    if (aiToken) {

      const data = await doAI(canvasImage);

      if (images) {
        const handle = await this.saveToFS();

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
            images.push({ name: handle.name, color: data.color, desc, tags: data.tags, url: canvasImage });
          }
          else {
            images.push({ name, color: data.color, desc, tags: data.tags, url: canvasImage });
          }
        }

        try {
          const provider = (window as any).mgt.Providers.globalProvider;
          const user = provider.graph.client.config.middleware.authenticationProvider._userAgentApplication.account;

          //const appActivityId = `/board?name=${handle ? handle.name : name}&username=${user.name}`;

          // weird format because graph
          //const goodTime = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getUTCDate()}T${new Date().getUTCHours().toString().length > 1 ? null : 0}${new Date().getUTCHours()}:${new Date().getUTCMinutes().toString().length > 1 ? null : 0}${new Date().getUTCMinutes()}:${new Date().getUTCSeconds()}.${new Date().getUTCMilliseconds()}Z`;
          //const goodTime2 = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getUTCDate()}T${new Date().getUTCHours().toString().length > 1 ? null : 0}${new Date().getUTCHours()}:${new Date().getUTCMinutes() + 3}:${new Date().getUTCSeconds()}.${new Date().getUTCMilliseconds()}Z`

          const activityObject = {
            "appActivityId": `/boards?${handle ? handle.name : name}`,
            "activitySourceHost": 'https://webboard-app.web.app',
            "userTimezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
            "appDisplayName": "Webboard",
            "activationUrl": `https://webboard-app.web.app/boards/${handle ? handle.name : name}/${user.name}/board`,
            "fallbackUrl": "https://webboard-app.web.app",
            "contentInfo": {
              "@context": "http://schema.org",
              "@type": "CreativeWork",
              "author": user.name,
              "name": "Webboard"
            },
            "visualElements": {
              "attribution": {
                "iconUrl": "https://webboard-app.web.app/icons/android/android-launchericon-64-64.png",
                "alternateText": "Webboard",
                "addImageQuery": "false"
              },
              "description": "Access your saved board here",
              "backgroundColor": "#1976d2",
              "displayText": `You saved a new board: ${handle ? handle.name : name}`,
              "content": {
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "type": "AdaptiveCard",
                "body": [
                  {
                    "type": "TextBlock",
                    "text": "Always access your latest board here!"
                  }
                ]
              }
            },


            /*"historyItems": [
              {
                "userTimezone": "America/Los Angeles",
                                    2019-12-18T09:05:48.401Z
                "startedDateTime": "2019-12-18T07:44:23.299Z",
                "lastActiveDateTime": "2019-12-18T08:44:23.299Z"
              }
            ]*/
          };

          console.log('activity object', activityObject);

          await createActivity(handle ? handle.name : name, activityObject);
        }
        catch (err) {
          console.error(err);
        }

        await set('images', images);

        let remoteImages = [];

        images.forEach((image) => {
          console.log('image', image);
          if (image) {
            remoteImages.push(image);
          }
        });


        await this.saveImages(remoteImages);
      }
      else {
        const handle = await this.saveToFS();


        const desc = data.description.captions[0] ? data.description.captions[0].text : "No Description";

        if (handle) {
          await set('images', [{ name: handle.name, color: data.color, tags: data.tags, url: canvasImage, desc }]);
        }
        else {
          await set('images', [{ name, color: data.color, tags: data.tags, url: canvasImage, desc }]);
        }

        // await this.saveImages(remoteImages);

      }
    }
    else {
      if (images) {
        const handle = await this.saveToFS();
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
            images.push({ name: handle.name, url: canvasImage });
          }
          else {
            images.push({ name, url: canvasImage });
          }
        }

        await set('images', images);

        let remoteImages = [];

        images.forEach((image) => {
          console.log(image);
          if (image) {
            remoteImages.push(image);
          }
        });

        await this.saveImages(remoteImages);
      }
      else {
        const handle = await this.saveToFS();

        if (handle) {
          await set('images', [{ name: handle.name, url: canvasImage }]);
        }
        else {
          await set('images', [{ name, url: canvasImage }]);
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

  }

  async saveImages(images: any[]) {
    console.log('images before cloudSave', images);
    await saveImagesS(images);
  }

  async saveToFS() {
    if ("chooseFileSystemEntries" in window) {
      this.fileHandle = await getNewFileHandle();

      console.log(this.fileHandle);

      if (this.fileHandle) {
        this.fileWriter = await this.fileHandle.createWriter();
        console.log(this.fileWriter);

        this.canvasElement.toBlob(async (blob) => {
          await this.fileWriter.write(0, blob);
          await this.fileWriter.close();
        }, 'image/jpeg');

        this.setupMouseEvents();
      }

      return this.fileHandle;
    }
  }

  setupCanvas() {
    this.canvasElement.height = window.innerHeight;
    this.canvasElement.width = window.innerWidth;

    this.rect = this.canvasElement.getBoundingClientRect();

    this.context = (this.canvasElement.getContext('2d', {
      desynchronized: true
    }) as CanvasRenderingContext2D);

    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);

    this.context.font = "30px Arial";

    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';

    this.context.strokeStyle = this.color;

    this.context.lineWidth = 4;

    if ("getContextAttributes" in this.context && (this.context as any).getContextAttributes().desynchronized) {
      console.log('Low latency canvas supported. Yay!');
    } else {
      console.log('Low latency canvas not supported. Boo!');
    }

    console.log(this.color);

    (window as any).requestIdleCallback(() => {
      this.setupMouseEvents();
    })
    // this.setupMouseEvents();

    this.renderCanvas();
  }

  @Method()
  drawGrid() {
    if (window.OffscreenCanvas) {
      if (!this.offscreen) {
        this.gridCanvas.height = window.innerHeight;
        this.gridCanvas.width = window.innerWidth;

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

    this.mousePos = { x: 0, y: 0 };

    let points;

    // handle mouse events
    this.canvasElement.addEventListener("pointerdown", (e) => {

      if (this.inkShape === true) {
        points = [];
        points.push({ x: e.clientX, y: e.clientY });
      }

      if (e.button !== 2) {
        if (e.ctrlKey === true) {
          this.doDrag = true;
          return;
        }
        else {
          this.doDrag = false;
        }

        this.canvasElement.setPointerCapture(e.pointerId);
        this.lastPos = this.getMousePos(e);

        if (e.pointerType !== 'touch') {
          this.drawing = true;
        }

      }

    });

    this.canvasElement.addEventListener("pointerup", async (e) => {
      console.log('pointerup', points);
      this.quickSave(e);

      if (this.inkShape === true) {
        await this.sendInk(points);
      }

    });

    if ((PointerEvent.prototype as any).getCoalescedEvents) {
      this.canvasElement.addEventListener("pointermove", (e: PointerEvent) => {
        this.mousePos = this.getMousePos(e);

        if (this.inkShape === true && points) {
          points.push({ x: e.clientX, y: e.clientY });
        }

        if (e.pointerType === "touch") {
          this.drawing = true;
        }

        const allEvents = (e as any).getCoalescedEvents();
        if (allEvents.length > 0) {
          for (let i = 0; i < allEvents.length; i++) {
            if (i === allEvents.length - 1) {
              this.mousePos = this.getMousePos(allEvents[i]);
            }
          }
        }

      });
    }
    else {
      this.canvasElement.addEventListener("pointermove", (e: PointerEvent) => {
        this.mousePos = this.getMousePos(e);

        if (this.inkShape && points) {
          points.push({ x: e.clientX, y: e.clientY });
        }

        if (e.pointerType === "touch") {
          this.drawing = true;
        }

      });
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

  quickSave(e) {
    e.preventDefault();

    this.saving = true;

    this.drawing = false;

    // this.lastPos = this.getMousePos(this.canvasElement, e);
    this.lastPos = null;

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

      setTimeout(() => {
        this.saving = false;
      }, 400);

    })
  }

  getMousePos(mouseEvent: PointerEvent) {
    return {
      x: mouseEvent.clientX - this.rect.left,
      y: mouseEvent.clientY - this.rect.top,
      width: mouseEvent.width,
      type: mouseEvent.pointerType,
      ctrlKey: mouseEvent.ctrlKey,
      pressure: mouseEvent.pressure,
      button: mouseEvent.button,
      buttons: mouseEvent.buttons
    };
  }

  renderCanvas() {
    if (this.drawing !== false && this.mode === 'pen') {

      if (this.lastPos) {
        this.context.globalCompositeOperation = 'source-over';
        this.context.beginPath();
        this.context.moveTo(this.lastPos.x, this.lastPos.y);
        this.context.lineTo(this.mousePos.x, this.mousePos.y);

        if (this.mousePos.type === 'pen') {
          let tweakedPressure = this.mousePos.pressure * 6;
          this.context.lineWidth = this.mousePos.width + tweakedPressure;

          if (this.mousePos.buttons === 32 && this.mousePos.button === -1) {
            // eraser

            this.context.globalCompositeOperation = 'destination-out';
            this.context.beginPath();
            this.context.moveTo(this.lastPos.x, this.lastPos.y);
            this.context.lineTo(this.mousePos.x, this.mousePos.y);

            this.context.lineWidth = 60;

            this.context.stroke();
            this.context.closePath();

            this.lastPos = this.mousePos;
          }
        }
        else if (this.mousePos.type !== 'mouse' && this.mousePos.type !== 'pen') {
          this.context.lineWidth = this.mousePos.width - 20;
        }
        else if (this.mousePos.type !== 'touch' && this.mousePos.type !== 'pen') {
          this.context.lineWidth = 4;
        }

        this.context.stroke();
        this.context.closePath();
      }

      this.lastPos = this.mousePos;

    }
    else if (this.drawing !== false && this.mode === 'erase') {
      this.context.globalCompositeOperation = 'destination-out';
      this.context.beginPath();
      this.context.moveTo(this.lastPos.x, this.lastPos.y);
      this.context.lineTo(this.mousePos.x, this.mousePos.y);

      if (this.mousePos.type === 'mouse') {
        this.context.lineWidth = 30;
      }

      this.context.stroke();
      this.context.closePath();

      this.lastPos = this.mousePos;
    }

    requestAnimationFrame(() => this.renderCanvas());
  }

  @Method()
  addImageToCanvas(imageString: string, width: number, height: number) {
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
            context.drawImage(base_image, ev.clientX, ev.clientY, width / 2, height / 2);
          }
          else {
            context.drawImage(base_image, ev.clientX, ev.clientY, width / 4, height / 4);
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

  @Method()
  async exportToOneNote() {
    if (this.contextAnimation) {
      this.contextAnimation.reverse();
    }

    const alert = await alertCtrl.create({
      header: "Name",
      message: "Your board will be uploaded to OneDrive first, what would you like to name it?",
      inputs: [
        {
          placeholder: "My board",
          name: "name"
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel')
          }
        }, {
          text: 'Ok',
          handler: async (data) => {
            console.log('Confirm Ok', data.name);
            const name = data.name;
            console.log(name);

            await this.saveCanvas(name);

            const imageUrl = this.canvasElement.toDataURL();
            const imageBlob = b64toBlob(imageUrl.replace("data:image/png;base64,", ""), 'image/jpg');

            console.log(imageBlob);

            let provider = (window as any).mgt.Providers.globalProvider;
            if (provider) {
              let graphClient = provider.graph.client;
              console.log(graphClient);

              try {
                const driveItem = await graphClient.api('/me/drive/root/children').middlewareOptions((window as any).mgt.prepScopes('user.read', 'files.readwrite')).post({
                  "name": "webboard",
                  "folder": {}
                });
                console.log(driveItem);

                const fileUpload = await graphClient.api(`/me/drive/items/${driveItem.id}:/${name}.jpg:/content`).middlewareOptions((window as any).mgt.prepScopes('user.read', 'files.readwrite')).put(imageBlob);
                console.log(fileUpload);



                await exportToOneNote(fileUpload.webUrl, name);

              }
              catch (err) {
                console.error(err);
              }
            }
          }
        }
      ]
    });
    await alert.present();
    const data = await alert.onDidDismiss();
    console.log(data);
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

            await this.addImageToCanvas((fr.result as string), 400, 400);
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

              <button onClick={() => this.exportToOneNote()}>
                <ion-icon src="/assets/onenote.svg"></ion-icon>

                <span>Export</span>
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

        <canvas id="regCanvas" onDragEnter={() => this.handleDragEnter()} onDrop={(event) => this.handleDrop(event)} onDragOver={(event) => this.handleDragOver(event)} ref={(el) => this.canvasElement = el as HTMLCanvasElement}></canvas>
      </div >
    ];
  }
}
