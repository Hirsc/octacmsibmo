import { Food } from "../../../entities/food"
import { ID } from "../../../entities/id"
import { UnixTimestamp } from "../../../utils/unix-timestamp"
import { StorageService, StorageServiceCreator } from "../../../services/storage"
import { Adder } from "./adder"
import { AllGetter } from "./all-getter"
import { Getter } from "./getter"
import { Remover } from "./remover"

const FoodStorageKey = "foods"

export class FoodService implements Adder<Food>, Getter<Food>, AllGetter<Food>, Remover {
    private storageService: StorageService<Food[]>

    constructor(StorageCreator: StorageServiceCreator) {
        this.storageService = new StorageCreator<Food[]>()
    }

    public async getAll(): Promise<[Food[]?, Error?]> {
        try {
            const foods = await this.storageService.get(FoodStorageKey)

            if (!foods) {
                return [[]]
            }

            return [foods]
        } catch {
            return [, new Error()]
        }
    }

    public async add(item: Food): Promise<[ID?, Error?]> {
        const [foods, error] = await this.getAll()
        const id = UnixTimestamp.getCurrentUnixTimestamp()

        if (foods) {
            const newFood = {
                ...item,
                id,
            }

            foods.push(newFood)
            this.storageService.set(FoodStorageKey, foods)

            return [id]
        }

        if (error) {
            return [, error]
        }
    }

    public async remove(id: ID): Promise<[Success?, Error?]> {
        const [foods, error] = await this.getAll()

        if (foods) {
            const index = foods.findIndex((f: Food) => f.id === id)
            foods.splice(index, 1)
            this.storageService.set(FoodStorageKey, foods)

            return [true]
        }

        if (error) {
            return [, error]
        }
    }

    public async get(id: ID): Promise<[Food?, Error?]> {
        const [foods, error] = await this.getAll()

        if (foods) {
            const index = foods.findIndex((f: Food) => f.id === id)
            const food = foods[index]

            return [food]
        }

        if (error) {
            return [, error]
        }
    }
}

type Success = boolean
