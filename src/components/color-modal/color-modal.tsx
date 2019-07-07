import { Component, Element, Prop, h } from '@stencil/core';

declare var ImageCapture: any;

@Component({
  tag: 'color-modal',
  styleUrl: 'color-modal.css'
})
export class ColorModal {

  @Element() el: HTMLElement;

  @Prop({ connect: 'ion-loading-controller' }) loadingCtrl: HTMLIonLoadingControllerElement | null = null;

  stream: MediaStream;
  capture;

  async componentDidLoad() {
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'environment'
      }
    });

    const video = this.el.querySelector('video');
    video.srcObject = this.stream;

    this.capture = new ImageCapture(this.stream.getVideoTracks()[0]);
  }

  async grabColor() {
    const loading = await this.loadingCtrl.create({
      message: "Analyzing..."
    });
    await loading.present();

    const blobPhoto = await this.capture.takePhoto();

    let reader = new FileReader();
    reader.readAsArrayBuffer(blobPhoto);
    reader.onloadend = async () => {
      const aiToken = localStorage.getItem('ai');
      if (aiToken) {
        const response = await fetch(`https://westus2.api.cognitive.microsoft.com/vision/v2.0/analyze?visualFeatures=Color`, {
          headers: {
            "Ocp-Apim-Subscription-Key": "d930861b5bba49e5939b843f9c4e5846",
            "Content-Type": "application/octet-stream"
          },
          method: "POST",
          body: reader.result
        });
        const data = await response.json();

        console.log(data.color.accentColor);

        await loading.dismiss();
        await (this.el.closest('ion-modal') as any).dismiss(data.color.accentColor);
      }
    }

  }

  async close() {
    await (this.el.closest('ion-modal') as any).dismiss();
  }

  render() {
    return (
      <ion-content color="dark">
        <ion-toolbar color="dark">
          <ion-buttons slot="start">
            <ion-button onClick={() => this.close()}>
              <ion-icon name="close"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>

        <video id="colorVideo" autoplay></video>

        <div id="colorButtonBlock">
          <ion-button onClick={() => this.grabColor()} shape="round">Grab Color</ion-button>
        </div>
      </ion-content>
    );
  }
}
