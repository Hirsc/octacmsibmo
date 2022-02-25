import { r as registerInstance, k as h, l as Host } from './index-366e529f.js';
import { g as getIonMode } from './ionic-global-21a4c1d7.js';

const rowCss = ":host{display:flex;flex-wrap:wrap}";

let Row = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, { class: getIonMode(this) }, h("slot", null)));
  }
};
Row.style = rowCss;

export { Row as ion_row };
