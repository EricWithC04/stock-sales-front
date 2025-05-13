export const calculatePercentDiscount = (total: number, price: number) => {
    return parseFloat((((total - price) / total) * 100).toFixed(2))
}