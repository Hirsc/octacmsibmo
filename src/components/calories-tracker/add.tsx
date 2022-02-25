import { Component, h, Prop, State } from "@stencil/core"

import { Food } from "../../entities/food"
import { Adder } from "./service/adder"

export interface FoodService extends Adder<Food> { }

@Component(
    {
        styleUrl: "index.css",
        tag: "add-food",
    },
)
export class AddFood {
    @State() public error: Error
    @State() public formControls: Food = {
        dueDate: null,
        ean: null,
        id: null,
        name: null,
    }
    @Prop() public service: FoodService

    private title = "Add Food"
    private name = "Name"
    private dueDate = "Mindeshaltbarkeitsdatum"
    private ean = "EAN"

    public render() {


        return [
            <ion-header translucent={true}>
                <ion-toolbar color="primary">
                    <ion-buttons slot="start">
                        <ion-back-button defaultHref="/"></ion-back-button>
                    </ion-buttons>
                    <ion-title>{this.title}</ion-title>
                </ion-toolbar>
            </ion-header>,

            <ion-content>
                <form onSubmit={(e) => this.handleSubmit(e)} novalidate>
                    <ion-list lines="full" class="ion-no-margin ion-no-padding">
                        <ion-item>
                            <ion-label position="stacked">{this.name} <ion-text color="danger">*</ion-text></ion-label>
                            <ion-input
                                required
                                type="text"
                                onInput={this.changeFormValue("name")}
                            />
                        </ion-item>

                        <ion-item>
                            <ion-label position="stacked">
                                {this.dueDate} <ion-text color="danger">*</ion-text>
                            </ion-label>
                            <ion-input
                                required
                                type="number"
                                onInput={this.changeFormValue("dueDate")}
                            />
                        </ion-item>

                        <ion-item>
                            <ion-label position="stacked">{this.ean} <ion-text color="danger">*</ion-text></ion-label>
                            <ion-input
                                required
                                type="number"
                                onInput={this.changeFormValue("ean")}
                            />
                        </ion-item>

                    </ion-list>

                    <div class="ion-padding">
                        <ion-button
                            expand="block"
                            type="submit"
                            class="ion-no-margin"
                            href="/"
                            routerDirection="back"
                        >
                            {this.title}
                        </ion-button>
                    </div>
                </form>
            </ion-content>,
            <ion-alert-controller></ion-alert-controller>,

        ]
    }


    private handleSubmit(e: Event) {
        e.preventDefault()
        this.service.add(this.formControls)
        window.history.back()
    }

    private changeFormValue(path: string) {
        return (e: any) => {
            this.formControls = {
                ...this.formControls,
                [path]: e.target.value,
            }
        }
    }
}


