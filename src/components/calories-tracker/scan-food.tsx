import type { InputChangeEventDetail } from "@ionic/core"
import { Component, h, Prop, State, Watch } from "@stencil/core"

import type { Food } from "../../entities/food"
import type { FoodInformation } from "../../entities/food-information"
import { NotFound } from "../../entities/not-found"
import type { Getter } from "../../open-food-facts/getter"
import { toastError } from "../toasts/error"
import { getErrorMessage, hasValidationErrors, validateFoodInput } from "../../utils/food-validation"

import type { AddFoodToADay } from "./service/interface"

export type FoodService = AddFoodToADay
export type FoodInformationService = Getter<FoodInformation>

@Component(
    {
        styleUrl: "index.css",
        tag: "scan-food",
    },
)
export class ScanFood {
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
    @Prop() public foodService: FoodService
    @Prop() public foodInformationService: FoodInformationService
    @Prop() public dayMonthYear: string

    private title = "Add Food"

    constructor() {
        this.changecodeCode = this.changecodeCode.bind(this)
        this.changeName = this.changeName.bind(this)
    }

    public componentDidLoad(): void {
        this.formControls = {
            ...this.formControls,
            code: "5449000000996",
        }
    }

    public render(): Element[] {
        return [
            <ion-header translucent={true}>
                <ion-toolbar color="primary">
                    <ion-buttons slot="start">
                        <ion-back-button
                            defaultHref="/"
                        />
                    </ion-buttons>
                    <ion-title>{this.title}</ion-title>
                </ion-toolbar>
            </ion-header>,
            (
                this.formControls.code === null &&
                <ion-content color="dark">
                    <barcode-reader
                        onCodeChange={this.changecodeCode}
                    />
                </ion-content>
            ),
            (
                this.formControls.code !== null &&
                <ion-content>
                    <form onSubmit={(e) => this.handleSubmit(e)} novalidate>
                        <ion-list lines="full" class="ion-no-margin ion-no-padding">
                            <ion-item>
                                <ion-label position="stacked">Food Name <ion-text color="danger">*</ion-text></ion-label>
                                <ion-input
                                    required
                                    type="text"
                                    value={this.formControls.name}
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
                                    value={this.formControls.energy}
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
                                    value={this.formControls.protein}
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
                                    value={this.formControls.fat}
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
                                    value={this.formControls.carbonhydrate}
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
                                    value={this.formControls.amount}
                                    onInput={this.changeFormValue("amount")}
                                />
                            </ion-item>

                        </ion-list>

                        <div class="ion-padding">
                            <ion-button
                                expand="block"
                                type="submit"
                                class="ion-no-margin"
                            >
                                Save Food
                            </ion-button>
                        </div>
                    </form>
                </ion-content>
            ),
            <ion-alert-controller></ion-alert-controller>,
        ]
    }

    @Watch("formControls")
    private async watchHandler(newValue: Food, oldValue: Food) {
        if (oldValue.code !== newValue.code) {
            const [foodInformation, error] = await this.foodInformationService.get(newValue.code)

            if (error) {
                toastOpenFoodFactsError(error)
                this.formControls = {
                    ...this.formControls,
                    code: null,
                }
            }

            if (foodInformation) {
                this.formControls = {
                    ...this.formControls,
                    name: foodInformation.name,
                    protein: foodInformation.protein,
                    fat: foodInformation.fat,
                    carbonhydrate: foodInformation.carbonhydrate,
                    energy: foodInformation.energy,
                    amount: foodInformation.energy ? 100 : null, // Default to 100g if we have nutritional data
                }
            }

        }
    }

    private saveFood() {
        const validationErrors = validateFoodInput(this.formControls)

        if (hasValidationErrors(validationErrors)) {
            toastError(getErrorMessage(validationErrors))
            return
        }

        this.foodService.addFoodToADay(this.formControls, this.dayMonthYear)
        window.history.back()
    }

    private changecodeCode(newCode: string) {
        this.formControls = {
            ...this.formControls,
            code: newCode,
        }
    }

    private changeName(event: CustomEvent<InputChangeEventDetail>) {
        this.formControls = {
            ...this.formControls,
            name: event.detail.value,
        }
    }

    private changeFormValue(path: string) {
        return (e: any) => {
            this.formControls = {
                ...this.formControls,
                [path]: e.target.value,
            }
        }
    }

    private handleSubmit(e: Event) {
        e.preventDefault()
        this.saveFood()
    }
}

function toastOpenFoodFactsError(error: Error) {
    if (error instanceof NotFound) {
        toastError("Product not found. Try again")
        return
    }

    toastError("Something unknown went wrong. Try again")
    return

}
