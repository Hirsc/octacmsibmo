import { r as registerInstance, k as h } from './index-366e529f.js';
import { N as NotFound } from './not-found-e6e5331d.js';
import './index-cc127d03.js';
import { t as toastController } from './overlays-638dc8f0.js';
import './utils-a2ac7383.js';
import './animation-4bd307c8.js';
import './helpers-d19c06c3.js';
import './ios.transition-dbe4d468.js';
import './index-3b173f79.js';
import './md.transition-9d223fc1.js';
import './cubic-bezier-a7ad9c8e.js';
import './index-c31991b6.js';
import './ionic-global-21a4c1d7.js';
import './index-435af8e6.js';
import './index-a6af9612.js';
import './hardware-back-button-b6ccf74a.js';

function getDateAsUnixTimestamp(date) {
  return Math.round((date).getTime() / 1000);
}

function getPossibleDueYears() {
  const currentYear = new Date().getFullYear();
  const futureYears = [];
  for (const i of [...Array(10).keys()]) {
    futureYears.unshift(currentYear + i + 1);
  }
  return [
    ...futureYears,
    currentYear,
    currentYear - 1,
    currentYear - 2,
    currentYear - 3,
  ];
}

async function toastError(message) {
  const options = {
    color: "danger",
    duration: 5000,
    message,
  };
  const toast = await toastController.create(options);
  await toast.present();
}

const indexCss = ".root{top:50vh}";

let ScanFood = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.formControls = {
      dueDate: null,
      ean: null,
      id: null,
      name: null,
    };
    this.title = "Add Food";
    this.possibleDueYears = getPossibleDueYears();
    this.dateFormat = "DD/MM/YYYY";
    this.changeEANCode = this.changeEANCode.bind(this);
    this.changeDueDate = this.changeDueDate.bind(this);
    this.changeName = this.changeName.bind(this);
  }
  componentDidLoad() {
    this.formControls = Object.assign(Object.assign({}, this.formControls), { ean: "400195416508" });
  }
  render() {
    return [
      h("ion-header", { translucent: true }, h("ion-toolbar", { color: "primary" }, h("ion-buttons", { slot: "start" }, h("ion-back-button", { defaultHref: "/" })), h("ion-title", null, this.title))),
      (this.formControls.ean === null &&
        h("ion-content", { color: "dark" }, h("barcode-reader", { onCodeChange: this.changeEANCode }))),
      (this.formControls.dueDate === null && this.formControls.ean !== null &&
        h("ion-content", null, h("ion-item", { class: "root ion-text-center" }, h("ion-label", { position: "stacked", mode: "ios" }, this.dateFormat), h("ion-datetime", { mode: "ios", "display-format": this.dateFormat, yearValues: this.possibleDueYears, onIonChange: this.changeDueDate })), this.error &&
          h("ion-item", { class: "root ion-text-center" }, h("ion-label", { position: "stacked", mode: "ios" }, "Food Name"), h("ion-input", { type: "text", onIonChange: this.changeName })))),
      h("ion-alert-controller", null),
    ];
  }
  async watchHandler(newValue, oldValue) {
    if (oldValue.ean !== newValue.ean) {
      const [foodInformation, error] = await this.foodInformationService.get(newValue.ean);
      if (error) {
        toastOFFError(error);
        this.error = error;
        this.formControls = Object.assign(Object.assign({}, this.formControls), { ean: null });
      }
      if (foodInformation) {
        this.formControls = Object.assign(Object.assign({}, this.formControls), { name: foodInformation.name });
      }
    }
    if (newValue.ean !== null
      && newValue.name !== null
      && newValue.dueDate !== null) {
      this.saveFood();
    }
  }
  saveFood() {
    this.foodService.add(this.formControls);
    window.history.back();
  }
  changeEANCode(newCode) {
    this.formControls = Object.assign(Object.assign({}, this.formControls), { ean: newCode });
  }
  changeName(event) {
    this.formControls = Object.assign(Object.assign({}, this.formControls), { name: event.detail.value });
  }
  changeDueDate(event) {
    const selectedDate = new Date(event.detail.value);
    const unixDueDate = getDateAsUnixTimestamp(selectedDate);
    this.formControls = Object.assign(Object.assign({}, this.formControls), { dueDate: unixDueDate });
  }
  static get watchers() { return {
    "formControls": ["watchHandler"]
  }; }
};
function toastOFFError(error) {
  if (error instanceof NotFound) {
    toastError("Product not found. Try again");
    return;
  }
  toastError("Something unknown went wrong. Try again");
  return;
}
ScanFood.style = indexCss;

export { ScanFood as scan_food };
