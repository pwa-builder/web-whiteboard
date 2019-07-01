// import { Providers } from '@microsoft/mgt';

export async function getWindowsDevices(token: string) {
  const headers = new Headers();
  const bearer = "Bearer " + token;
  headers.append("Authorization", bearer);
  const options = {
    method: "GET",
    headers: headers
  };
  const graphEndpoint = "https://graph.microsoft.com/beta/me/devices";

  const response = await fetch(graphEndpoint, options);
  const data = await response.json();

  return data;
}

export async function sendCommand(token: string, id: string, url: string) {
  const headers = new Headers();
  const bearer = "Bearer " + token;
  headers.append("Authorization", bearer);
  headers.append("Content-Type", "application/json");
  const options = {
    method: "POST",
    body: JSON.stringify({ "type": "LaunchUri", "payload": { "uri": url } }),
    headers: headers
  };
  const graphEndpoint = `https://graph.microsoft.com/beta/me/devices/${id}/commands`;

  try {
    const response = await fetch(graphEndpoint, options);
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(`There was an error making the request: ${err}`)
  }
}

export async function test(id: string, activityObject: any) {
  const provider = (window as any).mgt.Providers.globalProvider;
  let graphClient = provider.graph.client;
  console.log(graphClient);

  await graphClient.api(`/me/activities/${id}`).post(JSON.stringify(activityObject));
}

export async function createActivity(token: string, activityObject: any, id: string) {

  if (token) {
    const headers = new Headers();
    const bearer = "Bearer " + token;
    headers.append("Authorization", bearer);
    headers.append("Content-Type", "application/json");
    const options = {
      method: "PUT",
      body: JSON.stringify(activityObject),
      headers: headers
    };
    const graphEndpoint = `https://graph.microsoft.com/v1.0/me/activities/${id}`;

    try {
      const response = await fetch(graphEndpoint, options);
      const data = await response.json();

      return data;
    } catch (err) {
      console.error(`There was an error making the request: ${err}`)
    }
  } else {
    console.error(`
      An auth token must be passed in. To learn more about how to get an auth token
      for the Microsoft Graph API, check out https://github.com/AzureAD/microsoft-authentication-library-for-js.
    `);
  }
}