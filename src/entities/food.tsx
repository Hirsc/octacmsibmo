import { UnixTimestamp } from "../utils/unix-timestamp"
import { EuropeanArticelNumber } from "./european-articel-number"
import { ID } from "./id"

export interface Food {
    name: string
    dueDate?: UnixTimestamp
    ean: EuropeanArticelNumber
    id: ID
}





