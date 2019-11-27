import { Component, Element, State, h } from '@stencil/core';


@Component({
  tag: 'login-pop',
  styleUrl: 'login-pop.css',
  shadow: false
})
export class LoginPop {

  @State() loaded: boolean = false;
  @State() loggedIn: boolean = false;

  @Element() el: HTMLElement;

  async componentDidLoad() {
    await import('../../mgt.js');
    this.loaded = true;

    this.el.querySelector('mgt-login').addEventListener('loginCompleted', () => {
      this.loggedIn = true;
    });
  }

  render() {
    return (
      <div>
        <div id="loginIntro">
          Sign in to save your boards to the cloud, share boards through OneDrive, export to OneNote and more!
        </div>

        <div id="msalBlock">
          {this.loaded && this.loggedIn === false ? <div>
            <mgt-msal-provider scopes="Notes.Create UserActivity.ReadWrite.CreatedByApp Device.Read Device.Command" client-id="ea8ee476-a5c2-4617-b376-a3fb40e46864"></mgt-msal-provider>
            <mgt-login></mgt-login>
          </div> : null}

          {this.loaded && this.loggedIn === true ? <div id="signedInDiv">
            <p>Signed In</p>
          </div> : null}
        </div>
      </div>
    );
  }
}
