import { Component, h, Prop } from "@stencil/core"

import { StorageService } from "../../services/storage"

import { CaloriesService } from "./service/index"

@Component(
    {
        styleUrl: "index.css",
        tag: "day-overview",
    },
)
export class DayOverview {
    @Prop() public dayMonthYear: string
    
    private title = "Food List"
    private foodService: CaloriesService = new CaloriesService(StorageService)


    public render(): Element[] {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-title>{this.title}</ion-title>
                    <ion-buttons slot="end">
                        <ion-button href="goals">
                            <ion-icon name="flag" slot="icon-only"></ion-icon>
                        </ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>,

            <ion-content>
                <current-day-macros service={this.foodService} dayMonthYear={this.dayMonthYear}/>
                <current-day-food-list service={this.foodService} dayMonthYear={this.dayMonthYear}/>

                <ion-fab vertical="bottom" horizontal="start" slot="fixed">
                    <ion-fab-button href="add">
                        <ion-icon name="barcode"></ion-icon>
                    </ion-fab-button>
                </ion-fab>

                <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                    <ion-fab-button href="add-manual">
                        <ion-icon name="create"></ion-icon>
                    </ion-fab-button>
                </ion-fab>
            </ion-content>,
        ]
    }

}


