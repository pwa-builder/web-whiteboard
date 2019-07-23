import { Component, Element, Event, EventEmitter, State, Prop, h } from '@stencil/core';


@Component({
  tag: 'app-controls',
  styleUrl: 'app-controls.css'
})
export class AppControls {

  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: HTMLIonToastControllerElement | null = null;
  @Prop({ connect: 'ion-popover-controller' }) popoverCtrl: HTMLIonPopoverControllerElement | null = null;
  @Prop({ connect: 'ion-modal-controller' }) modalCtrl: HTMLIonModalControllerElement | null = null;
  @Prop({ connect: 'ion-alert-controller' }) alertCtrl: HTMLIonAlertControllerElement | null = null;

  @State() openColors: boolean = false;
  @State() erasing: boolean = false;

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

  @Element() el: HTMLElement;

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
    console.log(color);
    this.penMode.emit();
    this.erasing = false;
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
        message: 'erase mode',
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
    // this.dragMode.emit();
  }

  openDrag() {
    this.dragMode.emit();
  }

  async openSettings(ev: Event) {
    const popover = await this.popoverCtrl.create({
      component: 'app-settings',
      event: ev
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
    /*const popover = await this.popoverCtrl.create({
      component: 'image-popover',
      event: ev
    });
    await popover.present();*/
    const modal = await this.modalCtrl.create({
      component: 'image-popover'
    });
    await modal.present();
  }

  async turnAI() {
    const modal = await this.modalCtrl.create({
      component: 'ai-popover',
    });

    await modal.present();
  }

  async openColorVision() {
    const modal = await this.modalCtrl.create({
      component: 'color-modal'
    });
    await modal.present();

    const colorData = await modal.onDidDismiss();

    console.log(colorData.data);

    if (colorData.data && colorData.data.length > 0) {
      this.selectColor(`#${colorData.data}`);

      const toast = await this.toastCtrl.create({
        message: `Found this color: #${colorData.data}`,
        duration: 1200,
        position: "top",
      });
      await toast.present();
    }
  }

  async exportToNote() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm',
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

  render() {
    return [
      <div id="main">
        <button id="aiButton" onClick={() => this.turnAI()}>
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

            <button onClick={(event) => this.openSettings(event)} id="tasksButton">
              <ion-icon name="today"></ion-icon>
            </button>

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

                <ion-fab-button color="secondary" onClick={(event) => this.openSettings(event)}>
                  <ion-icon name="today"></ion-icon>
                </ion-fab-button>

                <ion-fab-button color="primary" onClick={() => this.turnAI()}>
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
              {!this.erasing ? <ion-icon name="remove-circle-outline"></ion-icon> : <ion-icon name="brush"></ion-icon>}
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
              <ion-icon name="images"></ion-icon>
            </button>

            {window.matchMedia("(min-width: 1200px)").matches ? <button onClick={() => this.exportToNote()}>
              <ion-icon id="oneSvg" src="/assets/onenote.svg"></ion-icon>
            </button> : null}

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
