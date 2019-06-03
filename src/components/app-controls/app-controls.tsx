import { Component, Event, EventEmitter, State, Prop, h } from '@stencil/core';


@Component({
  tag: 'app-controls',
  styleUrl: 'app-controls.css',
  shadow: true
})
export class AppControls {

  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: HTMLIonToastControllerElement | null = null;

  @State() openColors: boolean = false;
  @State() erasing: boolean = false;

  @Event() colorSelected: EventEmitter;
  @Event() clearCanvas: EventEmitter;
  @Event() eraserMode: EventEmitter;
  @Event() penMode: EventEmitter;
  @Event() saveCanvas: EventEmitter;
  @Event() allImages: EventEmitter;
  @Event() doGrid: EventEmitter;

  changeColor() {
    this.penMode.emit();
    this.openColors = true;
  }

  close() {
    this.openColors = false;
  }

  openAllImages() {
    this.allImages.emit();
  }

  selectColor(color: string) {
    this.penMode.emit();
    this.colorSelected.emit(color);
    this.close();
  }

  clear() {
    this.clearCanvas.emit();
  }

  async erase() {
    if (!this.erasing) {
      this.eraserMode.emit();
      this.erasing = true;

      const eraseToast = await this.toastCtrl.create({
        message: 'erasing mode',
        duration: 1300,
        position: 'top'
      });
      await eraseToast.present();
    }
    else {
      this.erasing = false;
      this.penMode.emit();

      const penToast = await this.toastCtrl.create({
        message: 'pen mode',
        duration: 1300,
        position: 'top'
      });
      await penToast.present();
    }
  }

  save() {
    this.saveCanvas.emit();
  }

  openGrid() {
    this.doGrid.emit();
  }

  render() {
    return (
      <div>
        <div id='saveButtonDiv'>
          <button id='allImagesButton' onClick={() => this.openAllImages()}>
            <ion-icon name='images'></ion-icon>
          </button>
          <button onClick={() => this.save()} id='saveButton'>
            <ion-icon name='save'></ion-icon>
          </button>
        </div>
        {!this.openColors ? <div id='controlsBlock'>
          <div id='buttonBlock'>
            <button onClick={() => this.changeColor()}>
              <ion-icon name="color-palette"></ion-icon>
            </button>

            <button onClick={() => this.erase()}>
              {!this.erasing ? <ion-icon name="brush"></ion-icon> : <ion-icon name="contrast"></ion-icon>}
            </button>

            <button onClick={() => this.openGrid()}>
              <ion-icon name="grid"></ion-icon>
            </button>

            <button onClick={() => this.clear()}>
              <ion-icon name="trash"></ion-icon>
            </button>
          </div>
        </div> : null}

        {this.openColors ? <div id='colorsBlock'>
          <div id='colorInternalBlock'>
            <button onClick={() => this.close()} id='closeButton'>
              <ion-icon name='close'></ion-icon>
            </button>
            <button onClick={() => this.selectColor('black')} id='blackButton'></button>
            <button onClick={() => this.selectColor('red')} id='redButton'></button>
            <button onClick={() => this.selectColor('blue')} id='blueButton'></button>
            <button onClick={() => this.selectColor('green')} id='greenButton'></button>
          </div>
        </div> : null}
      </div>
    );
  }
}
