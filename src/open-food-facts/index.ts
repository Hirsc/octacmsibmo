import { EuropeanArticelNumber } from "../entities/european-articel-number"
import { FoodInformation } from "../entities/food-information"
import { NotFound } from "../entities/not-found"
import { Getter } from "./getter"

export class OpenFoodFactsService implements Getter<FoodInformation> {

    private foodInformationApi: string
    private protocol = "https"
    private version = "v0"
    private agent = `octacmsibmo - PWA - Version 0 - https://octacmsibmo.com - ${navigator.userAgent}`

    constructor(
        private country = "world",
    ) {
        this.foodInformationApi = `${this.protocol}://${this.country}.openfoodfacts.org/api/${this.version}`
    }

    public async get(ean: EuropeanArticelNumber): Promise<[FoodInformation?, Error?]> {
        try {
            const response = await fetch(
                `${this.foodInformationApi}/product/${ean}.json`,
                {
                    headers: {
                        "Accept": "application/json",
                        "User-Agent": this.agent,
                    },
                    method: "GET",
                },
            )

            if (!response.ok) {
                throw new Error(response.statusText)
            }

            const offResponse: OFFResponse = await response.json()

            validateResponse(offResponse)

            const nutriments = offResponse.product.nutriments

            return [{
                name: offResponse.product.product_name,
                protein: nutriments.proteins_100g ?? null,
                fat: nutriments.fat_100g ?? null,
                carbonhydrate: nutriments.carbohydrates_100g ?? null,
                energy: nutriments["energy-kcal_100g"] ?? null,
            }]
        } catch (error) {
            console.error(`Fetching product failed with an error: \n ${error}`)
            return [, error]
        }
    }
}


function validateResponse(response: OFFResponse) {
    if (response.status === 0) {
        throw new NotFound(response.status_verbose)
    }
}

interface OFFResponse {
    product: Product
    code: EuropeanArticelNumber
    status_verbose: StatusVerbose
    status: Status
}

type StatusVerbose = "product found"
type Status = 1 | 0


interface Product {
    product_name: string
    nutriments: Nutriments
    [key: string]: any
}

interface Nutriments {
    proteins_100g?: number
    fat_100g?: number
    carbohydrates_100g?: number
    "energy-kcal_100g"?: number
    [key: string]: any
}
