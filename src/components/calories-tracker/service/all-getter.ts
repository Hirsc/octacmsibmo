export interface AllGetter<T> {
    getAll: () => Promise<[T[]?, Error?]>
}
