import { ID } from "../../../entities/id"

export interface Adder<T> {
    add: (item: T) => Promise<[ID?, Error?]>
}
