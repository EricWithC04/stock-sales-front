import React, { useContext, createContext, useState, useEffect } from 'react'
import { getDrinks, getFoodData, getIngredientsData, getLotsData, getOffersData, getSalesData, } from '../mocks/apiMock'
import { calculateExpiresDates } from '../utils/calculateStock/getExpiresDates'

interface Props {
    children: React.ReactNode
}

type TypeProduct = "Bebida" | "Ingrediente" | "Comida" | "Oferta"

interface Ingredient {
    id: string
    type?: TypeProduct
    description: string
}

interface Drink {
    id: string
    description: string
    type?: TypeProduct
    stock: number
    price: number
}

interface Food {
    id: string
    name: string
    description: string
    type?: TypeProduct
    category: string
    ingredients: Array<{ id: string, quantity: number }>
    price: number
}

interface Lot {
    id: number
    productId: string
    quantity: number
    expiresDate: string | null
}

interface ExpiresLot {
    product: string
    quantity: number
    expiresDate: string
}

interface Offer {
    id: string
    name: string
    type?: TypeProduct
    products: Array<{ id: string }>
    regularPrice: number
    price: number
    available: boolean
}

interface Sale {
    id: number
    client: string
    products: Array<{ id: string, quantity: number }>
    total: number
    date: string
    payMethod: "Efectivo" | "Transferencia"
}

interface GeneralContextProps {
    getProducts: () => Array<Drink>
    getProductById: (id: string) => Drink | Food | Offer | "Código Invalido"
    getIngredients: () => Array<Ingredient>
    getFoods: () => Array<Food>
    getLots: () => Array<Lot>
    getExpiresDates: () => Array<ExpiresLot>
    getOffers: () => Array<Offer>
    getSales: () => Array<Sale>
    uploadNewProduct: (product: Drink) => void
    uploadNewIngredient: (ingredient: Ingredient) => void
    uploadNewFood: (food: Food) => void
    uploadNewLot: (lot: Lot) => void
    uploadNewOffer: (offer: Offer) => void
    uploadNewSale: (sale: Sale) => void
    updateOfferStatus: (id: string) => void
    // validateProductIdExists: (id: string) => boolean
    getProductsStock: () => any
    discountProduct: () => any
}

const GeneralContext = createContext<GeneralContextProps | null>(null)

export const useGeneralContext = () => useContext(GeneralContext)

export const GeneralProvider = ({ children }: Props) => {

    const [products, setProducts] = useState<Array<Drink>>([])
    const [ingredients, setIngredients] = useState<Array<Ingredient>>([])
    const [foods, setFoods] = useState<Array<Food>>([])
    const [lots, setLots] = useState<Array<Lot>>([])
    const [offers, setOffers] = useState<Array<Offer>>([])
    const [sales, setSales] = useState<Array<Sale>>([])

    // Obtener todos los productos
    const getProducts = () => {
        return products
    }

    const getProductById = (id: string) => {
        const product = [...products, ...foods, ...offers].find(product => product.id === id)
        if (product) return product
        else return "Código Invalido"
    }

    const getIngredients = () => {
        return ingredients
    }

    const getFoods = () => {
        return foods
    }

    const getLots = () => {
        return lots
    }

    const getExpiresDates = () => {
        return calculateExpiresDates(lots, 7)
    }

    const getOffers = () => {
        return offers
    }

    const getSales = () => {
        return sales
    }

    // Cuando se registra un nuevo producto
    const uploadNewProduct = (product: Drink) => {
        setProducts([...products, { ...product, type: "Bebida" }])
    }

    const uploadNewIngredient = (ingredient: Ingredient) => {
        setIngredients([...ingredients, {...ingredient, type: "Ingrediente"}])
    }

    const uploadNewFood = (food: Food) => {
        setFoods([...foods, {...food, type: "Comida"}])
    }

    // Cuando se registra un nuevo lote
    const uploadNewLot = (lot: Lot) => {
        setLots([...lots, lot])
    }

    const uploadNewOffer = (newOffer: Offer) => {
        setOffers([...offers, { ...newOffer, type: "Oferta" }])
    }

    const uploadNewSale = (newSale: Sale) => {
        setSales([...sales, newSale])
    }

    const updateOfferStatus = (id: string) => {
        const newOffers: Array<Offer> = []
        offers.forEach(offer => {
            if (offer.id === id) {
                newOffers.push({ ...offer, available: !offer.available })
            } else {
                newOffers.push(offer)
            }
        })
        setOffers(newOffers)
    }

    // Obtener listado de los productos con cantidad en stock
    const getProductsStock = () => {
        alert("Funcionalidad en desarrollo")
    }

    // Descontar la cantidad de stock priorizando las fechas de vencimiento más recientes
    const discountProduct = () => {
        alert("Funcionalidad en desarrollo")
    }

    useEffect(() => {
        getDrinks()
            .then(products => setProducts(products))
        getLotsData()
            .then(lots => setLots(lots))
        getOffersData()
            .then(offers => setOffers(offers))
        getIngredientsData()
            .then(ingredients => setIngredients(ingredients))
        getFoodData()
            .then(foods => setFoods(foods))
        getSalesData()
            .then(sales => setSales(sales))
    }, [])

    return (
        <GeneralContext.Provider value={{ 
            getProducts, 
            getProductById,
            getIngredients,
            getFoods,
            getLots, 
            getExpiresDates,
            getOffers,
            getSales,
            uploadNewProduct,
            uploadNewIngredient,
            uploadNewFood,
            uploadNewLot, 
            uploadNewOffer,
            uploadNewSale,
            updateOfferStatus,
            getProductsStock, 
            discountProduct 
        }}>
            {children}
        </GeneralContext.Provider>
    )
}
