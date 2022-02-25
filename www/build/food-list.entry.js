import { r as registerInstance, k as h } from './index-366e529f.js';
import { u as unixDateToDate } from './unix-to-date-9f14514e.js';

const indexCss = ".root{top:50vh}";

let FoodList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.foods = [];
    this.title = "Food List";
    this.dueDate = "Due Date";
  }
  componentDidLoad() {
    const router = document.querySelector("ion-router");
    router.addEventListener("ionRouteDidChange", async () => {
      const [foods, error] = await this.service.getAll();
      if (foods) {
        this.foods = [...foods];
      }
      if (error) {
        this.error = error;
      }
    });
  }
  render() {
    return [
      h("ion-header", null, h("ion-toolbar", { color: "primary" }, h("ion-title", null, this.title))),
      h("ion-content", null, h("ion-list", { lines: "none" }, this.foods.map((food) => (h("ion-item-sliding", null, h("ion-item", { class: "holding" }, h("ion-label", null, h("p", null, h("strong", null, food.name)), h("p", { class: "amount" }, h("strong", null, this.dueDate, ":"), " ", unixDateToDate(food.dueDate)), h("p", { class: "value" }, food.ean))), h("ion-item-options", null, h("ion-item-option", { color: "danger", onClick: this.delete(food) }, h("ion-icon", { slot: "icon-only", name: "trash" }))))))), h("ion-fab", { vertical: "bottom", horizontal: "start", slot: "fixed" }, h("ion-fab-button", { href: "add" }, h("ion-icon", { name: "add" })))),
    ];
  }
  delete(food) {
    const { id } = food;
    return (_) => {
      this.service.remove(id).then((result) => {
        const [success] = result;
        if (success) {
          const index = this.foods.findIndex((f) => f.id === id);
          this.foods = [
            ...this.foods.slice(0, index),
            ...this.foods.slice(index + 1, this.foods.length),
          ];
        }
      });
    };
  }
};
FoodList.style = indexCss;

export { FoodList as food_list };
