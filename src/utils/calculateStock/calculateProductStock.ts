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

export const calculateItemStock = (data: Drink | Food | Offer | "Código Invalido", foods: Array<Food>, lots: Array<Lot>, dataProducts: Array<Drink | Ingredient>): number => {
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

    if (data.type === "Oferta") {
        const productsWithQuantities: Array<{id: string, quantity: number}> = [];

        (data as Offer).products.forEach(product => {
            const finded = productsWithQuantities.find(p => p.id === product.id)
            if (finded) {
                finded.quantity += 1 
            } else {
                productsWithQuantities.push({ id: product.id, quantity: 1 })
            }
        })

        let totalStock: number | null = null;

        productsWithQuantities.forEach((product) => {
            const productData = [...foods, ...dataProducts].find(p => p.id === product.id)
            if (!productData) throw new Error("No se ha encontrado el producto buscado")
            if (productData.type === "Bebida") {
                totalStock === null ? 
                totalStock = stocks[product.id] :
                totalStock = Math.min(totalStock, stocks[product.id]) 
            }
            if (productData.type === "Comida") {
                let stock: number | null = null;
                (productData as Food).ingredients.forEach((ingredient: { id: string, quantity: number }) => {
                    if (stock === null) stock = Math.floor(Math.floor(stocks[ingredient.id] / ingredient.quantity) / product.quantity)
                    else stock = Math.min(stock, Math.floor(Math.floor(stocks[ingredient.id] / ingredient.quantity) / product.quantity))
                })
                totalStock === null ? 
                totalStock = stock :
                totalStock = Math.min(totalStock, stock || 0)
            }
        })

        return totalStock || 0
    }

    return 0
}