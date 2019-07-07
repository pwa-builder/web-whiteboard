import { Component, Element, Prop, State, Watch, Method, h } from '@stencil/core';

import { set, get, del } from 'idb-keyval';
import 'pinch-zoom-element';

// import { saveImages } from "../../services/api";

@Component({
  tag: 'app-canvas',
  styleUrl: 'app-canvas.css'
})
export class AppCanvas {

  @Element() el: HTMLElement;

  @Prop() color: string = 'red';
  @Prop() mode: string = 'pen';
  @Prop() savedDrawing: string | null = null;

  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: HTMLIonToastControllerElement | null = null;

  @State() drawing: boolean = false;
  @Prop({ mutable: true }) dragMode: boolean = false;

  canvasElement: HTMLCanvasElement;
  gridCanvas: HTMLCanvasElement;
  gridContext: CanvasRenderingContext2D;
  context: CanvasRenderingContext2D;
  dragCanvasElement: HTMLCanvasElement;
  dragContext: CanvasRenderingContext2D;
  lastPos: any;
  mousePos: any;

  componentDidLoad() {
    console.log('Component has been rendered');

    window.addEventListener('resize', () => {
      console.log('setting up canvas');
      this.setupCanvas();
    })

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
    this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

    if (this.savedDrawing) {
      this.savedDrawing = null;
    }

    return await del('canvasState');
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

      const response = await fetch(`https://westus2.api.cognitive.microsoft.com/vision/v2.0/analyze?visualFeatures=Tags,Color,Description`, {
        headers: {
          "Ocp-Apim-Subscription-Key": "d930861b5bba49e5939b843f9c4e5846",
          "Content-Type": "application/octet-stream"
        },
        method: "POST",
        body: byteArr
      });
      const data = await response.json();

      console.log(data);

      if (images) {
        images.push({ name, color: data.color, desc: data.description.captions[0].text, tags: data.tags, url: canvasImage });
        await set('images', images);

        let remoteImages = [];

        images.forEach((image) => {
          if (image.id) {
            remoteImages.push({ id: image.id, name: image.name });
          }
        });

        // await saveImages(remoteImages);
      }
      else {
        await set('images', [{ name, color: data.color, tags: data.tags, url: canvasImage, desc: data.description.captions[0].text }]);

        let remoteImages = [];

        images.forEach((image) => {
          if (image.id) {
            remoteImages.push({ id: image.id, name: image.name });
          }
        });

        // await saveImages(remoteImages);
      }
    }
    else {
      if (images) {
        images.push({ name, url: canvasImage });
        await set('images', images);

        let remoteImages = [];

        if (images && images.length > 0) {
          images.forEach((image) => {
            if (image.id) {
              remoteImages.push({ id: image.id, name: image.name });
            }
          });
        }

        // await saveImages(remoteImages);
      }
      else {
        await set('images', [{ name, url: canvasImage }]);


        let remoteImages = [];

        if (images && images.length > 0) {
          images.forEach((image) => {
            if (image.id) {
              remoteImages.push({ id: image.id, name: image.name });
            }
          });
        }

        // await saveImages(remoteImages);
      }
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

  setupMouseEvents() {
    this.drawing = false;

    this.mousePos = { x: 0, y: 0 };
    this.lastPos = this.mousePos;

    // handle mouse events
    this.canvasElement.addEventListener("pointerdown", (e) => {

      this.lastPos = this.getMousePos(this.canvasElement, e);

      if (e.pointerType === 'touch') {

        setTimeout(() => {
          this.drawing = true;
        }, 10)
      }
      else {
        this.drawing = true;
      }
    }, { passive: false });

    this.canvasElement.addEventListener("pointerup", () => {
      this.drawing = false;

      (window as any).requestIdleCallback(async () => {
        let canvasState = this.canvasElement.toDataURL();
        await set('canvasState', canvasState);
      })
    }, { passive: false });

    this.canvasElement.addEventListener("pointermove", (e: PointerEvent) => {
      this.mousePos = this.getMousePos(this.canvasElement, e);
    }, { passive: false });
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

      this.context.globalCompositeOperation = 'source-over';
      this.context.beginPath();
      this.context.moveTo(this.lastPos.x, this.lastPos.y);
      this.context.lineTo(this.mousePos.x, this.mousePos.y);

      if (this.mousePos.type !== 'mouse') {
        this.context.lineWidth = this.mousePos.width - 30;
      }
      else {
        this.context.lineWidth = 10;
      }

      this.context.stroke();
      this.context.closePath();

      this.lastPos = this.mousePos;
    }
    else if (this.drawing && this.mode === 'erase') {
      this.context.globalCompositeOperation = 'destination-out';
      this.context.beginPath();
      this.context.moveTo(this.lastPos.x, this.lastPos.y);
      this.context.lineTo(this.mousePos.x, this.mousePos.y);
      this.context.stroke();
      this.context.closePath();
      this.lastPos = this.mousePos;
    }

    requestAnimationFrame(() => this.renderCanvas());
  }

  @Method()
  addImageToCanvas(imageString: string) {
    return new Promise(() => {
      let base_image = new Image();

      base_image.src = imageString;

      base_image.onload = async () => {
        const toast = await this.toastCtrl.create({
          message: "Tap where you would like the image"
        })
        await toast.present();

        const canvasElement = this.canvasElement;
        const context = this.context;

        this.canvasElement.addEventListener('click', async function handler(ev) {

          context.drawImage(base_image, ev.clientX, ev.clientY, 400, 400);
          await toast.dismiss();

          canvasElement.removeEventListener('click', handler);
        });
      }
    })
  }

  render() {
    return (
      <div>
        <canvas id="gridCanvas" ref={(el) => this.gridCanvas = el as HTMLCanvasElement}></canvas>

        {this.dragMode ?
          <pinch-zoom>
            <canvas id="dragCanvas" ref={(el) => this.dragCanvasElement = el as HTMLCanvasElement}></canvas>
          </pinch-zoom>

          : <canvas id="regCanvas" ref={(el) => this.canvasElement = el as HTMLCanvasElement}></canvas>}
      </div >
    );
  }
}
