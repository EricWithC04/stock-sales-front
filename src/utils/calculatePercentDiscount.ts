export const calculatePercentDiscount = (total: number, price: number) => {
    return parseFloat((((total - price) / total) * 100).toFixed(2))
}

export const calculatePercent = (total: number, quantity: number) => {
    const result = calculatePercentDiscount(total, quantity)
    if (result) return result
    else return 0 
}