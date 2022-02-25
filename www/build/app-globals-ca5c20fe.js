import { i as initialize } from './ionic-global-21a4c1d7.js';
import { s as setupConfig } from './index-cc127d03.js';

const appGlobalScript = () => {
  setupConfig({
    mode: "ios",
  });
};

const globalScripts = () => {
  appGlobalScript();
  initialize();
};

export { globalScripts as g };
