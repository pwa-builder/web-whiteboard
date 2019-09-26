import { Component, Element, Prop, State, Watch, Method, h } from '@stencil/core';
import { toastController as toastCtrl, alertController as alertCtrl } from '@ionic/core';

import { set, get, del } from 'idb-keyval';

import { b64toBlob } from '../../helpers/utils';
import { getNewFileHandle, readFile } from '../../helpers/files-api';

import { exportToOneNote } from '../../services/graph';
import { saveImagesS } from '../../services/api';

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

  @State() drawing: boolean = false;
  @State() copyingText: boolean = false;

  canvasElement: HTMLCanvasElement;
  gridCanvas: HTMLCanvasElement;
  gridContext: CanvasRenderingContext2D;
  context: CanvasRenderingContext2D;
  dragCanvasElement: HTMLCanvasElement;
  dragContext: CanvasRenderingContext2D;
  lastPos: any;
  mousePos: any;
  fileHandle: any;
  fileWriter: any;

  componentDidLoad() {
    console.log('Component has been rendered');

    window.matchMedia("(min-width: 1200px)").matches ?
      window.addEventListener('resize', () => {
        console.log('setting up canvas');
        this.setupCanvas();
      }) : null

    this.setupCanvas();

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

    this.canvasElement.oncontextmenu = async (e) => {
      e.preventDefault();

      const clipboardItems = await (navigator.clipboard as any).read();
      console.log(clipboardItems);

      if (clipboardItems) {
        const blobOutput = await clipboardItems[0].getType('image/png');

        if (blobOutput) {
          const imageURL = window.URL.createObjectURL(blobOutput);

          const tempImage = new Image();
          tempImage.onload = () => {
            this.context.drawImage(tempImage, 0, 0);
          }
          tempImage.src = imageURL;

        }
      }
    }
  }

  @Watch('savedDrawing')
  handleSaved() {
    console.log(this.savedDrawing);
    let tempImage = new Image();
    tempImage.onload = async () => {
      console.log('image loaded');
      await this.clearCanvas();

      this.context.drawImage(tempImage, 0, 0);

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

    if (this.savedDrawing) {
      this.savedDrawing = null;
    }

    return await del('canvasState');
  }

  async doTextCopy() {
    this.copyingText = true;

    const canvasImage = this.canvasElement.toDataURL();


    const splitData = canvasImage.split(',')[1];

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

    // AI
    const aiToken = localStorage.getItem('ai');
    if (aiToken) {
      const splitData = canvasImage.split(',')[1];

      const bytes = window.atob(splitData);
      const buf = new ArrayBuffer(bytes.length);
      let byteArr = new Uint8Array(buf);

      for (var i = 0; i < bytes.length; i++) {
        byteArr[i] = bytes.charCodeAt(i);
      }

      let data = null;

      try {
        const response = await fetch(`https://westus2.api.cognitive.microsoft.com/vision/v2.0/analyze?visualFeatures=Tags,Color,Description`, {
          headers: {
            "Ocp-Apim-Subscription-Key": "d930861b5bba49e5939b843f9c4e5846",
            "Content-Type": "application/octet-stream"
          },
          method: "POST",
          body: byteArr
        });
        data = await response.json();

      } catch (error) {
        console.error(error);
      }

      console.log(data);

      if (images) {
        const handle = await this.saveToFS();

        const desc = data.description.captions[0] ? data.description.captions[0].text : "No Description";

        if (handle) {
          images.push({ name: handle.name, color: data.color, desc, tags: data.tags, url: canvasImage });
        }
        else {
          images.push({ name, color: data.color, desc, tags: data.tags, url: canvasImage });
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


        const desc = data.description.captions[0] ? data.description.captions[0].text : "No Description";

        if (handle) {
          await set('images', [{ name: handle.name, color: data.color, tags: data.tags, url: canvasImage, desc }]);
        }
        else {
          await set('images', [{ name, color: data.color, tags: data.tags, url: canvasImage, desc }]);
        }

        let remoteImages = [];

        images.forEach((image) => {
          if (image) {
            remoteImages.push(image);
          }
        });


        await this.saveImages(remoteImages);
      }
    }
    else {
      if (images) {
        const handle = await this.saveToFS();
        console.log(handle);
        if (handle) {
          images.push({ name: handle.name, url: canvasImage });
        }
        else {
          images.push({ name, url: canvasImage });
        }

        await set('images', images);

        let remoteImages = [];

        images.forEach((image) => {
          if (image) {
            remoteImages.push({ id: image.id, name: image.name });
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


        let remoteImages = [];

        images.forEach((image) => {
          if (image) {
            remoteImages.push({ id: image.id, name: image.name });
          }
        });


        await this.saveImages(remoteImages);
      }
    }

  }

  async saveImages(images: any[]) {
    console.log(images);
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

    this.context = (this.canvasElement.getContext('2d', {
      desynchronized: true
    }) as CanvasRenderingContext2D);

    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);

    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';

    this.context.strokeStyle = this.color;

    this.context.lineWidth = 10;

    if ("getContextAttributes" in this.context && (this.context as any).getContextAttributes().desynchronized) {
      console.log('Low latency canvas supported. Yay!');
    } else {
      console.log('Low latency canvas not supported. Boo!');
    }

    console.log(this.color);

    this.setupMouseEvents();
    // this.setupTouchEvents();

    this.renderCanvas();
  }

  @Method()
  drawGrid() {
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

  @Method()
  clearGrid() {
    return new Promise(() => {
      this.gridContext.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    })
  }

  async setupMouseEvents() {
    console.log('setting up mouse events');
    this.drawing = false;

    this.mousePos = { x: 0, y: 0 };
    // this.lastPos = this.mousePos;
    // this.lastPos = { x: 0, y: 0 };

    // handle mouse events
    this.canvasElement.addEventListener("pointerdown", (e) => {
      console.log('pointer down');
      this.lastPos = this.getMousePos(this.canvasElement, e);

      if (e.pointerType !== 'touch') {
        this.drawing = true;
      }
    });

    this.canvasElement.addEventListener("pointerup", () => {
      console.log('pointer up');
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

      })
    });

    if ((PointerEvent.prototype as any).getPredictedEvents) {
      this.canvasElement.addEventListener("pointermove", (e: PointerEvent) => {
        this.mousePos = this.getMousePos(this.canvasElement, e);

        if (e.pointerType === "touch") {
          this.drawing = true;
        }

        const allEvents = (e as any).getPredictedEvents();
        if (allEvents.length > 0) {
          for (let i = 0; i < allEvents.length; i++) {
            if (i === allEvents.length - 1) {
              this.mousePos = this.getMousePos(this.canvasElement, e)
            }
          }
        }

      });
    }
    else {
      this.canvasElement.addEventListener("pointermove", (e: PointerEvent) => {
        this.mousePos = this.getMousePos(this.canvasElement, e);

        if (e.pointerType === "touch") {
          this.drawing = true;
        }
      });
    }
  }

  getMousePos(canvasDom, mouseEvent) {
    const rect = canvasDom.getBoundingClientRect();

    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top,
      width: mouseEvent.width,
      type: mouseEvent.pointerType,
      ctrlKey: mouseEvent.ctrlKey
    };
  }

  renderCanvas() {
    if (this.drawing && this.mode === 'pen') {

      if (this.lastPos) {
        this.context.globalCompositeOperation = 'source-over';
        this.context.beginPath();
        this.context.moveTo(this.lastPos.x, this.lastPos.y);
        this.context.lineTo(this.mousePos.x, this.mousePos.y);

        if (this.mousePos.type !== 'mouse') {
          this.context.lineWidth = this.mousePos.width - 20;
        }
        else {
          this.context.lineWidth = 10;
        }

        this.context.stroke();
        this.context.closePath();
      }

      this.lastPos = this.mousePos;

    }
    else if (this.drawing && this.mode === 'erase') {
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
  addImageToCanvas(imageString: string) {
    this.mode = "something";

    return new Promise(() => {
      let base_image = new Image();

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
          context.drawImage(base_image, ev.clientX, ev.clientY, base_image.width - 400, base_image.height - 400);
          await toast.dismiss();

          canvasElement.removeEventListener('click', handler);
          that.mode = "pen";
        });
      }
    })
  }

  @Method()
  async exportToOneNote() {
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

    /*const imageUrl = this.canvasElement.toDataURL();
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

        const fileUpload = await graphClient.api(`/me/drive/items/${driveItem.id}:/${image.name}.jpg:/content`).middlewareOptions((window as any).mgt.prepScopes('user.read', 'files.readwrite')).put(imageBlob);
        console.log(fileUpload);

      }
      catch (err) {
        console.error(err);
      }
    }*/
  }

  render() {
    return (
      <div>
        {window.matchMedia("(min-width: 1200px)").matches ? <button id="copyTextButton" onClick={() => this.doTextCopy()}>
          {this.copyingText ? <ion-spinner></ion-spinner> : <span>Copy Text</span>}
        </button> : null}

        <canvas id="gridCanvas" ref={(el) => this.gridCanvas = el as HTMLCanvasElement}></canvas>

        {this.dragMode ?
          <canvas id="dragCanvas" ref={(el) => this.dragCanvasElement = el as HTMLCanvasElement}></canvas>

          : <canvas id="regCanvas" ref={(el) => this.canvasElement = el as HTMLCanvasElement}></canvas>}
      </div >
    );
  }
}
