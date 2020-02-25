import { Component, h, State } from '@stencil/core';
import { loadingController } from '@ionic/core';

import { getSavedImages } from '../../services/api';


@Component({
  tag: 'foldable-images',
  styleUrl: 'foldable-images.css'
})
export class FoldableImages {

  @State() images: any[];

  async componentDidLoad() {
    const loading = await loadingController.create({
      message: "Loading images from the cloud...",
      showBackdrop: navigator.userAgent.includes('iPad') === false && window.matchMedia("(min-width: 1450px)").matches ? false : true
    });
    await loading.present();

    try {
      const data = await getSavedImages();
      console.log(data);

      if (data) {
        this.images = data.images;
      }

      await loading.dismiss();
    }
    catch (err) {
      console.error(err);
      await loading.dismiss();
    }
  }

  choose(url: string, name: string) {
    console.log(url, name);
  }

  render() {
    return [
      <ion-header no-border>
        <ion-toolbar no-border>
          <ion-title>Saved Boards</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content>

        {
          this.images && this.images.length > 0 ?
            <div id="foldImageList">
              {this.images.map((image) => {
                return (
                  <ion-card>
                    <ion-card-header>
                      {image.desc ? <ion-card-subtitle>{image.desc}</ion-card-subtitle> : null}
                      <ion-card-title>{image.name}</ion-card-title>
                    </ion-card-header>

                    <img loading="lazy" onClick={() => this.choose(image.url, image.name)} src={image.url} alt={image.name}></img>

                    <ion-card-content onClick={() => this.choose(image.url, image.name)}>
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
              })}
            </div> : null
        }
      </ion-content>
    ];
  }
}
