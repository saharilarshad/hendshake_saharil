export type TEnum = "education" | "recreational" | "social" | "diy" | "charity" | "cooking" | "relaxation" | "music" | "busywork"

export type TData = {
    activity: string
    price: number
    type: TEnum
    booking: Boolean
    accessibility: number
}