import { ID } from "../../../entities/id"
import { Success } from "../../../entities/success"

export interface Remover {
    remove: (id: ID) => Promise<[Success?, Error?]>
}
