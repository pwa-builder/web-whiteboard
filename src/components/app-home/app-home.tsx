import { Component, Element, Prop, Listen, State, h } from '@stencil/core';
import { alertController as alertCtrl, popoverController as popoverCtrl, toastController, alertController } from '@ionic/core';

import { set, get } from 'idb-keyval';
import { fileOpen } from 'browser-nativefs';

import '@pwabuilder/pwainstall';

declare var ga: any;

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  @Element() el: HTMLElement;

  @State() color: string = 'black';
  @State() drawingMode: string = 'pen';
  @State() savedImage: string | null = null;
  @State() grid: boolean = false;
  @State() dragMode: boolean = false;
  @State() currentFileName: string | null = null;
  @State() currentFileHandle: any;
  @State() canInstall: boolean = false;
  @State() spanned: boolean = false;
  // @State() spanned: boolean = true;

  @State() mgtLoaded: boolean = false;

  @Prop() name: string;
  @Prop() username: string;

  wakeLockController: any;

  async componentDidLoad() {
    (window as any).requestIdleCallback(async () => {
      const test = await get('firstSeen');

      if (!test) {
        const toast = await toastController.create({
          message: "Webboard currently uses analytics to measure usage. No personal or identifiable data is collected. By continuing to use this app you agree to this.",
          buttons: [
            {
              text: "accept",
              side: "end"
            }
          ]
        });

        await toast.present();

        toast.onDidDismiss().then(async () => {
          await set('firstSeen', true);
        });
      }
    });

    (window as any).requestIdleCallback(() => {
      this.setupWakeLock();
    });

    (window as any).requestIdleCallback(async () => {
      if (this.name && this.username) {
        const alert = await alertCtrl.create({
          header: "Saved Image",
          subHeader: "Open a saved image?",
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel: blah');
              }
            }, {
              text: 'Confirm',
              handler: async () => {
                const module = await import('../../services/api');

                const data = await module.getSavedImage(this.name, { username: this.username });

                if (data) {
                  this.savedImage = data.url;
                }
              }
            }
          ]
        });
        await alert.present();
      }
    });

    if ((window as any).getWindowSegments) {
      this.handleSegments();

      window.onresize = () => {
        console.log('resize')
        this.handleSegments();
      }
    }
  }

  handleSegments() {
    const segments = (window as any).getWindowSegments();
    if (segments.length === 2) {
      this.spanned = true;
    }
    else {
      this.spanned = false;
    }
  }

  @Listen('beforeinstallprompt', { target: 'window' })
  handleInstall() {
    this.canInstall = true;
  }

  async setupWakeLock() {
    if ('wakeLock' in navigator && 'request' in (navigator as any).wakeLock) {
      this.wakeLockController = await (navigator as any).wakeLock.request('screen');
    }
  }

  changeColor(ev: CustomEvent) {
    this.color = ev.detail;
  }

  async clear() {
    const appCanvas = this.el.querySelector('app-canvas');
    const alert = await alertController.create({
      header: 'Delete this Canvas?',
      message: 'Are you sure you want to delete the canvas? This will ERASE your current work.',
      buttons: [{
        text: "Cancel",
        cssClass: 'secondary'
      },
      {
        text: 'Yes',
        handler: async () => {
          this.currentFileName = null;

          await appCanvas.clearCanvas();
        }
      }
      ]
    });
    await alert.present();
  }

  async save() {
    const appCanvas = this.el.querySelector('app-canvas');


    if (this.currentFileHandle) {
      const firstToast = await toastController.create({
        message: "saving...",
      });
      await firstToast.present();

      console.log("this.currentFileHandle", this.currentFileHandle);
      await appCanvas.saveCanvas(this.currentFileName, this.currentFileHandle);

      await firstToast.dismiss();

      const toast = await toastController.create({
        message: `${this.currentFileName} saved`,
        duration: 1800
      });
      await toast.present();
    }
    else {
      const firstToast = await toastController.create({
        message: "saving...",
      });
      await firstToast.present();

      this.currentFileHandle = await appCanvas.saveCanvas("", this.currentFileHandle);
      console.log(this.currentFileHandle);

      if (this.currentFileHandle && this.currentFileHandle.name) {
        this.currentFileName = this.currentFileHandle.name;
      }

      await firstToast.dismiss();

      const toast = await toastController.create({
        message: `${this.currentFileName} saved`,
        duration: 1800
      });
      await toast.present();
    }
  }

  erase() {
    console.log('erase');
    this.drawingMode = 'erase';
  }

  pen() {
    console.log('pen');
    this.drawingMode = 'pen';
  }

  async allImages() {
    this.savedImage = null;

    /*const modal = await modalCtrl.create({
      component: 'app-images',
      cssClass: 'imagesModal',
      showBackdrop: navigator.userAgent.includes('iPad') === false && window.matchMedia("(min-width: 1450px)").matches ? false : true
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data);

    if (data && data.url && data.handle) {
      console.log(data);
      if (data.name) {
        this.currentFileName = data.name;
        this.currentFileHandle = data.handle;
      }

      const fileObject = await data.handle.getFile();
      const fileBlob = await fileObject.blob();

      this.savedImage = fileBlob;
    }*/

    const options = {
      // List of allowed MIME types, defaults to `*/*`.
      mimeTypes: ['image/*'],
      // List of allowed file extensions, defaults to `''`.
      extensions: ['png', 'jpg', 'jpeg', 'webp'],
      // Textual description for file dialog , defaults to `''`.
      description: 'Image files',
    };

    const openedFile: any = await fileOpen(options);
    console.log('openedFile', openedFile);

    this.currentFileHandle = openedFile.handle;
    this.currentFileName = openedFile.name;

    const fileObject = await openedFile.handle.getFile();
    console.log(fileObject);

    this.savedImage = URL.createObjectURL(fileObject);
  }

  async doGrid() {
    console.log('here');

    if (this.grid === true) {
      this.grid = false;

      const appCanvas = this.el.querySelector('app-canvas');
      await appCanvas.clearGrid();
    }
    else {
      console.log('hello world');
      this.grid = true;
      const appCanvas = this.el.querySelector('app-canvas');
      await appCanvas.drawGrid();
    }
  }

  async doImage(ev) {
    console.log(ev);
    //  const appCanvas = this.el.querySelector('app-canvas');
    // await appCanvas.addImageToCanvas(ev.detail);
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

  async openLoginPop(ev: Event) {
    const popover = await popoverCtrl.create({
      component: 'login-pop',
      event: ev,
      showBackdrop: window.matchMedia("(min-width: 1450px)").matches ? false : true
    });
    await popover.present();
  }

  doDrag() {
    if (this.dragMode === true) {
      this.dragMode = false;
    }
    else {
      this.dragMode = true;
    }
  }

  openInstall() {
    const pwaInstall = (this.el.querySelector('pwa-install') as HTMLElement);

    if (pwaInstall.hasAttribute('openmodal')) {
      pwaInstall.removeAttribute('openmodal');
    }
    else {
      pwaInstall.setAttribute('openmodal', '');
    }
  }

  doShare() {
    this.el.querySelector('app-canvas').shareCanvas();
  }

  handleLive() {
    this.el.querySelector('app-canvas').liveConnect();
  }

  spanCanvas() {
    if (this.spanned === true) {
      this.spanned = false;
      this.el.querySelector('app-canvas').resizeCanvas();
    }
    else {
      this.el.querySelector('app-canvas').resizeCanvas(window.innerWidth / 2, window.innerHeight);
      this.spanned = true;
    }
  }

  async handleInkToShape(ev) {
    console.log('home inkshape', ev.detail);
    await this.el.querySelector('app-canvas').inkToShape();
  }


  componentDidUnload() {
    if (this.wakeLockController) {
      this.wakeLockController.release();
    }
  }

  render() {
    return [
      <div class='app-home'>
        <pwa-install usecustom></pwa-install>

        {this.canInstall && (window.matchMedia("(min-width: 1200px)").matches) && window.matchMedia('(display-mode: standalone)').matches === false ? <ion-button id="pwaInstallButton" shape="round" size="small" onClick={() => this.openInstall()}>
          <ion-icon slot="start" name="download"></ion-icon>
          Install
         </ion-button> : null}

        {
          this.canInstall && (window.matchMedia("(min-width: 1200px)").matches) === false ?
            <ion-button onClick={() => this.openInstall()} id="mobileInstallButton" fill="clear" size="small">
              <ion-icon name="download"></ion-icon>
            </ion-button>
            : null
        }

        {this.currentFileName ? <div id="fileNameDiv">
          <span>{this.currentFileName}</span>
        </div> : null}

        <app-canvas savedDrawing={this.savedImage} mode={this.drawingMode} color={this.color}></app-canvas>

        <app-controls onDoInkToShape={(ev) => this.handleInkToShape(ev)} onLive={() => this.handleLive()} onDoShare={() => this.doShare()} onDragMode={() => this.doDrag()} onDoGrid={() => this.doGrid()} onAllImages={() => this.allImages()} onSaveCanvas={() => this.save()} onPenMode={() => this.pen()} onEraserMode={() => this.erase()} onClearCanvas={() => this.clear()} onColorSelected={ev => this.changeColor(ev)}></app-controls>

        <div id="settingsBlock">
          <ion-button shape="round" size="small" id="settingsButton" color="primary" onClick={(event) => this.openSettings(event)} fill="clear">
            <ion-icon color="primary" name="settings-outline"></ion-icon>
          </ion-button>

          <div>

            {(window.matchMedia("(min-width: 800px)").matches) ? <div>
              <app-login></app-login>
            </div> : null}
          </div>

          {/*<mgt-tasks data-source="todo"></mgt-tasks>*/}
        </div>

      </div>
    ];
  }
}
