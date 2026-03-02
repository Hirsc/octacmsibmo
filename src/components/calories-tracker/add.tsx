import { Component, h, Prop, State } from "@stencil/core"

import type { Food } from "../../entities/food"
import { toastError } from "../toasts/error"
import { getErrorMessage, hasValidationErrors, validateFoodInput } from "../../utils/food-validation"

import type { AddFoodToADay } from "./service/interface"

export type FoodService = AddFoodToADay

@Component(
    {
        styleUrl: "index.css",
        tag: "add-food",
    }
)
export class AddFood {
    @State() public error: Error
    @State() public formControls: Food = {
        name: null,
        code: null,
        id: null,
        protein: null,
        fat: null,
        carbonhydrate: null,
        energy: null,
        amount: null,
    }
    @Prop() public service: FoodService
    @Prop() public day: string

    private title = "Add Food"
    private name = "Name"
    private ean = "EAN"

    public render(): Element[] {
        return [
            <ion-header translucent={true}>
                <ion-toolbar color="primary">
                    <ion-buttons slot="start">
                        <ion-back-button defaultHref="/"></ion-back-button>
                    </ion-buttons>
                    <ion-title>{this.title}</ion-title>
                    <ion-buttons slot="end">
                        <theme-toggle />
                    </ion-buttons>
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
                            <ion-label position="stacked">Energy (kcal) <ion-text color="danger">*</ion-text></ion-label>
                            <ion-input
                                required
                                type="number"
                                min="0"
                                max="9000"
                                onInput={this.changeFormValue("energy")}
                            />
                        </ion-item>

                        <ion-item>
                            <ion-label position="stacked">Protein (g) <ion-text color="danger">*</ion-text></ion-label>
                            <ion-input
                                required
                                type="number"
                                min="0"
                                max="100"
                                onInput={this.changeFormValue("protein")}
                            />
                        </ion-item>

                        <ion-item>
                            <ion-label position="stacked">Fat (g) <ion-text color="danger">*</ion-text></ion-label>
                            <ion-input
                                required
                                type="number"
                                min="0"
                                max="100"
                                onInput={this.changeFormValue("fat")}
                            />
                        </ion-item>

                        <ion-item>
                            <ion-label position="stacked">Carbohydrates (g) <ion-text color="danger">*</ion-text></ion-label>
                            <ion-input
                                required
                                type="number"
                                min="0"
                                max="100"
                                onInput={this.changeFormValue("carbonhydrate")}
                            />
                        </ion-item>

                        <ion-item>
                            <ion-label position="stacked">Amount (g) <ion-text color="danger">*</ion-text></ion-label>
                            <ion-input
                                required
                                type="number"
                                min="1"
                                max="10000"
                                onInput={this.changeFormValue("amount")}
                            />
                        </ion-item>

                        <ion-item>
                            <ion-label position="stacked">{this.ean}</ion-label>
                            <ion-input
                                type="number"
                                onInput={this.changeFormValue("code")}
                            />
                        </ion-item>

                    </ion-list>

                    <div class="ion-padding">
                        <ion-button
                            expand="block"
                            type="submit"
                            class="ion-no-margin"
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

        const validationErrors = validateFoodInput(this.formControls)

        if (hasValidationErrors(validationErrors)) {
            toastError(getErrorMessage(validationErrors))
            return
        }

        this.service.addFoodToADay(this.formControls, this.day)
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


