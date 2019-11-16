import { Component, h, Prop, State } from '@stencil/core';
import { getSavedImage } from '../../services/api';

import 'pinch-zoom-element';

@Component({
  tag: 'side-cart',
  styles: `
    #mainSideCar {
      background: #8080804a;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #mainSideCar pinch-zoom {
      height: 100vh;
      width: 86vh;
    }

    header {
      padding-left: 16px;
      padding-top: 14px;
      position: fixed;
      padding-right: 16px;
      top: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    header h2 {
      margin: 0;
      padding: 0;
      font-size: 22px;
      font-weight: bold;
    }
  `
})
export class SideCart {

  @State() imageState: any;

  @Prop() name: string;
  @Prop() username: string;

  async componentDidLoad() {
    if (this.name) {
      const data = await getSavedImage(this.name, { username: this.username });
      console.log(data);

      this.imageState = data.url;
    }
  }

  async share() {
    const file = new File([this.imageState], "default.jpg");

    if ((navigator as any).canShare && (navigator as any).canShare(file)) {
      await (navigator as any).share({
        files: [file],
        title: 'Whiteboard',
        text: 'Check out this whiteboard from WebBoard https://webboard-app.web.app',
      })
    } else {
      console.log('Your system doesn\'t support sharing files.');
    }
  }

  render() {
    return (
      <div>
        <header>
          <h2>SideCart</h2>

          <ion-buttons>
            <ion-fab-button id="sideCarShareButton" onClick={() => this.share()}>
              <ion-icon name="share"></ion-icon>
            </ion-fab-button>
          </ion-buttons>
        </header>

        <section id="mainSideCar">
          <pinch-zoom>
            <img src={this.imageState}></img>
          </pinch-zoom>
        </section>

      </div>
    );
  }
}
