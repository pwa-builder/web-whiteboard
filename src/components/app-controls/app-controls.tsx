import { Component, Element, Event, EventEmitter, State, h } from '@stencil/core';
import { modalController as modalCtrl, alertController as alertCtrl, popoverController as popoverCtrl, toastController as toastCtrl } from '@ionic/core';


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
  @Event() addImage: EventEmitter;
  @Event() dragMode: EventEmitter;
  @Event() export: EventEmitter;
  @Event() doShare: EventEmitter;

  @Element() el: HTMLElement;

  penWidth: number;

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
    const jumpAni = this.el.querySelector("#trashIcon").animate(
      {
        transform: ['translateY(0px)', 'translateY(-8px)', 'translateY(0px)']
      },
      {
        duration: 200
      }
    );

    jumpAni.onfinish = () => {
      this.clearCanvas.emit();
    }
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
      showBackdrop: window.matchMedia("(min-width: 1200px)").matches ? false : true
    });
    await popover.present();
  }

  handleFileInput(ev: Event) {
    console.log((ev.target as any).files);

    if (FileReader && (ev.target as any).files && (ev.target as any).files.length) {
      var fr = new FileReader();
      fr.onload = () => {
        this.addImage.emit(fr.result);
      }
      fr.readAsDataURL((ev.target as any).files[0]);
    }
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
        showBackdrop: window.matchMedia("(min-width: 1200px)").matches ? false : true
      });
      await modal.present();
    }
  }

  async turnAI(ev) {
    if (window.matchMedia("(min-width: 1200px)").matches) {
      const popover = await popoverCtrl.create({
        component: 'ai-popover',
        event: ev,
        cssClass: "aiPopover",
        showBackdrop: window.matchMedia("(min-width: 1200px)").matches ? false : true
      })

      await popover.present();
    }
    else {
      const modal = await modalCtrl.create({
        component: 'ai-popover',
        showBackdrop: window.matchMedia("(min-width: 1200px)").matches ? false : true
      });

      await modal.present();
    }
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

  async exportToNote() {
    const alert = await alertCtrl.create({
      header: 'Confirm',
      subHeader: 'export to onenote',
      message: 'Export to OneNote?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.export.emit();
          }
        }
      ]
    });
    await alert.present();
  }

  deskShare() {
    this.doShare.emit();
  }

  render() {
    return [
      <div id="main">
        <button id="aiButton" onClick={(event) => this.turnAI(event)}>
          <ion-icon name="eye"></ion-icon>

          <span id="aiSpan">AI</span>
        </button>

        {
          window.matchMedia("(min-width: 800px)").matches ? <div id='saveButtonDiv'>
            <button id='allImagesButton' onClick={() => this.openAllImages()}>
              <ion-icon name='images'></ion-icon>
            </button>

            <button onClick={() => this.save()} id='saveButton'>
              <ion-icon name='save'></ion-icon>
            </button>

            { typeof((navigator as any).canShare) === "function" ? <button id="deskShareButton" onClick={() => this.deskShare()}>
              <ion-icon name="share"></ion-icon>
            </button> : null }

          </div> :

            <ion-fab vertical="top" horizontal="start">
              <ion-fab-button>
                <ion-icon name="menu"></ion-icon>
              </ion-fab-button>

              <ion-fab-list side="bottom">
                <ion-fab-button color="primary" onClick={() => this.openAllImages()}>
                  <ion-icon name='images'></ion-icon>
                </ion-fab-button>

                <ion-fab-button color="secondary" onClick={() => this.save()}>
                  <ion-icon name="save"></ion-icon>
                </ion-fab-button>

                {typeof((navigator as any).canShare) === "function" ? <ion-fab-button color="primary" onClick={() => this.deskShare()}>
                  <ion-icon name="share"></ion-icon>
                </ion-fab-button> : null}

                <ion-fab-button color="light" onClick={(event) => this.turnAI(event)}>
                  ai
                </ion-fab-button>

                <ion-fab-button color="light" onClick={() => this.exportToNote()}>
                  <ion-icon src="/assets/onenote.svg"></ion-icon>
                </ion-fab-button>
              </ion-fab-list>

            </ion-fab>
        }

        {!this.openColors ? <div id='controlsBlock'>
          <div id='buttonBlock'>
            <button onClick={() => this.changeColor()}>
              <ion-icon name="color-palette"></ion-icon>
            </button>

            <button onClick={() => this.erase()}>
              {!this.erasing ? <ion-icon id="eraseIcon" src="/assets/eraser-solid.svg"></ion-icon> : <ion-icon id="brushIcon" name="brush"></ion-icon>}
            </button>

            <button onClick={() => this.openGrid()}>
              <ion-icon name="grid"></ion-icon>
            </button>

            {/*<button onClick={() => this.openDrag()}>
              <ion-icon name="expand"></ion-icon>
    </button>*/}

            {/*<input onChange={(ev) => this.handleFileInput(ev)} accept="image/png, image/jpeg" type="file" name="file" id="file" class="inputfile" />
            <label id="fileLabel" htmlFor="file">
              <ion-icon name="images"></ion-icon>
    </label>*/}

            <button onClick={() => this.addImagePop()}>
              <ion-icon id="imagesIcon" name="images"></ion-icon>
            </button>

            {window.matchMedia("(min-width: 1200px)").matches ? <button onClick={() => this.exportToNote()}>
              <ion-icon id="oneSvg" src="/assets/onenote.svg"></ion-icon>
            </button> : null}

            <button onClick={() => this.clear()}>
              <ion-icon id="trashIcon" name="trash"></ion-icon>
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
              <ion-icon name="color-filter"></ion-icon>
            </button>
          </div>
        </div> : null}
      </div>
    ];
  }
}
