importScripts("workbox-v4.3.1/workbox-sw.js");

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "skipWaiting") {
    self.skipWaiting();
  }
});

const bgSyncPlugin = new workbox.backgroundSync.Plugin('postImagesQueue', {
  maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
});

workbox.routing.registerRoute(
  'https://webboard-server.azurewebsites.net/images',
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin]
  }),
  'POST'
);

workbox.routing.registerRoute(
  new RegExp('/build/svg/'),
  new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp('/assets/'),
  new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp('/mgt.js'),
  new workbox.strategies.StaleWhileRevalidate()
);

self.workbox.precaching.precacheAndRoute([]);