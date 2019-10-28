import { Component, Element, Listen, State, h } from '@stencil/core';
import { modalController as modalCtrl, alertController as alertCtrl, popoverController as popoverCtrl } from '@ionic/core';

import '@pwabuilder/pwainstall';

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
  @State() canInstall: boolean = false;

  wakeLockController: any;

  async componentDidLoad() {
    await this.setupWakeLock();
  }

  @Listen('beforeinstallprompt', { target: 'window' })
  handleInstall() {
    this.canInstall = true;
  }

  async setupWakeLock() {
    if ('WakeLock' in window) {
      this.wakeLockController = new AbortController();
      const signal = this.wakeLockController.signal;

      try {
        await (window as any).WakeLock.request('screen', { signal })
      }
      catch (err) {
        console.error(err);
      }
    }
  }

  changeColor(ev: CustomEvent) {
    console.log(ev.detail);
    this.color = ev.detail;
  }

  async clear() {
    this.currentFileName = null;

    (window as any).requestIdleCallback(async () => {
      const appCanvas = this.el.querySelector('app-canvas');
      await appCanvas.clearCanvas();
    }, {
      timeout: 2000
    });
  }

  async save() {
    const appCanvas = this.el.querySelector('app-canvas');

    if ("chooseFileSystemEntries" in window) {
      appCanvas.saveCanvas('');
    }
    else if (alertCtrl) {
      const alert = await alertCtrl.create({
        header: 'File Name',
        subHeader: 'Enter a name for the file',
        inputs: [
          {
            name: 'fileName',
            placeholder: 'newFile'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: async (data) => {
              console.log('Confirm Ok', data);
              console.log(appCanvas);
              await appCanvas.saveCanvas(data.fileName);

              console.log(data);

              this.currentFileName = data.fileName;
            }
          }
        ]
      });
      await alert.present();
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

    const modal = await modalCtrl.create({
      component: 'app-images',
      cssClass: 'imagesModal'
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data);

    if (data && data.url) {
      if (data.name) {
        this.currentFileName = data.name;
      }

      this.savedImage = data.url;
    }
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
    const appCanvas = this.el.querySelector('app-canvas');
    await appCanvas.addImageToCanvas(ev.detail);
  }

  async openSettings(ev: Event) {
    console.log(ev);
    const popover = await popoverCtrl.create({
      component: 'app-settings',
      event: ev
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

  async exportToNote() {
    console.log('exporting...');
    const appCanvas = this.el.querySelector('app-canvas');
    await appCanvas.exportToOneNote();
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

  componentDidUnload() {
    if (this.wakeLockController) {
      this.wakeLockController.abort();
    }
  }

  render() {
    return [
      <div class='app-home'>
        <pwa-install></pwa-install>

        {this.canInstall ? <ion-button id="pwaInstallButton" shape="round" size="small" onClick={() => this.openInstall()}>
          <ion-icon slot="start" name="download"></ion-icon>
          Install
        </ion-button> : null}

        {this.currentFileName ? <div id="fileNameDiv">
          <span>{this.currentFileName}</span>
        </div> : null}

        <app-canvas savedDrawing={this.savedImage} mode={this.drawingMode} color={this.color}></app-canvas>

        <app-controls onDoShare={() => this.doShare()} onExport={() => this.exportToNote()} onDragMode={() => this.doDrag()} onAddImage={(ev) => this.doImage(ev)} onDoGrid={() => this.doGrid()} onAllImages={() => this.allImages()} onSaveCanvas={() => this.save()} onPenMode={() => this.pen()} onEraserMode={() => this.erase()} onClearCanvas={() => this.clear()} onColorSelected={ev => this.changeColor(ev)}></app-controls>

        <div id="settingsBlock">
          <ion-button shape="round" size="small" id="settingsButton" color="primary" onClick={(ev) => this.openSettings(ev)} fill="clear">
            <ion-icon color="primary" name="settings"></ion-icon>
          </ion-button>

          <mgt-msal-provider scopes="Notes.Create" client-id="ea8ee476-a5c2-4617-b376-a3fb40e46864"></mgt-msal-provider>
          <mgt-login></mgt-login>

          {/*<mgt-tasks data-source="todo"></mgt-tasks>*/}
        </div>

        {/*<ion-button onClick={() => this.openSettings()} id="settingsButton" fill="clear">
          <ion-icon name="settings"></ion-icon>
    </ion-button>*/}
      </div>
    ];
  }
}
