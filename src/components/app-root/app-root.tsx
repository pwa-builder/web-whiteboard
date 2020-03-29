import { Component, Listen, h } from '@stencil/core';
// import { toastController as toastCtrl } from '@ionic/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

  @Listen("swUpdate", { target: 'window' })
  async onSWUpdate() {
    const registration = await navigator.serviceWorker.getRegistration();

    if (!registration || !registration.waiting) {
      // If there is no registration, this is the first service
      // worker to be installed. registration.waiting is the one
      // waiting to be activiated.
      return;
    }

    /*const toast = await toastCtrl.create({
      message: "New version available",
      buttons: [
        {
          side: "end",
          text: "reload",
          handler: () => {
            registration.waiting.postMessage("skipWaiting");
            window.location.reload();
          }
        }
      ]
    });

    await toast.present();*/
  }

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="app-home" />
          <ion-route url="/live/:roomName" component="app-home"></ion-route>
          <ion-route url="/boards/:name/:username/board" component="app-home" />
          <ion-route url="/profile/:name" component="app-profile" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
