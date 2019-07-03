import { Component, h, State, Prop } from '@stencil/core';


@Component({
  tag: 'drive-preview',
  styleUrl: 'drive-preview.css'
})
export class DrivePreview {

  @State() previewURL;

  @Prop() imageInfo: any;

  componentDidLoad() {
    setTimeout(async () => {
      let provider = (window as any).mgt.Providers.globalProvider;
      let graphClient = provider.graph.client;

      console.log(this.imageInfo);

      this.previewURL = await graphClient.api(`/me/drive/items/${this.imageInfo.id}/thumbnails`).get();
      console.log(this.previewURL);
    }, 300)
  }


  render() {
    return (
      <div>
        <ion-img src={this.previewURL.value[0].medium.url}></ion-img>
      </div>
    );
  }
}
