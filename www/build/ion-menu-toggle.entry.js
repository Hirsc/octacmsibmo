import { r as registerInstance, k as h, l as Host } from './index-366e529f.js';
import { g as getIonMode } from './ionic-global-21a4c1d7.js';
import { m as menuController } from './index-a6af9612.js';
import { u as updateVisibility } from './menu-toggle-util-817138cc.js';
import './hardware-back-button-b6ccf74a.js';
import './helpers-d19c06c3.js';
import './animation-4bd307c8.js';

const menuToggleCss = ":host(.menu-toggle-hidden){display:none}";

let MenuToggle = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.visible = false;
    /**
     * Automatically hides the content when the corresponding menu is not active.
     *
     * By default, it's `true`. Change it to `false` in order to
     * keep `ion-menu-toggle` always visible regardless the state of the menu.
     */
    this.autoHide = true;
    this.onClick = () => {
      return menuController.toggle(this.menu);
    };
  }
  connectedCallback() {
    this.visibilityChanged();
  }
  async visibilityChanged() {
    this.visible = await updateVisibility(this.menu);
  }
  render() {
    const mode = getIonMode(this);
    const hidden = this.autoHide && !this.visible;
    return (h(Host, { onClick: this.onClick, "aria-hidden": hidden ? 'true' : null, class: {
        [mode]: true,
        'menu-toggle-hidden': hidden,
      } }, h("slot", null)));
  }
};
MenuToggle.style = menuToggleCss;

export { MenuToggle as ion_menu_toggle };
