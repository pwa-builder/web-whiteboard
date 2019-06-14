import { Component, Prop, State, Watch, Method, h } from '@stencil/core';

import { set, get, del } from 'idb-keyval';

@Component({
  tag: 'app-canvas',
  styleUrl: 'app-canvas.css'
})
export class AppCanvas {

  @Prop() color: string = 'red';
  @Prop() mode: string = 'pen';
  @Prop() savedDrawing: string | null = null;

  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: HTMLIonToastControllerElement | null = null;

  @State() drawing: boolean = false;

  canvasElement: HTMLCanvasElement;
  gridCanvas: HTMLCanvasElement;
  gridContext: CanvasRenderingContext2D;
  context: CanvasRenderingContext2D;
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
    })
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
    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    
    const canvasImage = this.canvasElement.toDataURL();

    const images: any[] = await get('images');
    if (images) {
      images.push({ name, url: canvasImage });
      await set('images', images);
    }
    else {
      await set('images', [{ name, url: canvasImage }]);
    }
  }

  setupCanvas() {
    this.canvasElement.height = window.innerHeight;
    this.canvasElement.width = window.innerWidth;

    this.context = (this.canvasElement.getContext('2d', {
      desynchronized: true
    }) as CanvasRenderingContext2D);

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
    this.setupTouchEvents();

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
    this.canvasElement.addEventListener("mousedown", (e) => {
      this.drawing = true;
      console.log('here');
      this.lastPos = this.getMousePos(this.canvasElement, e);
    }, { passive: true });

    this.canvasElement.addEventListener("mouseup", () => {
      this.drawing = false;

      (window as any).requestIdleCallback(async () => {
        let canvasState = this.canvasElement.toDataURL();
        await set('canvasState', canvasState);
      })
    }, { passive: true });

    this.canvasElement.addEventListener("mousemove", (e) => {
      this.mousePos = this.getMousePos(this.canvasElement, e);
    }, { passive: true });
  }

  setupTouchEvents() {
    this.canvasElement.addEventListener("touchstart", (e) => {
      this.mousePos = this.getTouchPos(this.canvasElement, e);

      const touch = e.touches[0];

      const mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
      });

      this.canvasElement.dispatchEvent(mouseEvent);
    }, { passive: true });

    this.canvasElement.addEventListener("touchend", () => {
      const mouseEvent = new MouseEvent("mouseup", {});
      this.canvasElement.dispatchEvent(mouseEvent);
    }, { passive: true });

    this.canvasElement.addEventListener("touchmove", (e) => {
      const touch = e.touches[0];

      const mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
      });

      this.canvasElement.dispatchEvent(mouseEvent);
    }, { passive: true });
  }

  getMousePos(canvasDom, mouseEvent) {
    const rect = canvasDom.getBoundingClientRect();

    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top
    };
  }

  getTouchPos(canvasDom, touchEvent) {
    const rect = canvasDom.getBoundingClientRect();

    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top
    };
  }

  renderCanvas() {
    if (this.drawing && this.mode === 'pen') {
      this.context.globalCompositeOperation = 'source-over';
      this.context.beginPath();
      this.context.moveTo(this.lastPos.x, this.lastPos.y);
      this.context.lineTo(this.mousePos.x, this.mousePos.y);
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
          console.log(ev.clientY);

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
        <canvas ref={(el) => this.canvasElement = el as HTMLCanvasElement}></canvas>
      </div>
    );
  }
}
