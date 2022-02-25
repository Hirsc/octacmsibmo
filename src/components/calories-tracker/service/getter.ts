import { ID } from "../../../entities/id"

export interface Getter<T> {
    get: (id: ID) => Promise<[T?, Error?]>
}
