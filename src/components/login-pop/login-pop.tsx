import { Component, State, h } from '@stencil/core';


@Component({
  tag: 'login-pop',
  styleUrl: 'login-pop.css'
})
export class LoginPop {

  @State() loaded: boolean = false;

  async componentDidLoad() {
    await import('../../mgt.js');
    this.loaded = true;
  }

  render() {
    return (
      <div>
        <div id="loginIntro">
          Sign in to save your boards to the cloud, share boards through OneDrive, export to OneNote and more!
        </div>

        <div id="msalBlock">
          {this.loaded ? <div>
            <mgt-msal-provider scopes="Notes.Create UserActivity.ReadWrite.CreatedByApp Device.Read Device.Command" client-id="ea8ee476-a5c2-4617-b376-a3fb40e46864"></mgt-msal-provider>
            <mgt-login></mgt-login>
          </div> : null}
        </div>
      </div>
    );
  }
}
