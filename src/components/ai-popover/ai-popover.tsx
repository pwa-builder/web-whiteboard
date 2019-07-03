import { Component, Element, h, State } from '@stencil/core';


@Component({
  tag: 'ai-popover',
  styles: `
    ion-content {
      padding: 10px;
    }

    .swiper-slide#slideOne  {
      padding-left: 2em;
      padding-right: 2em;
      height: 400px;
    }
    
    .swiper-slide  h2 {
      font-weight: bold;
    }

    .swiper-slide  img {
      width: 16em !important;
      margin-bottom: 1em;
      margin-top: 2.4em;
    }

    .swiper-slide#slideOne ion-button {
      margin-top: 2em;
    }

    #slideOne h2 {
      font-weight: bold;
    }

    @media(max-width: 600px) {
      #slideOne.swiper-slide {
        padding: 1em;
        height: 340px;
      }
    }
  `
})
export class AiPopover {

  @Element() el: HTMLElement;

  @State() aiToken;

  async componentDidLoad() {
    this.aiToken = localStorage.getItem('ai');

    await this.el.querySelector('ion-slides').lockSwipes(true);
  }

  async turnOn() {
    await this.el.querySelector('ion-slides').lockSwipes(false);
    
    localStorage.setItem('ai', 'true');
    await this.el.querySelector('ion-slides').slideNext();

    setTimeout(async () => {
      await this.el.closest('ion-modal').dismiss();
    }, 1600)
  }

  async turnOff() {
    localStorage.removeItem('ai');
    await this.el.closest('ion-modal').dismiss();
  }

  async close() {
    (this.el.closest('ion-modal') as any).dismiss();
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button onClick={() => this.close()}>
              <ion-icon name="close"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <ion-slides>
          <ion-slide id="slideOne">
            <div>
              <h2>AI Services</h2>

              <p>
                Webboard's AI Services analyze your drawings
                and will make them searchable by tags and even give you
                the color scheme!
              </p>

              {this.aiToken ? <ion-button onClick={() => this.turnOff()} shape="round">Turn Off</ion-button> : <ion-button onClick={() => this.turnOn()} shape="round">Turn On</ion-button>}
            </div>
          </ion-slide>

          <ion-slide>
            <div>
              <img src="/assets/ai.svg"></img>
              <h2>Enjoy!</h2>
            </div>
          </ion-slide>
        </ion-slides>
      </ion-content>
    ];
  }
}
