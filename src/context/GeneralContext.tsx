import React, { useContext, createContext, useState, useEffect } from 'react'
import { 
    getCategoriesData,
    getDrinks, 
    getFoodData, 
    getIngredientsData, 
    getLotsDataFiltered, 
    getOffersData, 
    getSalesData, 
} from '../mocks/apiMock'
import { calculateExpiresDates } from '../utils/calculateStock/getExpiresDates'
import { calculateDiscountLots } from '../utils/calculateStock/calculateDiscountLots'

interface Props {
    children: React.ReactNode
}

type TypeProduct = "Bebida" | "Ingrediente" | "Comida" | "Oferta"

interface Category {
    id: number
    name: string
}

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
    id?: number
    client: string
    products: Array<{ id: string, quantity: number }>
    total: number
    date: string
    payMethod: "Efectivo" | "Transferencia"
}

interface ItemSale {
    // El id del ItemSale es el mismo que el del producto
    id: string
    description: string
    type?: string
    quantity: number
    price: number
}

interface GeneralContextProps {
    getCategories: () => Array<Category>
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
    updateOfferPrice: (id: string, newPrice: number) => void
    deleteOffer: (id: string) => void
    getProductsStock: () => any
    discountProduct: (_itemProducts: Array<ItemSale>) => void
    validateIngredientExists: (id: string) => boolean
}

const GeneralContext = createContext<GeneralContextProps | null>(null)

export const useGeneralContext = () => useContext(GeneralContext)

export const GeneralProvider = ({ children }: Props) => {

    const [categories, setCategories] = useState<Array<Category>>([])
    const [products, setProducts] = useState<Array<Drink>>([])
    const [ingredients, setIngredients] = useState<Array<Ingredient>>([])
    const [foods, setFoods] = useState<Array<Food>>([])
    const [lots, setLots] = useState<Array<Lot>>([])
    const [offers, setOffers] = useState<Array<Offer>>([])
    const [sales, setSales] = useState<Array<Sale>>([])

    const getCategories = () => {
        return categories
    }

    // Obtener todos los productos
    const getProducts = () => {
        return products
    }

    const getProductById = (id: string) => {
        const product = [...products, ...foods, ...offers].find(product => product.id === id)
        if (product) return product
        else return "Código Invalido"
    }

    // Obtener todos los ingredients
    const getIngredients = () => {
        return ingredients
    }

    // Obtener todas las comidas (opciones del menu)
    const getFoods = () => {
        return foods
    }

    // Obtener todos los lotes
    const getLots = () => {
        return lots
    }

    // Obtener todos los productos proximos a vencer
    const getExpiresDates = () => {
        return calculateExpiresDates(lots, 7)
    }

    // Obtener todas las ofertas
    const getOffers = () => {
        return offers
    }

    // Obtener el listado de ventas realizadas
    const getSales = () => {
        return sales
    }

    // Cuando se registra un nuevo producto
    const uploadNewProduct = (product: Drink) => {
        // TODO : Agregar conexión con el servidor "CREAR BEBIDA"
        setProducts([...products, { ...product, type: "Bebida" }])
    }

    // Cuando se registra un nuevo ingrediente
    const uploadNewIngredient = (ingredient: Ingredient) => {
        // TODO : Agregar conexión con el servidor "CREAR INGREDIENTE"
        setIngredients([...ingredients, {...ingredient, type: "Ingrediente"}])
    }

    // Cuando se registra una nueva comida
    const uploadNewFood = (food: Food) => {
        // TODO : Agregar conexión con el servidor "CREAR COMIDA"
        setFoods([...foods, {...food, type: "Comida"}])
    }

    // Cuando se registra un nuevo lote
    const uploadNewLot = (lot: Lot) => {
        // TODO : Agregar conexión con el servidor "CREAR LOTE"
        setLots([...lots, lot])
    }

    // Cuando se registra una nueva oferta
    const uploadNewOffer = (newOffer: Offer) => {
        // TODO : Agregar conexión con el servidor "CREAR OFERTA"
        setOffers([...offers, { ...newOffer, type: "Oferta" }])
    }

    // Cuando se registra una nueva venta
    const uploadNewSale = (newSale: Sale) => {
        // TODO : Agregar conexión con el servidor "CREAR VENTA"
        setSales([...sales, {...newSale, id: sales.length+1}])
    }

    // Cuando se activa o inactiva una oferta
    const updateOfferStatus = (id: string) => {
        // TODO : Agregar conexión con el servidor "ACTUALIZAR ESTADO OFERTA"
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

    const updateOfferPrice = (id: string, newPrice: number) => {
        const newOffers: Array<Offer> = []
        offers.forEach(offer => {
            if (offer.id === id) {
                newOffers.push({ ...offer, price: newPrice })
            } else {
                newOffers.push(offer)
            }
        })
        setOffers(newOffers)
    }

    const deleteOffer = (id: string) => {
        // TODO : Agregar conexión con el servidor "ELIMINAR OFERTA"
        const newOffers = offers.filter(offer => offer.id !== id)
        setOffers(newOffers)
    }

    // Obtener listado de los productos con cantidad en stock
    const getProductsStock = () => {
        alert("Funcionalidad en desarrollo")
    }

    // Descontar la cantidad de stock priorizando las fechas de vencimiento más recientes
    const discountProduct = (itemProducts: Array<ItemSale>) => {
        // TODO : Agregar conexión con el servidor "DESCONTAR STOCK"
        // TODO : Agregar que el descuento funcione también para las ofertas, solamente funciona para bebidas y comidas

        const lotsDiscount: Array<{ id: number, quantity: number }> = []
        itemProducts.forEach(product => {
            if (product.type && product.type === "Comida") {
                const productData = getProductById(product.id)
                if (productData === "Código Invalido") throw new Error("Error en el manejo de los id");

                (productData as Food).ingredients.forEach(ingredient => {
                    const ingredientQuantity = ingredient.quantity * product.quantity
                    const discountLots = calculateDiscountLots(ingredient.id, ingredientQuantity, lots)
                    lotsDiscount.push(...discountLots)
                })

            } else {
                const discountLots = calculateDiscountLots(product.id, product.quantity, lots)
                lotsDiscount.push(...discountLots)
            }

        })

        const lotsIndexes = new Map<number, number>()
        for (const d of lotsDiscount) {
            lotsIndexes.set(d.id, (lotsIndexes.get(d.id) || 0) + d.quantity);
        }
        
        const newLots: Array<Lot> = lots.map(lot => ({...lot, quantity: lot.quantity - (lotsIndexes.get(lot.id) || 0)}))
        
        setLots(newLots)
    }

    const validateIngredientExists = (id: string): boolean => {
        return ingredients.some(ingredient => ingredient.id === id)
    }

    useEffect(() => {
        // TODO : Crear conexión de las categorías con el servidor
        getCategoriesData()
            .then(categories => setCategories(categories))
        // TODO : Crear conexión de las bebidas con el servidor
        getDrinks()
            .then(products => setProducts(products))
        // TODO : Crear conexión de los lotes con el servidor
        getLotsDataFiltered()
            .then(lots => setLots(lots))
        // TODO : Crear conexión de las ofertas con el servidor
        getOffersData()
            .then(offers => setOffers(offers))
        // TODO : Crear conexión de los ingredientes con el servidor
        getIngredientsData()
            .then(ingredients => setIngredients(ingredients))
        // TODO : Crear conexión de las comidas con el servidor
        getFoodData()
            .then(foods => setFoods(foods))
        // TODO : Crear conexión de los registros de venta con el servidor
        getSalesData()
            .then(sales => setSales(sales))
    }, [])

    return (
        <GeneralContext.Provider value={{ 
            getCategories,
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
            updateOfferPrice,
            deleteOffer,
            getProductsStock, 
            discountProduct,
            validateIngredientExists
        }}>
            {children}
        </GeneralContext.Provider>
    )
}
