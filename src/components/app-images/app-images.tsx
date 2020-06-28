import { Component, Element, State, h } from '@stencil/core';
import { loadingController, toastController as toastCtrl, alertController } from '@ionic/core';

// import { b64toBlob } from '../../helpers/utils';
// import { getFileHandle } from '../../helpers/files-api';
import { cleanImages, search } from '../../images.worker';

import { get, set } from 'idb-keyval';
// import * as comlink from 'https://unpkg.com/comlink@4.0.1';

// import { getSavedImages, saveImagesS } from '../../services/api';
// import { getWindowsDevices, sendCommand } from '../../services/graph';

@Component({
  tag: 'app-images',
  styleUrl: 'app-images.css',
  shadow: false
})
export class AppImages {

  @State() images: any[] | null = null;
  @State() cloudImages: any;
  @State() showUpload: boolean = false;
  @State() imageSection: string = 'local';
  @State() renderedCards: any[];

  @Element() el: HTMLElement;

  async componentWillLoad() {
    (window as any).requestIdleCallback(async () => {

      const images: any[] = await get('images');

      if (images) {
        setTimeout(async () => {
          this.images = await cleanImages(images);
        }, 250);
      }
    }, {
      timeout: 2000
    })
  };

  /*cleanImages(images: any[]) {
    let cleanImages = [];

    images.forEach((image) => {
      if (image.url) {
        cleanImages.push(image);
      }
    });

    if (cleanImages.length > 0) {
      return cleanImages;
    }
  }*/

  async refreshImages() {
    const loading = await loadingController.create({
      message: "Loading images from the cloud...",
      showBackdrop: navigator.userAgent.includes('iPad') === false && window.matchMedia("(min-width: 1450px)").matches ? false : true
    });
    await loading.present();

    console.log('trying to get images from the cloud');
    try {
      const module = await import('../../services/api');
      const data = await module.getSavedImages();
      console.log(data);

      this.images = data.images

      await loading.dismiss();

      await set('images', this.images);
    }
    catch (err) {
      console.error(err);
      await loading.dismiss();
    }
  }

  async choose(url: string, name: string, handle) {
    (this.el.closest('ion-modal') as any).dismiss({ url, name, handle });
  }

  async delete(event, imagePicked) {
    event.preventDefault();

    let imageToDelete = null;

    this.images.forEach((image) => {
      if (image.name === imagePicked.name) {
        imageToDelete = image;
      }
    });

    if (imageToDelete !== null) {
      const indexOfImage = this.images.indexOf(imageToDelete);

      if (indexOfImage > -1) {
        this.images.splice(indexOfImage, 1);

        const toast = await toastCtrl.create({
          message: "deleting image",
          duration: 1300
        });
        await toast.present();

        this.images = [...this.images];

        await set('images', this.images);
        const module = await import('../../services/api');
        await module.saveImagesS(this.images);
      }
    }

    event.preventDefault();
  }

  async openToSide(name: string, ev) {
    ev.preventDefault();

    const provider = (window as any).mgt.Providers.globalProvider;
    const user = provider.graph.client.config.middleware.authenticationProvider._userAgentApplication.account;
    console.log(user);

    window.open(`${location.href}boards/${name}/${user.name}/board`, "_blank");

    ev.preventDefault();
  }

  async chooseCloudItem(id: number, name: string) {
    let provider = (window as any).mgt.Providers.globalProvider;
    let graphClient = provider.graph.client;

    try {
      const image = await graphClient.api(`/me/drive/items/${id}`)
        .get();
      console.log(image["@microsoft.graph.downloadUrl"]);

      const response = await fetch(`${image["@microsoft.graph.downloadUrl"]}`);
      console.log(response);
      const data = await response.blob();

      console.log(data, name);

      // this.choose(URL.createObjectURL(data), name);
    }
    catch (err) {
      console.log(err, err.message);
    }
  }

  async downloadImage(id: number) {
    let provider = (window as any).mgt.Providers.globalProvider;
    let graphClient = provider.graph.client;

    try {
      const image = await graphClient.api(`/me/drive/items/${id}`)
        .get();
      console.log(image["@microsoft.graph.downloadUrl"]);
      window.location.href = image["@microsoft.graph.downloadUrl"];
    }
    catch (err) {
      console.log(err, err.message);
    }
  }

  async uploadToDrive(image, ev) {
    ev.preventDefault();

    const sheet = await alertController.create({
      header: "Share",
      subHeader: "sharing",
      buttons: [
        {
          text: "Upload to OneDrive",
          handler: async (): Promise<any> => {
            const module = await import('../../helpers/utils');
            const imageBlob = module.b64toBlob(image.url.replace("data:image/png;base64,", ""), 'image/jpg');

            let provider = (window as any).mgt.Providers.globalProvider;
            if (provider) {
              let graphClient = provider.graph.client;
              console.log(graphClient);

              const loading = await loadingController.create({
                message: "Uploading...",
                showBackdrop: navigator.userAgent.includes('iPad') === false && window.matchMedia("(min-width: 1450px)").matches ? false : true
              });
              await loading.present();

              await sheet.dismiss();

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

                /*let remoteImages = [];

                this.images.forEach((image) => {
                  if (image.id) {
                    remoteImages.push({ id: image.id, name: image.name });
                  }
                });

                saveImages(remoteImages);*/

                const module = await import('../../services/api');
                await module.saveImagesS(this.images);

                await loading.dismiss();

                const toast = await toastCtrl.create({
                  message: "Board uploaded to OneDrive",
                  duration: 1800
                });
                await toast.present();
              }
              catch (err) {
                console.error(err);

                const toast = await toastCtrl.create({
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
          handler: async (): Promise<any> => {
            console.log('hello');

            const module = await import('../../helpers/utils');
            const imageBlob = module.b64toBlob(image.url.replace("data:image/png;base64,", ""), 'image/jpg');
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

  async share(id: number, image, event) {
    event.preventDefault();

    (window as any).requestIdleCallback(async () => {
      let provider = (window as any).mgt.Providers.globalProvider;
      let graphClient = provider.graph.client;

      if ((navigator as any).canShare) {
        const module = await import('../../helpers/utils');
        const imageBlob = module.b64toBlob(image.url.replace("data:image/png;base64,", ""), 'image/jpg');
        const file = new File([imageBlob], "default.jpg");

        if ((navigator as any).canShare(file)) {
          (navigator as any).share({
            files: [file],
            title: 'Whiteboard',
            text: 'Check out this board from Webboard https://webboard-app.web.app',
          })
            .then(() => console.log('Share was successful.'))
            .catch((error) => console.log('Sharing failed', error));
        }

      } else {
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

            const toast = await toastCtrl.create({
              message: "Sharing URL saved to clipboard",
              duration: 1800
            });
            await toast.present();
          }
        }
        catch (err) {
          const toast = await toastCtrl.create({
            message: "You must be logged in to share",
            duration: 1200
          });
          await toast.present();
        }
      }

    }, {
      timeout: 1200
    })
  }

  async close() {
    (this.el.closest('ion-modal') as any).dismiss();
  }

  async searchImages(e) {
    /*let searchImages = [];

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

        if (image.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) {
          searchImages.push(image);
        }
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
    }*/
    const searchEvent = e.target.value;
    this.images = await (search(searchEvent, this.images) as any);
  }

  segmentChange(event) {
    console.log(event);

    this.imageSection = event.target.value;
  }

  render() {
    return [
      <ion-header no-border id="imagesHeaderEl">
        <ion-toolbar>

          <ion-title color="primary">
            Saved Boards
            </ion-title>

          <ion-buttons slot="end">
            <ion-button onClick={() => this.refreshImages()}>
              <ion-icon name="refresh-circle-outline"></ion-icon>
            </ion-button>

            <ion-button onClick={() => this.close()}>
              <ion-icon name='close'></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content>


        <div>

          <ion-searchbar id="imageBar" onIonChange={(event) => this.searchImages(event)} debounce={250} animated placeholder="search"></ion-searchbar>

          {/*<ion-toolbar id="segmentToolbar">
            <ion-segment mode="ios" value="local" onIonChange={(event) => this.segmentChange(event)}>
              <ion-segment-button mode="ios" value="local">
                <ion-label>All</ion-label>
              </ion-segment-button>
              <ion-segment-button mode="ios" value="cloud">
                <ion-label>Cloud</ion-label>
              </ion-segment-button>
            </ion-segment>
    </ion-toolbar>*/}

          {this.images ?

            <div id='imageList'>
              {
                this.imageSection === 'local' ?

                  this.images.map((image) => {
                    return (
                      <ion-card>
                        <ion-card-header>

                          <div id="buttonBar">
                            <div>
                              {image.desc ? <ion-card-subtitle>{image.desc}</ion-card-subtitle> : null}
                              <ion-card-title>{image.name}</ion-card-title>
                            </div>

                            <ion-buttons>
                              <ion-button icon-only fill="clear" onClick={($event) => this.delete($event, image)}>
                                <ion-icon color="danger" name="trash-outline"></ion-icon>
                              </ion-button>

                              {/*<ion-button icon-only fill="clear" onClick={(event) => this.openToSide(image.name, event)}>
                                <ion-icon name="swap"></ion-icon>
                    </ion-button>*/}
                            </ion-buttons>
                          </div>
                        </ion-card-header>

                        <img loading="lazy" onClick={() => this.choose(image.url, image.name, image.handle)} src={image.url} alt={image.name}></img>

                        <ion-card-content onClick={() => this.choose(image.url, image.name, image.handle)}>
                          <div id="imageTags">
                            {image.tags && image.tags.length > 0 ? <p id="tagsP">Tags: </p> : null}
                            {
                              image.tags && image.tags.length > 0 ? image.tags.map((tag) => {
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
                            {image.color ? <p id="colorsP">Colors: </p> : null}

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
                        </ion-card-content>
                      </ion-card>
                    )
                  })
                  :
                  this.cloudImages.map((image) => {
                    return (
                      <ion-item lines="none">
                        <ion-thumbnail slot="start">
                          <drive-preview imageInfo={image}></drive-preview>
                        </ion-thumbnail>
                        <ion-label onClick={() => this.chooseCloudItem(image.id, image.name)}>
                          <ion-text>
                            <h3>{image.name}</h3>
                          </ion-text>
                        </ion-label>

                        <ion-buttons slot="end">
                          <ion-button onClick={(event) => this.share(image.id, image, event)} fill="clear" slot="end">
                            <ion-icon name="share-outline"></ion-icon>
                          </ion-button>

                          <ion-button onClick={() => this.downloadImage(image.id)} fill="clear" slot="end">
                            <ion-icon name="download-outline"></ion-icon>
                          </ion-button>
                        </ion-buttons>
                      </ion-item>
                    )
                  })
              }
            </div>
            : <div id="noImages">
               <h3>No Boards Saved</h3>
            </div>}
        </div>
      </ion-content>



    ];
  }
}
