import productsData from "../mocks/drinksData.json"

export const getProductNameById = (id: string) => {
    const findedProduct = productsData.find(product => product.id === id)
    if (findedProduct) {
        return findedProduct.description
    } else {
        return "Producto desconocido"
    }
}