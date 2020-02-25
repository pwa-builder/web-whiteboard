import '@ionic/core';

import { setupConfig } from '@ionic/core';

setupConfig({
  mode: 'md',
  animated: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? false : true
});