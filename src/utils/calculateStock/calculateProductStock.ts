interface Lot {
    id: number
    productId: string
    quantity: number
    expiresDate: string | null
}

export const calculateProductStock = (id: string, lots: Array<Lot>) => {
    const productLots = lots.filter(lot => lot.productId === id)
    let totalStock = 0
    productLots.forEach(lot => {
        totalStock += +lot.quantity
    })
    return totalStock
}