importScripts("workbox-v5.1.3/workbox-sw.js");

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "skipWaiting") {
    self.skipWaiting();
  }
});


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

self.workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);