import { r as registerInstance, k as h } from './index-366e529f.js';

const indexCss = ".root{top:50vh}";

let AddFood = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.formControls = {
      dueDate: null,
      ean: null,
      id: null,
      name: null,
    };
    this.title = "Add Food";
    this.name = "Name";
    this.dueDate = "Mindeshaltbarkeitsdatum";
    this.ean = "EAN";
  }
  render() {
    return [
      h("ion-header", { translucent: true }, h("ion-toolbar", { color: "primary" }, h("ion-buttons", { slot: "start" }, h("ion-back-button", { defaultHref: "/" })), h("ion-title", null, this.title))),
      h("ion-content", null, h("form", { onSubmit: (e) => this.handleSubmit(e), novalidate: true }, h("ion-list", { lines: "full", class: "ion-no-margin ion-no-padding" }, h("ion-item", null, h("ion-label", { position: "stacked" }, this.name, " ", h("ion-text", { color: "danger" }, "*")), h("ion-input", { required: true, type: "text", onInput: this.changeFormValue("name") })), h("ion-item", null, h("ion-label", { position: "stacked" }, this.dueDate, " ", h("ion-text", { color: "danger" }, "*")), h("ion-input", { required: true, type: "number", onInput: this.changeFormValue("dueDate") })), h("ion-item", null, h("ion-label", { position: "stacked" }, this.ean, " ", h("ion-text", { color: "danger" }, "*")), h("ion-input", { required: true, type: "number", onInput: this.changeFormValue("ean") }))), h("div", { class: "ion-padding" }, h("ion-button", { expand: "block", type: "submit", class: "ion-no-margin", href: "/", routerDirection: "back" }, this.title)))),
      h("ion-alert-controller", null),
    ];
  }
  handleSubmit(e) {
    e.preventDefault();
    this.service.add(this.formControls);
    window.history.back();
  }
  changeFormValue(path) {
    return (e) => {
      this.formControls = Object.assign(Object.assign({}, this.formControls), { [path]: e.target.value });
    };
  }
};
AddFood.style = indexCss;

export { AddFood as add_food };
