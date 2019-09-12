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
        </ion-list>
      </div>
    );
  }
}
