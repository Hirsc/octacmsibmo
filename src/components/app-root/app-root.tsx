import { Component, h } from "@stencil/core"
import { OpenFoodFactsService } from "../../open-food-facts"
import { StorageService } from "../../services/storage"
import { FoodService } from "../calories-tracker/service"

const foodService = new FoodService(StorageService)
const foodInformationService = new OpenFoodFactsService()

@Component({
    styleUrl: "app-root.css",
    tag: "app-root",
})
export class AppRoot {

    public render() {
        return (
            <ion-app>
                <ion-router useHash={false}>
                    <ion-route url="/" component="food-list" componentProps={{ service: foodService }} />
                    <ion-route
                        url="/add"
                        component="scan-food"
                        componentProps={{ foodService, foodInformationService }}
                    />
                    <ion-route url="/profile/:name" component="app-profile" />
                </ion-router>
                <ion-nav />
            </ion-app>
        )
    }
}
