import { Component, Element, State, Prop, h } from '@stencil/core';

import { b64toBlob } from '../../helpers/utils';
import { test } from '../../services/graph';

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
  @Prop({ connect: 'ion-action-sheet-controller' }) actionSheetCtrl: HTMLIonActionSheetControllerElement | null = null;

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

    const sheet = await this.actionSheetCtrl.create({
      header: "Share",
      buttons: [
        {
          text: "Upload to OneDrive",
          icon: 'cloud',
          handler: async (): Promise<any> => {
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
        },
        {
          text: "Share",
          icon: "share",
          handler: async (): Promise<any> => {
            console.log('hello');

            const imageBlob = b64toBlob(image.url.replace("data:image/png;base64,", ""), 'image/jpg');
            const file = new File([imageBlob], "default.jpg");

            if ((navigator as any).canShare && (navigator as any).canShare(file)) {
              (navigator as any).share({
                files: [file],
                title: 'Whiteboard',
                text: 'Check out this whiteboard from WebBoard https://webboard-app.web.app',
              })
                .then(() => console.log('Share was successful.'))
                .catch((error) => console.log('Sharing failed', error));
            } else {
              console.log('Your system doesn\'t support sharing files.');
            }
          }
        }
      ]
    });

    await sheet.present();
  }

  async share(id: number, image) {
    /*let provider = (window as any).mgt.Providers.globalProvider;
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
    }*/

    const sheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: "Share",
          icon: "share",
          handler: async (): Promise<any> => {
            let provider = (window as any).mgt.Providers.globalProvider;
            let graphClient = provider.graph.client;

            try {
              const shareURL = await graphClient.api(`/me/drive/items/${id}/createLink`).post({
                "type": "view",
                "scope": "anonymous"
              });
              console.log(shareURL);

              const activity = {
                "appActivityId": `${shareURL.link.webUrl}`,
                "activitySourceHost": "https://webboard-app.web.app",
                "userTimezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
                "appDisplayName": "Musically",
                "activationUrl": `${shareURL.link.webUrl}`,
                "contentUrl": `${shareURL.link.webUrl}`,
                "fallbackUrl": "https://webboard-app.web.app",
                "contentInfo": {
                  "@context": "https://schema.org",
                  "@type": "Image",
                  "title": "webboard"
                },
                "visualElements": {
                  "attribution": {
                    "iconUrl": "https://webboard-app.web.app/assets/icon/512.png",
                    "alternateText": "Webboard",
                    "addImageQuery": false,
                  },
                  "description": `${shareURL.link.webUrl} was created in Webboard`,
                  "backgroundColor": "#ff0000",
                  "displayText": `New drawing created in Webboard`,
                  "content": {
                    "$schema": "https://adaptivecards.io/schemas/adaptive-card.json",
                    "type": "AdaptiveCard",
                    "body":
                      [{
                        "type": "TextBlock",
                        "text": "Webboard"
                      }]
                  }
                },
                "historyItems": [
                  {
                    "userTimezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
                    "startedDateTime": new Date().toISOString(),
                    "lastActiveDateTime": new Date().toISOString(),
                  }
                ]
              }

              await test(shareURL.link.webUrl, activity);

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
        },
        {
          text: "Download",
          icon: "download",
          handler: () => {
            console.log('download');

            const anchor = document.createElement('a');
            anchor.href = image.url;
            anchor.download = 'default.jpg';
            anchor.click();
            window.URL.revokeObjectURL(image.url);
          }
        }
      ]
    });
    await sheet.present();
  }

  async close() {
    (this.el.closest('ion-modal') as any).dismiss();
  }

  async searchImages(e) {
    let searchImages = [];

    if (e.target.value) {
      this.images.forEach((image) => {
        if (image.tags) {
          image.tags.filter((tag) => {
            console.log(tag);
            if (tag.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) {
              searchImages.push(image);
            }
          })
        }
        // return (item.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1);
      });
  
      if (searchImages.length > 0) {
        this.images = searchImages;
      }
      else {
        this.images = await get('images');
      }
    }
    else {
      this.images = await get('images');
    }

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

            <ion-searchbar id="imageBar" onIonChange={(event) => this.searchImages(event)} debounce={250} animated placeholder="search"></ion-searchbar>

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
                          <ion-button onClick={() => this.share(image.id, image)} icon-only fill="clear" size="small">
                            <ion-icon name="share"></ion-icon>
                          </ion-button>
                        }
                      </div>

                      <img loading="lazy" onClick={() => this.choose(image.url, image.name)} src={image.url} alt={image.name}></img>

                      <div id="bottomSection">

                        <div id="imageTags">
                          {image.tags ? <p id="tagsP">Tags: </p> : null}
                          {
                            image.tags ? image.tags.map((tag) => {
                              if (tag.confidence > 0.8) {
                                return (
                                  <div class="imageTag">
                                    {tag.name}
                                  </div>
                                )
                              }
                            }) : null
                          }
                        </div>

                        <div id="imageColors">
                          { image.color ? <p id="colorsP">Colors: </p> : null}

                          {
                            image.color && image.color.accentColor ?
                              <div style={{ background: `#${image.color.accentColor}` }} class="colors">
                                {`#${image.color.accentColor}`}
                              </div>
                              : null
                          }

                          {
                            image.color ? image.color.dominantColors.map((color) => {
                              if (color !== 'White') {
                                return (
                                  <div style={{ background: color }} class="colors">
                                    {color}
                                  </div>
                                )
                              }
                            }) : null
                          }
                        </div>

                      </div>
                    </div>
                  )
                })
              }
            </div> </div> : <h2>No Saved Boards</h2>}
      </div>
    );
  }
}
