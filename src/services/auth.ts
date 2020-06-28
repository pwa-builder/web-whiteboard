import * as msal from "@azure/msal-browser";
import { set, get } from "idb-keyval";

const msalConfig = {
  auth: {
    clientId: 'ea8ee476-a5c2-4617-b376-a3fb40e46864',
    redirectUri: 'http://localhost:3333',
    scopes: ["User.Read"]
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
    await msalInstance.loginRedirect(null);
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
  const token = await get('graphToken');
  return token;
}