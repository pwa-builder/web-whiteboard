import { Component, Element, h } from '@stencil/core';

declare var ga: any;

@Component({
  tag: 'app-intro',
  styleUrl: 'app-intro.css'
})
export class AppIntro {

  @Element() el: any;

  async close() {
    await (this.el.closest('ion-modal') as any).dismiss();
  }

  async getStarted() {
    await (this.el.closest('ion-modal') as any).dismiss();
  }

  render() {
    return [
      <ion-header no-border>
        <ion-toolbar>
          <ion-buttons slot="end">
            <ion-button onClick={() => this.close()}>
              <ion-icon name="close"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <div id="introBlock">

          <div id="introHeader">
          <h1>Webboard</h1>

<p>Enhance your work day and solve your cross platform whiteboarding needs with webboard! Draw text, shapes, attach images and more and share those whiteboards with anyone through OneDrive!</p>

<ion-button onClick={() => this.getStarted()}>Get Started</ion-button>
          </div>

        </div>
      </ion-content>
    ];
  }
}
