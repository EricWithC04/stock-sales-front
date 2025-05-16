import { useState } from "react"
import { ProductListSales } from "../../components/productListSales/ProductListSales"
import { ProductBrowserSales } from "../../components/productsBrowserSales/ProductBrowserSales"
import styles from "./Sales.module.css"
import { getProductDataById } from "../../utils/getProductDataById"
import { ProductTotalSales } from "../../components/productTotalSales/ProductTotalSales"

interface ItemSale {
    id: string
    description: string
    quantity: number
    price: number
}

export const SalesPage = () => {

    const [itemSales, setItemSales] = useState<Array<ItemSale>>([])

    const handleIncludeItem = (id: string) => {
        const findedItem = itemSales.find(item => item.id === id)
        if (findedItem) {
            const updatedItemSales = itemSales.map(item => item.id === id ? {...item, quantity: item.quantity + 1} : item)
            setItemSales(updatedItemSales)
        } else {
            const data = getProductDataById(id)
            if (data !== "Producto desconocido") {
                setItemSales([...itemSales, { id: data.id, description: data.description, quantity: 1, price: data.price }])
            }
        }
    }

    const handleReduceItem = (id: string) => {
        const findedItem = itemSales.find(item => item.id === id)
        if (findedItem && findedItem.quantity > 1) {
            const updatedItemSales = itemSales.map(item => item.id === id ? {...item, quantity: item.quantity - 1} : item)
            setItemSales(updatedItemSales)
        }
    }

    return (
        <div className={styles["sales-container"]}>
            <h1>Registro de ventas</h1>
            <ProductBrowserSales 
                handleIncludeItem={handleIncludeItem}
            />
            <ProductListSales 
                productsData={itemSales}
                handleIncludeItem={handleIncludeItem}
                handleReduceItem={handleReduceItem}
            />
            <ProductTotalSales 
                itemSales={itemSales}
            />
        </div>
    )
}
