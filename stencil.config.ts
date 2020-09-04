import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  outputTargets: [
    {
      type: 'www',
      serviceWorker: {
        swSrc: 'src/sw.js'
      },
      baseUrl: "https://webboard-app.web.app",
      copy: [
        {
          src: "icons"
        },
        {
          src: ".well-known"
        },
        {
          src: "mgt.js"
        }
      ],
    }
  ],
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/app.css'
};
