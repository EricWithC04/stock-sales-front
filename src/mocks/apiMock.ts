// import { getExpiresDates } from "../utils/calculateStock/getExpiresDates"
import CategoriesData from "./categoriesData.json"
import DrinksData from "./drinksData.json"
import foodsData from "./foodsData.json"
import LotsData from "./lotsData.json"
import OffersData from "./offersData.json"
import IngredientsData from "./ingredientData.json"

interface Category {
    id: number
    name: string
}

interface Ingredient {
    id: string
    description: string
}

interface Food {
    id: string
    name: string
    description: string
    category: string
    ingredients: Array<{ id: string, quantity: number }>
    price: number
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

interface Offer {
    id: string
    name: string
    products: Array<{ id: string }>
    regularPrice: number
    price: number
    available: boolean
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const getCategories =  async (): Promise<Array<Category>> => {
    await delay(1000)
    return CategoriesData
}

export const getIngredientsData = async (): Promise<Array<Ingredient>> => {
    await delay(1000)
    return IngredientsData
}

export const getDrinks = async (): Promise<Array<Drink>> => {
    await delay(1000)
    return DrinksData
}

export const getFoodData = async (): Promise<Array<Food>> => {
    await delay(1000)
    return foodsData
}

export const getLotsData = async (): Promise<Array<Lot>> => {
    await delay(1000)
    return LotsData
}

export const getOffersData = async (): Promise<Array<Offer>> => {
    await delay(1000)
    return OffersData
}