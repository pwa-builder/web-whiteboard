import { Component, Element, h, Prop } from '@stencil/core';


@Component({
  tag: 'install-modal',
  styles: `

    #installModalBody {
      padding: 3em;
      margin-bottom: 4em;
      padding-top: 1em;
    }

    #installModalBody #screenShot {
      width: 28em;
      display: none;
    }

    #headerBlock {
      display: flex;
      align-items: center;
    }

    #headerBlock img {
      width: 8em;
      background: lightgrey;
      margin-right: 1em;
      border-radius: 14px;
      padding: 1.2em;
      height: 8em;
    }

    #installBlock {
      width: 15em;
      display: flex;
      justify-content: space-around;
      margin-top: 1em;
    }

    #installModalBody h1 {
      margin-top: 8px;
      font-weight: bold;
      font-size: 36px;
    }

    #installModalBody p {
      width: 26em;
    }

    #installModalBody h3 {
      font-size: 24px;
      font-weight: bold;
    }

    #installImg {
      height: 12em !important;
    }

    #keyFeaturesBlock {
      width: 18em;
      background-color: white;
      padding: 12px;
      /* box-shadow: 0 0 14px 6px #d6d5d5; */
      margin-top: 2em;
      margin-bottom: 2em;
      border-radius: 12px;
      border: solid rgba(173, 173, 173, 1) 2px;
    }

    #keyFeaturesBlock h4 {
      margin-top: 8px;
      font-weight: bold;
    }

    #installButtons {
      position: fixed;
      bottom: 16px;
      right: 20px;
    }

    #middleBlock {
      display: flex;
      justify-content: space-between;
    }

    #screenshotBlock img {
      width: 22em;
      margin-top: 32px;
    }

    #trueInstall {
      margin-right: 10px;
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
        <div id="installModalBody">

          <div id="headerBlock">
            <img src="/assets/icon/128.png"></img>

            <h1>webboard</h1>
          </div>

          <img id="screenShot" src="/assets/screen.png"></img>

          <div id="middleBlock">
            <div id="keyFeaturesBlock">
              <h4>Key Features</h4>

              <ion-list lines="none">
                <ion-item>
                  <ion-icon color="primary" slot="start" name="phone-portrait"></ion-icon>
                  <ion-label>
                    Cross platform
              </ion-label>
                </ion-item>

                <ion-item>
                  <ion-icon color="primary" slot="start" name="color-wand"></ion-icon>
                  <ion-label>
                    Intelligent
              </ion-label>
                </ion-item>

                <ion-item>
                  <ion-icon color="primary" slot="start" name="fastforward"></ion-icon>
                  <ion-label>
                    Fast
              </ion-label>
                </ion-item>
              </ion-list>
            </div>

            <div id="screenshotBlock">
              <img src="/assets/screen.png"></img>
            </div>
          </div>


          <h3>Description</h3>
          <p>
            Enhance your work day and solve your cross platform whiteboarding needs with webboard! Draw text, shapes, attach images and more
            and share those whiteobards with anyone through OneDrive!
            </p>

        </div>

        <div id="installButtons">
          <ion-button id="trueInstall" onClick={() => this.install()} color="primary" shape="round">Install</ion-button>
          <ion-button onClick={() => this.cancel()} color="danger" shape="round">Cancel</ion-button>
        </div>
      </div>
    );
  }
}
