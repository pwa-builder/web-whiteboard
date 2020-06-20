import { Component, Event, EventEmitter, h, State } from '@stencil/core';


@Component({
  tag: 'more-tools',
  styleUrl: 'more-tools.css'
})
export class MoreTools {

  @State() inkValue: boolean;
  @State() aiValue: boolean;

  @Event() doInkToShape: EventEmitter;
  @Event() doAi: EventEmitter;
  @Event() exportEV: EventEmitter;
  @Event() share: EventEmitter;

  componentWillLoad() {
    this.inkValue = JSON.parse(sessionStorage.getItem('inkToShape'));
    this.aiValue = JSON.parse(localStorage.getItem('ai'));
  }

  async handleShape(ev) {
    if (ev.detail.checked === true) {
      this.doInkToShape.emit(true);

      sessionStorage.setItem('inkToShape', 'true');
    }
    else {
      this.doInkToShape.emit(false);

      sessionStorage.setItem('inkToShape', 'false');
    }
  }

  async handleAI(ev) {
    if (ev.detail.checked === true) {
      this.doAi.emit(true);

      localStorage.setItem('ai', 'true');
    }
    else {
      this.doAi.emit(false);

      localStorage.setItem('ai', 'false');
    }
  }

  handleShare() {
    this.share.emit();
  }

  render() {
    return (
      <ion-content id="moreToolsContent">
        <ion-item lines="none">
          <ion-label>Ink To Shape</ion-label>
          <ion-toggle checked={this.inkValue} onIonChange={(ev) => this.handleShape(ev)} slot="end"></ion-toggle>
        </ion-item>

        <ion-item lines="none">
          <ion-label>AI Features</ion-label>
          <ion-toggle checked={this.aiValue} onIonChange={(ev) => this.handleAI(ev)} slot="end"></ion-toggle>
        </ion-item>

        <div id="toolsActions">
          <ion-buttons>

            <ion-button color="warning" shape="round" fill="outline" onClick={() => this.handleShare()}>
              <ion-icon slot="start" name="share-outline"></ion-icon>
              Share
            </ion-button>
          </ion-buttons>
        </div>
      </ion-content>
    )
  }
}
