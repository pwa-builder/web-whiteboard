import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null,
      copy: [
        {
          src: "icons"
        },
        {
          src: "pwabuilder-sw.js"
        }
      ]
    }
  ],
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/app.css'
};
