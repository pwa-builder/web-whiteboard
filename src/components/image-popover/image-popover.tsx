import { Component, Element, h, State } from '@stencil/core';


@Component({
  tag: 'image-popover',
  styles: `
    .imageItem {
      margin-bottom: 16px;
      display: flex;
    }

    .imageItem img {
      border-radius: 12px;
      width: 100%;
      height: 100%;
    }

    #topToolbar {
      position: sticky;
      top: 0;
    }

    #imagesList {
      display: grid;
      grid-template-columns: auto auto;
    }

    #fileButton {
      padding: 8px;
    }
  `
})
export class ImagePopover {

  @State() images: any[];
  @State() loading: boolean = false;

  @Element() el: HTMLElement;

  subscriptionKey = '6521f549397c405ca141c7aedd842ce3';
  host = 'api.cognitive.microsoft.com';
  path = '/bing/v7.0/images/search';

  async componentDidLoad() {
    this.loading = true;

    const response = await fetch(`https://${this.host}${this.path}?q=halo`, {
      headers: {
        'Ocp-Apim-Subscription-Key': this.subscriptionKey,
      }
    });
    const data = await response.json();

    console.log(data);
    this.images = data.value;

    this.loading = false;
  }

  async searchImages(ev) {
     this.loading = true;

    if (ev.detail.value.length > 0) {
      const response = await fetch(`https://${this.host}${this.path}?q=${ev.detail.value}`, {
        headers: {
          'Ocp-Apim-Subscription-Key': this.subscriptionKey,
        }
      });
      const data = await response.json();

      console.log(data);
      this.images = data.value;
      
      this.loading = false;
    }
    else {
      this.loading = false;
    }
  }

  async addImage(imageURL: string, width: number, height: number) {
    const imageCanvas = document.querySelector('app-canvas');
    console.log(imageCanvas);
    await (this.el.closest('ion-modal') as HTMLIonModalElement).dismiss();

    await imageCanvas.addImageToCanvas(imageURL, width, height);
    
  }

  handleFileInput(ev: Event) {
    console.log((ev.target as any).files);

    if (FileReader && (ev.target as any).files && (ev.target as any).files.length) {
      let fr = new FileReader();
      fr.onload = async () => {
        const imageCanvas = document.querySelector('app-canvas');
        await (this.el.closest('ion-modal') as HTMLIonModalElement).dismiss();

        await imageCanvas.addImageToCanvas((fr.result as string), (ev.target as any).files[0].width, (ev.target as any).files[0].height);
      }
      fr.readAsDataURL((ev.target as any).files[0]);
    }
  }

  async close() {
    await (this.el.closest('ion-modal') as HTMLIonModalElement).dismiss();
  }

  render() {
    return (
      <ion-content>
        <ion-toolbar id="topToolbar">
          <ion-buttons slot="start">
            <ion-button onClick={() => this.close()}>
              <ion-icon name="close"></ion-icon>
            </ion-button>
          </ion-buttons>

          <ion-searchbar onIonChange={(event) => this.searchImages(event)} debounce={250} animated></ion-searchbar>

          <ion-buttons id="fileButton" slot='end'>
            <input onChange={(ev) => this.handleFileInput(ev)} accept="image/png, image/jpeg" type="file" name="file" id="file" class="inputfile" />
            <label id="fileLabel" htmlFor="file">
              <ion-icon name="folder-outline"></ion-icon>
            </label>
          </ion-buttons>
        </ion-toolbar>

        {this.loading ? <ion-progress-bar type="indeterminate"></ion-progress-bar> : null}

        <ion-list id="imagesList" lines="none">
          {
            this.images ? this.images.map((image) => {
              return (
                <ion-item onClick={() => this.addImage(image.thumbnailUrl, image.thumbnail.width, image.thumbnail.height)} class="imageItem">
                  <img src={image.contentUrl}></img>
                </ion-item>
              )
            }) : null
          }
        </ion-list>
      </ion-content>
    );
  }
}
