import { r as registerInstance, k as h, l as Host, m as getElement } from './index-366e529f.js';
import { d as arrowDown, f as caretBackSharp } from './index-784d835c.js';
import { g as getIonMode, c as config, a as isPlatform } from './ionic-global-21a4c1d7.js';
import { s as sanitizeDOMString } from './index-435af8e6.js';
import { S as SPINNERS } from './spinner-configs-f609a655.js';

let RefresherContent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentWillLoad() {
    if (this.pullingIcon === undefined) {
      const mode = getIonMode(this);
      const overflowRefresher = this.el.style.webkitOverflowScrolling !== undefined ? 'lines' : arrowDown;
      this.pullingIcon = config.get('refreshingIcon', mode === 'ios' && isPlatform('mobile') ? config.get('spinner', overflowRefresher) : 'circular');
    }
    if (this.refreshingSpinner === undefined) {
      const mode = getIonMode(this);
      this.refreshingSpinner = config.get('refreshingSpinner', config.get('spinner', mode === 'ios' ? 'lines' : 'circular'));
    }
  }
  render() {
    const pullingIcon = this.pullingIcon;
    const hasSpinner = pullingIcon != null && SPINNERS[pullingIcon] !== undefined;
    const mode = getIonMode(this);
    return (h(Host, { class: mode }, h("div", { class: "refresher-pulling" }, this.pullingIcon && hasSpinner &&
      h("div", { class: "refresher-pulling-icon" }, h("div", { class: "spinner-arrow-container" }, h("ion-spinner", { name: this.pullingIcon, paused: true }), mode === 'md' && this.pullingIcon === 'circular' &&
        h("div", { class: "arrow-container" }, h("ion-icon", { icon: caretBackSharp })))), this.pullingIcon && !hasSpinner &&
      h("div", { class: "refresher-pulling-icon" }, h("ion-icon", { icon: this.pullingIcon, lazy: false })), this.pullingText &&
      h("div", { class: "refresher-pulling-text", innerHTML: sanitizeDOMString(this.pullingText) })), h("div", { class: "refresher-refreshing" }, this.refreshingSpinner &&
      h("div", { class: "refresher-refreshing-icon" }, h("ion-spinner", { name: this.refreshingSpinner })), this.refreshingText &&
      h("div", { class: "refresher-refreshing-text", innerHTML: sanitizeDOMString(this.refreshingText) }))));
  }
  get el() { return getElement(this); }
};

export { RefresherContent as ion_refresher_content };
