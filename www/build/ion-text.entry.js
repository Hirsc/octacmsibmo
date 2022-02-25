import { r as registerInstance, k as h, l as Host } from './index-366e529f.js';
import { g as getIonMode } from './ionic-global-21a4c1d7.js';
import { c as createColorClasses } from './theme-c336c9d9.js';

const textCss = ":host(.ion-color){color:var(--ion-color-base)}";

let Text = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    const mode = getIonMode(this);
    return (h(Host, { class: createColorClasses(this.color, {
        [mode]: true,
      }) }, h("slot", null)));
  }
};
Text.style = textCss;

export { Text as ion_text };
