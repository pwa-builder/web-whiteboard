import { Component, h, State, Prop } from '@stencil/core';


@Component({
  tag: 'pwa-install',
  styles: `
    #desktopInstallButton {
      position: fixed;
      top: 2em;
      right: 13em;
      background: #1976d2;
      color: white;
      font-size: 12px;
      font-weight: bold;
      border-radius: 20px;
      padding-left: 14px;
      padding-right: 14px;
      padding-top: 8px;
      padding-bottom: 8px;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: center;
      justify-content: center;
      -ms-flex-align: center;
      align-items: center;
      z-index: 9999;
      box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }

    @media (max-width: 1200px) {
      #desktopInstallButton {
        display: none;
      }
    }
  `
})
export class PWAInstall {

  @State() deferredPrompt: any;
  @State() showInstall: boolean = false;

  @Prop({ connect: 'ion-modal-controller' }) modalCtrl: HTMLIonModalControllerElement | null = null;

  componentWillLoad() {
    console.log('Component is about to be rendered');
  }

  componentDidLoad() {
    console.log('in here');
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('e', e);
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;

      this.showInstall = true;
    });
  }

  async install() {
    const modal = await this.modalCtrl.create({
      component: 'install-modal',
      componentProps: {
        installEvent: this.deferredPrompt
      }
    });
    await modal.present();
  }

  render() {
    return [
      <div>
        {this.showInstall ? <button onClick={() => this.install()} id="desktopInstallButton">Install App</button> : null}
      </div>
    ];
  }
}
