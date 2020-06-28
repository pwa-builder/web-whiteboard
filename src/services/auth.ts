import * as msal from "@azure/msal-browser";
import { set } from "idb-keyval";

const msalConfig = {
  auth: {
    clientId: 'ea8ee476-a5c2-4617-b376-a3fb40e46864',
    redirectUri: 'https://webboard.app',
    scopes: ["User.Read", "People.Read"]
  }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

msalInstance.handleRedirectPromise().then(async (tokenResponse) => {
  // Check if the tokenResponse is null
  // If the tokenResponse !== null, then you are coming back from a successful authentication redirect. 
  // If the tokenResponse === null, you are not coming back from an auth redirect.

  if (tokenResponse !== null) {
    console.log(tokenResponse);

    await set('graphToken', tokenResponse.accessToken);
  }
}).catch((error) => {
  // handle error, either in the library or coming back from the server
  console.error(error);
});

export function getAccount() {
  const myAccounts = msalInstance.getAllAccounts();

  if (myAccounts && myAccounts[0]) {
    return myAccounts[0];
  }
}

export async function login() {
  try {
    await msalInstance.loginRedirect({
      scopes: ["User.Read", "People.Read"],
      redirectUri: 'https://webboard.app'
    });
  } catch (err) {
    // handle error
    return err;
  }
}

export async function logout() {
  try {
    await msalInstance.logout();
  }
  catch (err) {
    console.error(err);
  }
}

export async function getToken() {
  return new Promise(async (resolve) => {
    const username = await getAccount()?.username;

    const currentAccount = msalInstance.getAccountByUsername(username);
    console.log('current', currentAccount);
    const silentRequest = {
      scopes: ["User.Read", "People.Read"],
      account: currentAccount,
      redirectUri: "https://webboard.app",
      forceRefresh: false
    };

    const request = {
      scopes: ["User.Read", "People.Read"],
      loginHint: currentAccount.username, // For v1 endpoints, use upn from idToken claims
      redirectUri: "https://webboard.app"
    };

    msalInstance.acquireTokenSilent(silentRequest).then(tokenResponse => {
      // Do something with the tokenResponse
      console.log(tokenResponse);
      resolve(tokenResponse);
    }).catch(async error => {
      console.error(error);
      const tokenResponse = await msalInstance.acquireTokenRedirect(request)
      resolve(tokenResponse);
    });
  });
}