let canvas;
let context;

onmessage = (evt) => {
  canvas = evt.data.canvas;
  context = canvas.getContext("2d");

  CanvasWorker.setupCanvas();
  CanvasWorker.renderCanvas();
}

const CanvasWorker = {

  drawing: false,
  mode: 'pen',
  lastPos: null,
  mousePos: null,

  setupCanvas() {
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.lineCap = 'round';
    context.lineJoin = 'round';

    context.strokeStyle = this.color;

    context.lineWidth = 10;
  },

  renderCanvas() {
    if (this.drawing && this.mode === 'pen') {
      context.globalCompositeOperation = 'source-over';
      context.beginPath();
      context.moveTo(this.lastPos.x, this.lastPos.y);
      context.lineTo(this.mousePos.x, this.mousePos.y);

      if (this.mousePos.type !== 'mouse') {
        context.lineWidth = this.mousePos.width - 40;
      }
      else {
        context.lineWidth = 10;
      }

      context.stroke();
      context.closePath();

      this.lastPos = this.mousePos;
    }
    else if (this.drawing && this.mode === 'erase') {
      context.globalCompositeOperation = 'destination-out';
      context.beginPath();
      context.moveTo(this.lastPos.x, this.lastPos.y);
      context.lineTo(this.mousePos.x, this.mousePos.y);
      context.stroke();
      context.closePath();
      this.lastPos = this.mousePos;
    }

    requestAnimationFrame(() => this.renderCanvas());
  }

}
