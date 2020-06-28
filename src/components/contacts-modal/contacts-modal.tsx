import { Component, h, State, Prop } from '@stencil/core';

import { getPeople, sendRoomInvite } from "../../services/graph";
import { modalController } from '@ionic/core';

@Component({
  tag: 'contacts-modal',
  styleUrl: 'contacts-modal.css',
})
export class ContactsModal {

  @State() people: any;

  @State() chosen: any[] = [];

  @Prop({ connect: 'ion-router' }) nav: HTMLIonRouterElement;

  async componentDidLoad() {
    const people = await getPeople();
    console.log(people);
    this.people = people;
  }

  addPerson(person) {
    this.chosen.push(person);

    this.chosen = [...this.chosen];
    console.log(this.chosen);
  }

  removePerson(personToFind) {
    const index = this.chosen.findIndex((person) => {
      return person.id === personToFind.id
    });
    
    this.chosen.splice(index, 1);

    this.chosen = [...this.chosen];
  }

  async send() {
    await modalController.dismiss();
    await sendRoomInvite(this.chosen);
  }

  async share() {
    if (navigator.share) {
      await navigator.share({
        title: 'Webboard',
        text: "Join me on this board",
        url: location.href,
      })
    }
  }

  async close() {
    await modalController.dismiss();
  }

  render() {
    return [
      <ion-header no-border>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button onClick={() => this.close()}>
              <ion-icon name="close"></ion-icon>
            </ion-button>
          </ion-buttons>

          <ion-title color="primary">Invite</ion-title>

          <ion-buttons slot="end">
            <ion-button color="primary" onClick={() => this.share()} fill="clear">
              <ion-icon name="share-outline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">

        <ion-list id="contactsList" lines="none">
          {
            this.people ?
              this.people.map((person) => {
                return (
                  <ion-item>
                    <ion-label>
                      {person.displayName}
                    </ion-label>

                    {this.chosen.includes(person) === false ? <ion-buttons slot="end">
                      <ion-button shape="round" fill="outline" color="primary" onClick={() => this.addPerson(person)}>
                        Add

                        <ion-icon slot="end" name="add"></ion-icon>
                      </ion-button>
                    </ion-buttons> :

                      <ion-buttons slot="end">
                        <ion-button shape="round" fill="outline" color="danger" onClick={() => this.removePerson(person)}>
                          Remove

                        <ion-icon slot="end" name="close"></ion-icon>
                        </ion-button>
                      </ion-buttons>
                    }
                  </ion-item>
                )
              })
              : null
          }
        </ion-list>

        {this.chosen.length > 0 ?
          <div id="sendInviteBlock">
            <ion-button fill="solid" shape="round" onClick={() => this.send()}>Send Invite</ion-button>
          </div> : null
        }
      </ion-content>
    ]
  }
}
