import { Component, h, State } from '@stencil/core';

import { login, getAccount, logout } from '../../services/auth';


@Component({
  tag: 'app-login',
  styleUrl: 'app-login.css'
})
export class AppLogin {

  @State() userAccount = null;

  async componentDidLoad() {
    setTimeout(async () => {
      this.userAccount = await getAccount();
      console.log(this.userAccount);
    }, 1200)
  }

  async login() {
    try {
      await login();
    }
    catch(err) {
      console.error(err);
    }
  }

  async logout() {
    try {
      await logout();
    }
    catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      this.userAccount ? <ion-button shape="round" fill="outline" color="danger" onClick={() => this.logout()}>{this.userAccount.username}</ion-button> : <ion-button shape="round" fill="outline" onClick={() => this.login()}>Login</ion-button>
    );
  }
}
