import { Component, Element, Event, EventEmitter, State, h } from '@stencil/core';
import { modalController as modalCtrl, popoverController as popoverCtrl, toastController as toastCtrl } from '@ionic/core';

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

        this.changeColor();
      }
    });
  }

  changeColor() {
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

  async addImagePop() {
    /*const popover = await popoverCtrl.create({
      component: 'image-popover',
      event: ev
    });
    await popover.present();*/

    const jumpAni = this.el.querySelector("#imagesIcon").animate(
      {
        transform: ['translateY(0px)', 'translateY(-8px)', 'translateY(0px)']
      },
      {
        duration: 200
      }
    );

    jumpAni.onfinish = async () => {
      const modal = await modalCtrl.create({
        component: 'image-popover',
        cssClass: 'extImageModal',
        showBackdrop: navigator.userAgent.includes('iPad') === false && window.matchMedia("(min-width: 1450px)").matches ? false : true
      });
      await modal.present();
    }
  }

  async turnAI() {
    const modal = await modalCtrl.create({
      component: 'ai-popover',
      showBackdrop: navigator.userAgent.includes('iPad') === false && window.matchMedia("(min-width: 1450px)").matches ? false : true
    });

    await modal.present();
  }

  async openColorVision() {
    const modal = await modalCtrl.create({
      component: 'color-modal'
    });
    await modal.present();

    const colorData = await modal.onDidDismiss();

    console.log(colorData.data);

    if (colorData.data && colorData.data.length > 0) {
      this.selectColor(`#${colorData.data}`);

      const toast = await toastCtrl.create({
        message: `Found this color: #${colorData.data}`,
        duration: 1200,
        position: "top",
      });
      await toast.present();
    }
  }

  deskShare() {
    this.doShare.emit();
  }

  doLive() {
    this.live.emit();
  }

  async moreTools(ev) {
    const popover = await popoverCtrl.create({
      component: "more-tools",
      event: ev,
      showBackdrop: navigator.userAgent.includes('iPad') === false && window.matchMedia("(min-width: 1450px)").matches ? false : true
    })
    await popover.present();

    (popover.querySelector('more-tools') as HTMLElement).addEventListener('doInkToShape', (ev: any) => {
      console.log(ev.detail);
      this.doInkToShape.emit(ev.detail);
    });

    (popover.querySelector('more-tools') as HTMLElement).addEventListener('doAi', async (ev: any) => {
      console.log(ev.detail);
      await this.turnAI();
    });

    (popover.querySelector('more-tools') as HTMLElement).addEventListener('share', (ev: any) => {
      console.log(ev.detail);
      this.doShare.emit();
    });
  }

  render() {
    return [
      <div id="main">

        {
          window.matchMedia("(min-width: 800px)").matches ? <div id='saveButtonDiv'>
            <button id='allImagesButton' onClick={() => this.openAllImages()}>
              <ion-icon name="document-outline"></ion-icon>
            </button>

            <button onClick={() => this.save()} id='saveButton'>
              <ion-icon name='save-outline'></ion-icon>
            </button>

            {typeof ((navigator as any).canShare) === "function" ? <button id="deskShareButton" onClick={() => this.deskShare()}>
              <ion-icon name="share-outline"></ion-icon>
            </button> : <button id="deskShareButton" onClick={() => this.deskShare()}>
                <ion-icon name="copy-outline"></ion-icon>
              </button>}

            <button id="liveButton" onClick={() => this.doLive()}>
              <ion-icon name="people-outline"></ion-icon>
            </button>

          </div> :

            <ion-fab vertical="top" horizontal="start">
              <ion-fab-button>
                <ion-icon name="menu"></ion-icon>
              </ion-fab-button>

              <ion-fab-list side="bottom">
                <ion-fab-button onClick={() => this.openAllImages()}>
                  <ion-icon name="document-outline"></ion-icon>
                </ion-fab-button>

                <ion-fab-button onClick={() => this.save()}>
                  <ion-icon name="save-outline"></ion-icon>
                </ion-fab-button>

                {typeof ((navigator as any).canShare) === "function" ? <ion-fab-button onClick={() => this.deskShare()}>
                  <ion-icon name="share-outline"></ion-icon>
                </ion-fab-button> : null}

                <ion-fab-button onClick={() => this.doLive()}>
                  <ion-icon name="people-outline"></ion-icon>
                </ion-fab-button>

              </ion-fab-list>

            </ion-fab>
        }

        {!this.openColors ? <div id='controlsBlock'>
          <div id='buttonBlock'>
            <button onClick={() => this.changeColor()}>
              <ion-icon name="color-palette-outline"></ion-icon>
            </button>

            <button onClick={() => this.erase()}>
              {!this.erasing ? <ion-icon id="eraseIcon" name="cut-outline"></ion-icon> : <ion-icon id="brushIcon" name="brush-outline"></ion-icon>}
            </button>

            <button onClick={() => this.openGrid()}>
              <ion-icon name="grid-outline"></ion-icon>
            </button>

            {/*<button onClick={() => this.openDrag()}>
              <ion-icon name="expand"></ion-icon>
    </button>*/}

            {/*<input onChange={(ev) => this.handleFileInput(ev)} accept="image/png, image/jpeg" type="file" name="file" id="file" class="inputfile" />
            <label id="fileLabel" htmlFor="file">
              <ion-icon name="images"></ion-icon>
    </label>*/}

            <button onClick={() => this.addImagePop()}>
              <ion-icon id="imagesIcon" name="images-outline"></ion-icon>
            </button>

            <button onClick={(event) => this.moreTools(event)}>
              <ion-icon name="ellipsis-vertical-outline"></ion-icon>
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
            <button onClick={() => this.selectColor('black')} id='blackButton'></button>
            <button onClick={() => this.selectColor('red')} id='redButton'></button>
            <button onClick={() => this.selectColor('blue')} id='blueButton'></button>
            <button onClick={() => this.selectColor('green')} id='greenButton'></button>
            <input onChange={(event: any) => this.selectColor(event.target.value)} id="customColor" type="color" name="head"
              value="#e66465"></input>
            <button id="visionColorButton" onClick={() => this.openColorVision()}>
              <ion-icon name="color-filter-outline"></ion-icon>
            </button>
          </div>
        </div> : null}
      </div>
    ];
  }
}
