# Webboard

Please use our [main repository for any issues/bugs/features suggestion](https://github.com/pwa-builder/PWABuilder/issues/new/choose).

## Welcome!

This is the repository for Webboard, an open source, multi-platform, intelligent whiteboarding [Progressive Web Application](https://docs.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/)!

This PWA is built with the [PWABuilder pwa-starter](https://github.com/pwa-builder/pwa-starter). The PWABuilder pwa-starter is our opinionated, best practices, production tested starter that we use to build all of our PWAs, including [PWABuilder itself](https://blog.pwabuilder.com/posts/introducing-the-brand-new-pwa-builder/). The pwa-starter is a starter codebase, just like create-react-app or the Angular CLI can generate, that uses the PWABuilder team&#39;s preferred front-end tech stack:

- [**lit**](https://lit-element.polymer-project.org/): Our framework of choice. Lit gives us a way to write code that feels remarkably familiar to popular frameworks like React but that compiles down to browser native Web Components with a tiny runtime that provides things such as performant asynchronous rendering. Put plainly, Lit provides that great developer experience that we may be used too but without any sacrifice in either load-time performance or runtime performance.
- [Vaadin Router](https://vaadin.github.io/router/vaadin-router/demo/#vaadin-router-getting-started-demos): For routing, we use the Vaadin router. It is built with web components, has a tiny package size and all the features you expect from modern routers.
- [**Shadow DOM, CSS Variables, Shadow Parts**](https://lit-element.polymer-project.org/guide/styles#shadow-dom): Modern CSS is incredibly powerful, especially when combining the Shadow DOM, CSS variables and the Shadow Parts APIs. This provides a lot of the features we normally use a CSS pre-processor for, but without the extra complication that a CSS pre-processor adds to your build steps!
- [**Rollup**](https://www.rollupjs.org/guide/en/): Rollup is a &quot;bundler&quot; or build tool that will make working with NPM modules easy while also helping ensure our code is ready for production. It allows us to do things such as minify our code, run Workbox (another tool I will introduce next) and other build steps.
- [**Workbox**](https://developers.google.com/web/tools/workbox/): Workbox is a tool that makes working with [**Service Workers**](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) easy!
- [**TypeScript**](https://www.typescriptlang.org/): TypeScript gives us features such as auto complete in our editors that helps make the development process easier, along with being perfect for working in a team because you can provide types for your APIs, making your code almost self-documenting.

You can find more details about it [here](https://blog.pwabuilder.com/posts/building-pwas-with-web-components!/).

## Screenshots

![example image](https://raw.githubusercontent.com/jgw96/web-whiteboard/main/example_img.png)

## Get it

- The Web: https://webboard.app

- Microsoft Store: https://www.microsoft.com/store/productId/9P53Q9BF3MV6

- Google Play: https://play.google.com/store/apps/details?id=org.webboard.app&hl=en_US&gl=US

## Main Features

- Integrated File System: Webboard uses the new [File System Access API](https://web.dev/file-system-access/) to work with the file system. This enables Webboard to have the same edit+save experience as any other native app, such as Paint.
- Low Latency Inking: Webboard uses the new [Ink API](https://blogs.windows.com/msedgedev/2021/08/18/enhancing-inking-on-the-web/#:~:text=To%20improve%20this%2C%20behind%20the%20scenes%20of%20the,ink%20strokes%20outside%20of%20Microsoft%20Edge%E2%80%99s%20application%20loop.) available in Edge to enable native-like, low latency inking.
- Pen, touch and mouse support: Webboard makes use of the [Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) API to support pen, touch and mouse input with the same code!
- Share API: Webboard makes use of the [Web Share API](https://web.dev/web-share/) to enable sharing of boards using the native Windows share UI.
