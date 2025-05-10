import productsData from "../mocks/drinksData.json"

export const getProductDataById = (id: string) => {
    const findedProduct = productsData.find(product => product.id === id)
    if (findedProduct) {
        return findedProduct
    } else {
        return "Producto desconocido"
    }
}