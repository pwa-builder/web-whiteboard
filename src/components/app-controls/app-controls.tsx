import { Component, Element, Event, EventEmitter, State, h } from '@stencil/core';
import { popoverController as popoverCtrl, toastController as toastCtrl } from '@ionic/core';

declare var ga: any;

@Component({
  tag: 'app-controls',
  styleUrl: 'app-controls.css'
})
export class AppControls {

  @State() openColors: boolean = false;
  @State() erasing: boolean = false;
  @State() changePenWidth: boolean = false;

  @Event() colorSelected: EventEmitter;
  @Event() clearCanvas: EventEmitter;
  @Event() eraserMode: EventEmitter;
  @Event() penMode: EventEmitter;
  @Event() saveCanvas: EventEmitter;
  @Event() allImages: EventEmitter;
  @Event() doGrid: EventEmitter;
  @Event() dragMode: EventEmitter;
  @Event() export: EventEmitter;
  @Event() doShare: EventEmitter;
  @Event() live: EventEmitter;
  @Event() doInkToShape: EventEmitter<boolean>;

  @Element() el: HTMLElement;

  penWidth: number;

  componentDidLoad() {
    document.addEventListener('pendockchange', (event: any) => {
      console.log('dockEvent', event);
      if (!event.docked) {
        // the pen is un-docked, handle it

        // this.changeColor();
      }
    });
  }

  changeColor(event) {
    console.log(event);
    this.penMode.emit();
    this.openColors = true;

  }

  handleWidth(event) {
    const canvas: HTMLCanvasElement = document.querySelector("#regCanvas");

    if (event.detail.value) {
      canvas.getContext('2d').lineWidth = event.detail.value;

      (window as any).requestIdleCallback(() => {
        this.penWidth = event.detail.value;
      }, {
        timeout: '2000'
      })
    }
  }

  close() {
    this.openColors = false;
  }

  openAllImages() {
    this.allImages.emit();
  }

  selectColor(color: string) {
    console.log(color);
    this.penMode.emit();
    this.erasing = false;
    this.colorSelected.emit(color);
    this.close();
  }

  clear() {
    this.el.querySelector("#trashIcon").animate(
      {
        transform: ['translateY(0px)', 'translateY(-8px)', 'translateY(0px)']
      },
      {
        duration: 200
      }
    );

    this.clearCanvas.emit();
  }

  async erase() {

    if (!this.erasing) {
      this.eraserMode.emit();
      this.erasing = true;

      const eraseToast = await toastCtrl.create({
        message: 'erase mode',
        duration: 1300,
        position: 'top'
      });
      await eraseToast.present();
    }
    else {
      this.erasing = false;
      this.penMode.emit();

      const penToast = await toastCtrl.create({
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
    // this.dragMode.emit();
  }

  openDrag() {
    this.dragMode.emit();
  }

  async openSettings(ev: Event) {
    console.log(ev);
    const popover = await popoverCtrl.create({
      component: 'app-settings',
      event: ev,
      cssClass: 'settingsPopover',
      showBackdrop: navigator.userAgent.includes('iPad') === false && window.matchMedia("(min-width: 1450px)").matches ? false : true
    });
    await popover.present();
  }

  deskShare() {
    this.doShare.emit();
  }

  doLive() {
    this.live.emit();
  }

  render() {
    return [
      <div id="main">

        {
          window.matchMedia("(min-width: 800px)").matches ? <div id='saveButtonDiv'>
            <button id='allImagesButton' onClick={() => this.openAllImages()}>
              <ion-icon name="image-outline"></ion-icon>
            </button>

            <button onClick={() => this.save()} id='saveButton'>
              <ion-icon name='save-outline'></ion-icon>
            </button>

            {typeof ((navigator as any).canShare) === "function" ? <button id="deskShareButton" onClick={() => this.deskShare()}>
              <ion-icon name="share-outline"></ion-icon>
            </button> : <button id="deskShareButton" onClick={() => this.deskShare()}>
                <ion-icon name="copy-outline"></ion-icon>
              </button>}
          </div> :

            <ion-fab vertical="top" horizontal="start">
              <ion-fab-button>
                <ion-icon name="menu"></ion-icon>
              </ion-fab-button>

              <ion-fab-list side="bottom">
                <ion-fab-button onClick={() => this.openAllImages()}>
                  <ion-icon name="image-outline"></ion-icon>
                </ion-fab-button>

                <ion-fab-button onClick={() => this.save()}>
                  <ion-icon name="save-outline"></ion-icon>
                </ion-fab-button>

                {typeof ((navigator as any).canShare) === "function" ? <ion-fab-button onClick={() => this.deskShare()}>
                  <ion-icon name="share-outline"></ion-icon>
                </ion-fab-button> : null}

                {/*<ion-fab-button onClick={() => this.doLive()}>
                  <ion-icon name="people-outline"></ion-icon>
        </ion-fab-button>*/}

              </ion-fab-list>

            </ion-fab>
        }

        {!this.openColors ? <div id='controlsBlock'>
          <div id='buttonBlock'>
            <button onClick={($event) => this.changeColor($event)}>
              <ion-icon name="color-palette-outline"></ion-icon>
            </button>

            <button onClick={() => this.erase()}>
              {!this.erasing ? <ion-icon id="eraseIcon" name="cut-outline"></ion-icon> : <ion-icon id="brushIcon" name="brush-outline"></ion-icon>}
            </button>

            <button onClick={() => this.openGrid()}>
              <ion-icon name="grid-outline"></ion-icon>
            </button>

            <button onClick={() => this.clear()}>
              <ion-icon id="trashIcon" name="trash-outline"></ion-icon>
            </button>
          </div>
        </div> : null}

        {this.openColors ? <div id='colorsBlock'>
          <div id='colorInternalBlock'>
            <button onClick={() => this.close()} id='closeButton'>
              <ion-icon name='close'></ion-icon>
            </button>
            <button onClick={() => this.selectColor('#000000')} id='blackButton'></button>
            <button onClick={() => this.selectColor('#FF0000')} id='redButton'></button>
            <button onClick={() => this.selectColor('#0000FF')} id='blueButton'></button>
            <button onClick={() => this.selectColor('#008000')} id='greenButton'></button>
            <input onChange={(event: any) => this.selectColor(event.target.value)} id="customColor" type="color" name="head"
              value="#e66465"></input>
          </div>
        </div> : null}
      </div>
    ];
  }
}
