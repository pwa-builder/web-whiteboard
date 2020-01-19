import { Component, h, State, Prop } from '@stencil/core';

import { getPeople, sendRoomInvite } from "../../services/graph";
import { alertController, modalController } from '@ionic/core';

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

  async send() {
    const alert = await alertController.create({
      header: "Send Invite",
      message: "Before you send an invite you must choose a room name. Once you have chosen a room name hit send when you are ready to connect.",
      inputs: [
        {
          type: 'text',
          placeholder: "Room Name",
          name: "roomName"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Send Invite",
          handler: async (data) => {
            console.log(data);

            await modalController.dismiss();
            await sendRoomInvite(this.chosen, data.roomName);

            const navCtrl: HTMLIonRouterElement = await (this.nav as any).componentOnReady();
            await navCtrl.push(`/live/${data.roomName}`);
          }
        }
      ]
    });

    await alert.present();
  }

  render() {
    return [
      <ion-header no-border>
        <ion-toolbar>
          <ion-title>Choose Teammates</ion-title>
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
                      <mgt-person show-name show-email personDetails={person}></mgt-person>
                    </ion-label>

                    {this.chosen.includes(person) === false ? <ion-buttons slot="end">
                      <ion-button shape="round" fill="outline" color="primary" onClick={() => this.addPerson(person)}>
                        Add

                        <ion-icon slot="end" name="add"></ion-icon>
                      </ion-button>
                    </ion-buttons> : 
                    
                    <ion-buttons slot="end">
                      <ion-button shape="round" fill="outline" color="danger">
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
