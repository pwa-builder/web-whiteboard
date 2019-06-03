import { Component, Element, State, Prop, h } from '@stencil/core';

import { b64toBlob } from '../../helpers/utils';

import { get, set } from 'idb-keyval';

@Component({
  tag: 'app-images',
  styleUrl: 'app-images.css',
  shadow: true
})
export class AppImages {

  @State() images: any[];
  @State() showUpload: boolean = false;

  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: HTMLIonToastControllerElement | null = null;

  @Element() el: HTMLElement;

  componentDidLoad() {
    let provider = (window as any).mgt.Providers.globalProvider;
    console.log(provider);
    const account = provider._userAgentApplication.getAccount();
    console.log(account);

    if (account !== null) {
      this.showUpload = true;
    }

    (window as any).requestIdleCallback(async () => {
      const images: any[] = await get('images');
      console.log(images);

      if (images) {
        this.images = images;
      }
    }, {
        timeout: 2000
      })
  }

  choose(url: string, name: string) {
    (this.el.closest('ion-modal') as any).dismiss({ url, name });
  }

  async uploadToDrive(image, ev) {
    ev.preventDefault();

    const imageBlob = b64toBlob(image.url.replace("data:image/png;base64,", ""), 'image/jpg');

    console.log(imageBlob);

    let provider = (window as any).mgt.Providers.globalProvider;
    if (provider) {
      let graphClient = provider.graph.client;
      console.log(graphClient);

      try {
        const driveItem = await graphClient.api('/me/drive/root/children').middlewareOptions((window as any).mgt.prepScopes('user.read', 'files.readwrite')).post({
          "name": "webboard",
          "folder": {}
        });
        console.log(driveItem);

        const fileUpload = await graphClient.api(`/me/drive/items/${driveItem.id}:/${image.name}.jpg:/content`).middlewareOptions((window as any).mgt.prepScopes('user.read', 'files.readwrite')).put(imageBlob);
        console.log(fileUpload);

        const localImage = this.images.find((imageEntry) => { return imageEntry.name === image.name });
        console.log(localImage);
        localImage.id = fileUpload.id;

        await set('images', this.images);

        this.images = await get('images');

        const toast = await this.toastCtrl.create({
          message: "Board uploaded to OneDrive",
          duration: 1800
        });
        await toast.present();
      }
      catch (err) {
        console.error(err);

        const toast = await this.toastCtrl.create({
          message: "Upload failed, try again later",
          duration: 1800
        });
        await toast.present();
      }
    }
  }

  async share(id: number) {
    let provider = (window as any).mgt.Providers.globalProvider;
    let graphClient = provider.graph.client;

    try {
      const shareURL = await graphClient.api(`/me/drive/items/${id}/createLink`).post({
        "type": "view",
        "scope": "anonymous"
      });
      console.log(shareURL);

      if ((navigator as any).share) {
        await (navigator as any).share({
          title: 'webboard',
          text: 'You have been shared a board, click the link to view!',
          url: shareURL.link.webUrl,
        })
      }
      else {
        await navigator.clipboard.writeText(shareURL.link.webUrl);

        const toast = await this.toastCtrl.create({
          message: "Sharing URL saved to clipboard",
          duration: 1800
        });
        await toast.present();
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  async close() {
    (this.el.closest('ion-modal') as any).dismiss();
  }

  render() {
    return (
      <div id="mainDiv">
        <div id='buttonBlock'>
          <button onClick={() => this.close()}>
            <ion-icon name='close'></ion-icon>
          </button>
        </div>

        {this.images && this.images.length > 0 ?
          <div>
            <h2>Saved Boards</h2>
            <div id='imageList'>
              {
                this.images.map((image) => {
                  return (
                    <div id='imageBlock'>
                      <div id="titleBlock">
                        <h4 onClick={() => this.choose(image.url, image.name)}>{image.name}</h4>

                        {!image.id && this.showUpload ? <ion-button onClick={(event) => this.uploadToDrive(image, event)} icon-only fill="clear" size="small">
                          <ion-icon name="cloud-upload"></ion-icon>
                        </ion-button> :
                          <ion-button onClick={() => this.share(image.id)} icon-only fill="clear" size="small">
                            <ion-icon name="share"></ion-icon>
                          </ion-button>
                        }
                      </div>

                      <img onClick={() => this.choose(image.url, image.name)} src={image.url} alt={image.name}></img>
                    </div>
                  )
                })
              }
            </div> </div> : <h2>No Saved Boards</h2>}
      </div>
    );
  }
}
