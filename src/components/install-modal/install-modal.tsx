import { Component, Element, h, Prop } from '@stencil/core';


@Component({
  tag: 'install-modal',
  styles: `
    ion-slide {
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 4em;
      height: 530px !important;
    }

    ion-slide img {
      height: 8em !important;
      margin-top: -5em;
      margin-bottom: 2em;
    }

    ion-slide h1 {
      color: #1976DF;
      font-weight: bold;
    }

    #installBlock {
      width: 15em;
      display: flex;
      justify-content: space-around;
      margin-top: 1em;
    }

    #installImg {
      height: 12em !important;
    }
  `
})
export class InstallModal {

  @Prop() installEvent: any;

  @Element() el: HTMLElement;

  async install() {
    console.log(this.installEvent);
    if (this.installEvent) {
      this.installEvent.prompt();
      console.log(this.installEvent);

      this.installEvent.userChoice.then(function (choiceResult) {

        if (choiceResult.outcome === 'accepted') {
          console.log('Your PWA has been installed');
        } else {
          console.log('User chose to not install your PWA');
        }

        this.installEvent = null;

      });

      const choiceResult = await this.installEvent.userChoice;
      console.log(choiceResult);
      if (choiceResult.outcome === 'accepted') {
        console.log('Your PWA has been installed');
      } else {
        console.log('User chose to not install your PWA');
      }

      this.installEvent = null;
    }
  }

  cancel() {
    (this.el.closest('ion-modal') as any).dismiss();
  }

  render() {
    return (
      <div>
        <ion-toolbar>
          <ion-buttons slot="end">
          <ion-button onClick={() => this.cancel()} color="danger">Cancel</ion-button>
            <ion-button onClick={() => this.install()} color="primary">Install</ion-button>
          </ion-buttons>
        </ion-toolbar>

        <ion-slides pager={true}>
          <ion-slide>

            <img src="/assets/design.svg"></img>

            <h1>webboard</h1>

            <p>
              Enhance your work day and solve your cross platform whiteboarding needs with webboard! Draw text, shapes, attach images and more
              and share those whiteobards with anyone through OneDrive!
            </p>
          </ion-slide>

          <ion-slide id="featureSlide">
            <h1>Key Features</h1>

            <ion-list>
              <ion-item>
                <ion-icon slot="start" name="cloud-upload"></ion-icon>
                <ion-label>
                  <h3>Share Whiteboards with OneDrive</h3>
                </ion-label>
              </ion-item>

              <ion-item>
                <ion-icon slot="start" name="list-box"></ion-icon>
                <ion-label>
                  <h3>Integration with Microsoft To-Do</h3>
                </ion-label>
              </ion-item>

              <ion-item>
                <ion-icon slot="start" name="brush"></ion-icon>
                <ion-label>
                  <h3>Low Latency drawing</h3>
                </ion-label>
              </ion-item>

              <ion-item>
                <ion-icon slot="start" name="laptop"></ion-icon>
                <ion-label>
                  <h3>Works on all your devices</h3>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-slide>

          <ion-slide>

            <img id="installImg" src="/assets/install.svg"></img>

            <div id="installBlock">
              <ion-button onClick={() => this.install()} color="primary" shape="round">Install</ion-button>
              <ion-button onClick={() => this.cancel()} color="danger" shape="round">Cancel</ion-button>
            </div>
          </ion-slide>
        </ion-slides>
      </div>
    );
  }
}
