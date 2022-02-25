import { DatetimeChangeEventDetail, InputChangeEventDetail } from "@ionic/core"
import { Component, h, Prop, State, Watch } from "@stencil/core"

import { Food } from "../../entities/food"
import { FoodInformation } from "../../entities/food-information"
import { NotFound } from "../../entities/not-found"
import { getDateAsUnixTimestamp } from "../../utils/get-date-as-unix-timestamp"
import { getPossibleDueYears } from "../../utils/get-possible-due-years"
import { Getter } from "../../open-food-facts/getter"
import { toastError } from "../toasts/error"
import { Adder } from "./service/adder"

export interface FoodService extends Adder<Food> { }
export interface FoodInformationService extends Getter<FoodInformation> { }

@Component(
    {
        styleUrl: "index.css",
        tag: "scan-food",
    },
)
export class ScanFood {
    @State() public formControls: Food = {
        dueDate: null,
        ean: null,
        id: null,
        name: null,
    }
    @Prop() public foodService: FoodService
    @Prop() public foodInformationService: FoodInformationService
    @State() private error: Error

    private title = "Add Food"
    private possibleDueYears = getPossibleDueYears()
    private dateFormat = "DD/MM/YYYY"

    constructor() {
        this.changeEANCode = this.changeEANCode.bind(this)
        this.changeDueDate = this.changeDueDate.bind(this)
        this.changeName = this.changeName.bind(this)
    }

    public componentDidLoad() {
        this.formControls = {
            ...this.formControls,
            ean: "400195416508",
        }
    }

    public render() {
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
                this.formControls.ean === null &&
                <ion-content color="dark">
                    <barcode-reader
                        onCodeChange={this.changeEANCode}
                    />
                </ion-content>
            ),
            (
                this.formControls.dueDate === null && this.formControls.ean !== null &&
                <ion-content>
                    <ion-item
                        class="root ion-text-center"
                    >
                        <ion-label
                            position="stacked"
                            mode="ios"
                        >
                            {this.dateFormat}
                        </ion-label>
                        <ion-datetime
                            mode="ios"
                            display-format={this.dateFormat}
                            yearValues={this.possibleDueYears}
                            onIonChange={this.changeDueDate}
                        />
                    </ion-item>

                    {this.error &&
                        <ion-item
                            class="root ion-text-center"
                        >
                            <ion-label
                                position="stacked"
                                mode="ios"
                            >
                                Food Name
                        </ion-label>
                            <ion-input
                                type="text"
                                onIonChange={this.changeName}
                            />
                        </ion-item>
                    }
                </ion-content>
            ),
            <ion-alert-controller></ion-alert-controller>,
        ]
    }

    @Watch("formControls")
    private async watchHandler(newValue: Food, oldValue: Food) {
        if (oldValue.ean !== newValue.ean) {
            const [foodInformation, error] = await this.foodInformationService.get(newValue.ean)

            if (error) {
                toastOFFError(error)
                this.error = error

                this.formControls = {
                    ...this.formControls,
                    ean: null,
                }
            }

            if (foodInformation) {
                this.formControls = {
                    ...this.formControls,
                    name: foodInformation.name,
                }
            }

        }

        if (
            newValue.ean !== null
            && newValue.name !== null
            && newValue.dueDate !== null
        ) {
            this.saveFood()
        }
    }

    private saveFood() {
        this.foodService.add(this.formControls)
        window.history.back()
    }

    private changeEANCode(newCode: string) {
        this.formControls = {
            ...this.formControls,
            ean: newCode,
        }
    }

    private changeName(event: CustomEvent<InputChangeEventDetail>) {
        this.formControls = {
            ...this.formControls,
            name: event.detail.value,
        }
    }

    private changeDueDate(event: CustomEvent<DatetimeChangeEventDetail>) {
        const selectedDate = new Date(event.detail.value)
        const unixDueDate = getDateAsUnixTimestamp(selectedDate)
        this.formControls = {
            ...this.formControls,
            dueDate: unixDueDate,
        }
    }

}

function toastOFFError(error: Error) {
    if (error instanceof NotFound) {
        toastError("Product not found. Try again")
        return
    }

    toastError("Something unknown went wrong. Try again")
    return

}
