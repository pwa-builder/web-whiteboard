const url = "https://webboard-server.azurewebsites.net";

export async function saveImagesS(images: any) {
  console.log(images);

  const provider = (window as any).mgt.Providers.globalProvider;
  console.log(provider);
  let graphClient = provider.graph.client;
  console.log(graphClient);

  const user = provider.graph.client.config.middleware.authenticationProvider._userAgentApplication.account;

  if (images && user) {
    
    console.log('making a request');
    const response = await fetch(`${url}/images`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        images: images,
        user: user
      })
    });

    const data = await response.json();
    console.log(data);
    return data;
  }
}

export async function getSavedImages() {
  const provider = (window as any).mgt.Providers.globalProvider;
  const user = provider.graph.client.config.middleware.authenticationProvider._userAgentApplication.account;

  if (user) {
    const response = await fetch(`${url}/getImages`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user
      })
    });

    const data = await response.json();
    console.log(data);
    return data;
  }
}