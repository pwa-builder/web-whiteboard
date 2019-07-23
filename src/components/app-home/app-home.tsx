import { Component, Element, Prop, State, h } from '@stencil/core';

/*import '@microsoft/mgt/dist/es6/components/mgt-login/mgt-login.js';
import '@microsoft/mgt/dist/es6/components/providers/mgt-msal-provider.js';*/

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

  @Prop({ connect: 'ion-alert-controller' }) alertCtrl: HTMLIonAlertControllerElement | null = null;
  @Prop({ connect: 'ion-modal-controller' }) modalCtrl: HTMLIonModalControllerElement | null = null;
  @Prop({ connect: 'ion-popover-controller' }) popoverCtrl: HTMLIonPopoverControllerElement | null = null;

  changeColor(ev: CustomEvent) {
    console.log(ev.detail);
    this.color = ev.detail;
  }

  clear() {
    const appCanvas = this.el.querySelector('app-canvas');
    appCanvas.clearCanvas();
  }

  async save() {
    const appCanvas = this.el.querySelector('app-canvas');

    if ("chooseFileSystemEntries" in window) {
      appCanvas.saveCanvas('');
    }
    else if (this.alertCtrl) {
      const alert = await this.alertCtrl.create({
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
            handler: (data) => {
              console.log('Confirm Ok', data);
              console.log(appCanvas);
              appCanvas.saveCanvas(data.fileName);
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

    const modal = await this.modalCtrl.create({
      component: 'app-images',
      cssClass: 'imagesModal'
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data);

    if (data && data.url) {
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
    const popover = await this.popoverCtrl.create({
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

  render() {
    return [
      <div class='app-home'>
        <pwa-install></pwa-install>
        
        <app-canvas dragMode={this.dragMode} savedDrawing={this.savedImage} mode={this.drawingMode} color={this.color}></app-canvas>

        <app-controls onExport={() => this.exportToNote()} onDragMode={() => this.doDrag()} onAddImage={(ev) => this.doImage(ev)} onDoGrid={() => this.doGrid()} onAllImages={() => this.allImages()} onSaveCanvas={() => this.save()} onPenMode={() => this.pen()} onEraserMode={() => this.erase()} onClearCanvas={() => this.clear()} onColorSelected={ev => this.changeColor(ev)}></app-controls>

        <div id="settingsBlock">
          <mgt-msal-provider scopes="Notes.Create" client-id="ea8ee476-a5c2-4617-b376-a3fb40e46864"></mgt-msal-provider>
          <mgt-login></mgt-login>

          {/*<mgt-tasks data-source="todo"></mgt-tasks>*/}

          {/*<ion-button shape="round" size="small" id="settingsButton" color="primary" onClick={(ev) => this.openSettings(ev)} fill="clear">
            <ion-icon color="primary" name="settings"></ion-icon>
    </ion-button>*/}
        </div>

        {/*<ion-button onClick={() => this.openSettings()} id="settingsButton" fill="clear">
          <ion-icon name="settings"></ion-icon>
    </ion-button>*/}
      </div>
    ];
  }
}
