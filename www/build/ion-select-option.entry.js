import { r as registerInstance, k as h, l as Host, m as getElement } from './index-366e529f.js';
import { g as getIonMode } from './ionic-global-21a4c1d7.js';

const selectOptionCss = ":host{display:none}";

let SelectOption = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.inputId = `ion-selopt-${selectOptionIds++}`;
    /**
     * If `true`, the user cannot interact with the select option. This property does not apply when `interface="action-sheet"` as `ion-action-sheet` does not allow for disabled buttons.
     */
    this.disabled = false;
  }
  render() {
    return (h(Host, { role: "option", id: this.inputId, class: getIonMode(this) }));
  }
  get el() { return getElement(this); }
};
let selectOptionIds = 0;
SelectOption.style = selectOptionCss;

export { SelectOption as ion_select_option };
