import { Component, h } from '@stencil/core';


@Component({
  tag: 'app-settings',
  styleUrl: 'app-settings.css'
})
export class AppSettings {



  render() {
    return (
      <div>
        <ion-list lines="none">
          <ion-item href="https://go.microsoft.com/fwlink/?LinkId=521839">
            Microsoft Privacy Statement
          </ion-item>

          <ion-item href="https://github.com/jgw96/web-whiteboard">
            <ion-icon slot="start" name="information-circle-outline"></ion-icon>
            <ion-label>
              About
            </ion-label>
          </ion-item>

          <ion-item href="https://github.com/jgw96/web-whiteboard/issues">
            <ion-icon slot="start" name="happy"></ion-icon>
            <ion-label>
              Send Feedback
            </ion-label>
          </ion-item>

          <ion-item href="https://play.google.com/store/apps/details?id=org.webboard.app">
            <ion-icon slot="start" name="logo-android"></ion-icon>
            <ion-label>
              Webboard for Android
            </ion-label>
          </ion-item>

          <ion-item href="https://www.microsoft.com/store/productId/9P53Q9BF3MV6">
            <ion-icon slot="start" name="logo-windows"></ion-icon>

            <ion-label>
              Webboard for Windows
            </ion-label>
          </ion-item>

        </ion-list>
      </div>
    );
  }
}
