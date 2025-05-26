export const calculatePercentDiscount = (total: number, price: number) => {
    return parseFloat((((total - price) / total) * 100).toFixed(2))
}

export const calculatePercent = (total: number, quantity: number) => {
    return calculatePercentDiscount(total, quantity)
}