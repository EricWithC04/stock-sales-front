// import { getExpiresDates } from "../utils/calculateStock/getExpiresDates"
import CategoriesData from "./categoriesData.json"
import DrinksData from "./drinksData.json"
import foodsData from "./foodsData.json"
import LotsData from "./lotsData.json"
import OffersData from "./offersData.json"
import IngredientsData from "./ingredientData.json"

type TypeProduct = "Bebida" | "Ingrediente" | "Comida" | "Oferta"

interface Category {
    id: number
    name: string
}

interface Ingredient {
    id: string
    type: TypeProduct
    description: string
}

interface Food {
    id: string
    name: string
    description: string
    type: TypeProduct
    category: string
    ingredients: Array<{ id: string, quantity: number }>
    price: number
}

interface Drink {
    id: string
    description: string
    type: TypeProduct
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
    type: TypeProduct
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
    const ingredientsCompleteData = IngredientsData.map(i => { return { ...i, type: "Ingrediente" as TypeProduct } })
    await delay(1000)
    return ingredientsCompleteData
}

export const getDrinks = async (): Promise<Array<Drink>> => {
    const drinksCompleteData = DrinksData.map(i => { return { ...i, type: "Bebida" as TypeProduct } })
    await delay(1000)
    return drinksCompleteData
}

export const getFoodData = async (): Promise<Array<Food>> => {
    const foodsCompleteData = foodsData.map(i => { return { ...i, type: "Comida" as TypeProduct } })
    await delay(1000)
    return foodsCompleteData
}

export const getLotsData = async (): Promise<Array<Lot>> => {
    await delay(1000)
    return LotsData
}

export const getOffersData = async (): Promise<Array<Offer>> => {
    const offersCompleteData = OffersData.map(i => { return { ...i, type: "Oferta" as TypeProduct } })
    await delay(1000)
    return offersCompleteData
}