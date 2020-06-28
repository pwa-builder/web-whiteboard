// import { Providers } from '@microsoft/mgt';

import { getToken } from "./auth";
import { get } from 'idb-keyval';

export async function getUserImage() {

  const token = await getToken();

  const headers = new Headers();
  const bearer = "Bearer " + token;
  headers.append("Authorization", bearer);
  const options = {
    method: "GET",
    headers: headers
  };
  const graphEndpoint = "https://graph.microsoft.com/beta/me/photo/$value";

  const response = await fetch(graphEndpoint, options);
  const data = await response.json();

  return data;

  /*const provider = (window as any).mgt.Providers.globalProvider;
  let graphClient = provider.graph.client;
  console.log(graphClient);

  const data = await graphClient.api(`/me/devices`).version('beta').middlewareOptions((window as any).mgt.prepScopes('user.read', 'Device.Read')).get();

  if (data) {
    console.log(data);
    return data.value;
  }*/
}

export async function getPeople() {
  const token = await get('graphToken');
  // const token = await getToken();

  const headers = new Headers();
  const bearer = "Bearer " + token;
  headers.append("Authorization", bearer);
  const options = {
    method: "GET",
    headers: headers
  };
  const graphEndpoint = "https://graph.microsoft.com/v1.0/me/people";

  const response = await fetch(graphEndpoint, options);
  const data = await response.json();
  console.log(data);

  return data.value;
}

export async function sendRoomInvite(chosenPeople: any[]) {
  if (!chosenPeople || chosenPeople.length < 0) {
    return;
  }

  let emailString = 'mailto:';

  chosenPeople.forEach((person) => {
    if (person.scoredEmailAddresses) {
      emailString = emailString + person.scoredEmailAddresses[0].address + ';'
    }
    else {
      emailString = emailString + person.email[0] + ';'
    }
  })

  window.location.href = `${emailString}?subject=Invitation To Collaborate &body=Collaborate on a board with me here ${location.href}.`;
}

export async function sendCommand(id: string, url: string) {

  const provider = (window as any).mgt.Providers.globalProvider;
  const authProvider = provider.graph.client.config.middleware.authenticationProvider;

  const token = await authProvider.getAccessToken();

  const headers = new Headers();
  const bearer = "Bearer " + token;
  headers.append("Authorization", bearer);
  headers.append("Content-Type", "application/json");
  const options = {
    method: "POST",
    body: JSON.stringify({ "type": "LaunchUri", "payload": { "uri": new URL(url) } }),
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

export async function createActivity(id: string, activityObject: any) {
  const provider = (window as any).mgt.Providers.globalProvider;
  let graphClient = provider.graph.client;


  await graphClient.api(`/me/activities/boards?${id}`).put(activityObject);
}

export async function getRecentActivities() {
  const provider = (window as any).mgt.Providers.globalProvider;
  let graphClient = provider.graph.client;


  const activities = await graphClient.api(`/me/activities?$top=3`).get();
  console.log(activities);

  return activities.value;
}

export async function exportToOneNote(imageUrl: string, name: string) {
  if (imageUrl) {
    /*const graphEndpoint = "https://graph.microsoft.com/v1.0/me/onenote/pages";

    const response = await fetch(graphEndpoint, options);
    const data = await response.json();*/

    const provider = (window as any).mgt.Providers.globalProvider;
    let graphClient = provider.graph.client;
    console.log(graphClient)
    const data = await graphClient.api(`/me/onenote/pages`).header("Content-Type", "application/xhtml+xml").post(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${name}</title>
        <meta name="created" content="2015-07-22T09:00:00-08:00" />
      </head>
      <body>
        <a href="${imageUrl}">Onedrive link to Image</a>
      </body>
    </html>
    `);

    console.log(data);

    return data;
  }
}