// import { getExpiresDates } from "../utils/calculateStock/getExpiresDates"
import CategoriesData from "./categoriesData.json"
import DrinksData from "./drinksData.json"
import LotsData from "./lotsData.json"

interface Category {
    id: number
    name: string
}

interface Drink {
    id: string
    description: string
    stock: number
    price: number
}

interface Lot {
    id: number
    productId: string
    quantity: number
    expiresDate: string | null
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const getCategories =  async (): Promise<Array<Category>> => {
    await delay(1000)
    return CategoriesData
}

export const getDrinks = async (): Promise<Array<Drink>> => {
    await delay(1000)
    return DrinksData
}

export const getLotsData = async (): Promise<Array<Lot>> => {
    await delay(1000)
    return LotsData
}

// export const getExpiresLots = async (): Promise<Array<ExpiresLot>> => {
//     await delay(1000)
//     return getExpiresDates(LotsData, 7)
// }