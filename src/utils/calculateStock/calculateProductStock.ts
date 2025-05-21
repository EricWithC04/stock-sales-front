type TypeProduct = "Bebida" | "Ingrediente" | "Comida" | "Oferta"

interface Lot {
    id: number
    productId: string
    quantity: number
    expiresDate: string | null
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

interface Offer {
    id: string
    name: string
    type?: TypeProduct
    products: Array<{ id: string }>
    regularPrice: number
    price: number
    available: boolean
}

export const calculateProductStock = (id: string, lots: Array<Lot>) => {
    const productLots = lots.filter(lot => lot.productId === id)
    let totalStock = 0
    productLots.forEach(lot => {
        totalStock += +lot.quantity
    })
    return totalStock
}

export const calculateItemStock = (data: Drink | Food | Offer | "Código Invalido", lots: Array<Lot>, dataProducts: Array<Drink | Ingredient>) => {
    if (data === "Código Invalido") return 0

    let stocks: { [key: string]: number } =  {} 
    dataProducts.forEach(product => {
        stocks[product.id] = calculateProductStock(product.id, lots)
    })
    
    // Bebidas
    if (data.type === "Bebida") {
        return stocks[data.id]
    }

    // Comidas
    if (data.type === "Comida") {
        let totalStock: number | null = null;
        (data as Food).ingredients.forEach((ingredient: { id: string, quantity: number }) => {
            if (totalStock === null) totalStock = Math.floor(stocks[ingredient.id] / ingredient.quantity)
            else totalStock = Math.min(totalStock, Math.floor(stocks[ingredient.id] / ingredient.quantity))
        })
        return totalStock || 0
    }
    return 0
    // Ofertas
}