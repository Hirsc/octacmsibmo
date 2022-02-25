import { Component, h, Prop, State } from "@stencil/core"

import { Food } from "../../entities/food"
import { unixDateToDate } from "../../utils/unix-to-date"
import { Adder } from "./service/adder"
import { AllGetter } from "./service/all-getter"
import { Getter } from "./service/getter"
import { Remover } from "./service/remover"


export interface FoodService extends Adder<Food>, Getter<Food>, AllGetter<Food>, Remover { }

@Component(
    {
        styleUrl: "index.css",
        tag: "food-list",
    },
)
export class FoodList {
    @State() public foods: Food[] = []
    @State() public error: Error
    @Prop() public service: FoodService

    private title = "Food List"
    private dueDate = "Due Date"

    public componentDidLoad() {
        const router = document.querySelector("ion-router")

        router.addEventListener("ionRouteDidChange", async () => {
            const [foods, error] = await this.service.getAll()

            if (foods) {
                this.foods = [...foods]
            }

            if (error) {
                this.error = error
            }
        })
    }

    public render() {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-title>{this.title}</ion-title>
                </ion-toolbar>
            </ion-header>,

            <ion-content>
                <ion-list lines="none">

                    {this.foods.map((food) => (
                        <ion-item-sliding>
                            <ion-item class="holding">
                                <ion-label>
                                    <p>
                                        <strong>
                                            {food.name}
                                        </strong>
                                    </p>
                                    <p class="amount">
                                        <strong>{this.dueDate}:</strong> {unixDateToDate(food.dueDate)}
                                    </p>
                                    <p class="value">{food.ean}</p>
                                </ion-label>
                            </ion-item>

                            <ion-item-options>
                                <ion-item-option color="danger" onClick={this.delete(food)}>
                                    <ion-icon slot="icon-only" name="trash"></ion-icon>
                                </ion-item-option>
                            </ion-item-options>
                        </ion-item-sliding>
                    ))}

                </ion-list>

                <ion-fab vertical="bottom" horizontal="start" slot="fixed">
                    <ion-fab-button href="add">
                        <ion-icon name="add"></ion-icon>
                    </ion-fab-button>
                </ion-fab>
            </ion-content>,
        ]
    }

    private delete(food: Food) {
        const { id } = food
        return (_: Event) => {
            this.service.remove(id).then((result) => {
                const [success] = result

                if (success) {
                    const index = this.foods.findIndex((f: Food) => f.id === id)
                    this.foods = [
                        ...this.foods.slice(0, index),
                        ...this.foods.slice(index + 1, this.foods.length),
                    ]
                }
            })
        }
    }
}


