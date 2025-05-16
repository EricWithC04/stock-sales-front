import { useState, useRef } from "react"
import { ProductListSales } from "../../components/productListSales/ProductListSales"
import { ProductBrowserSales } from "../../components/productsBrowserSales/ProductBrowserSales"
import styles from "./Sales.module.css"
import { getProductDataById } from "../../utils/getProductDataById"
import { ProductTotalSales } from "../../components/productTotalSales/ProductTotalSales"
import { ProductInsufficientModal } from "../../components/productsInsufficientModal/ProductInsufficientModal"
import { SuccessSaleModal } from "../../components/successSaleModal/SuccessSaleModal"

interface ItemSale {
    id: string
    description: string
    quantity: number
    price: number
}

export const SalesPage = () => {

    const insufficientRef = useRef<HTMLDialogElement>(null)
    const successRef = useRef<HTMLDialogElement>(null)

    const [itemSales, setItemSales] = useState<Array<ItemSale>>([])
    const [insufficientStock, setInsufficientStock] = useState<boolean>(false)

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

    const handleDeleteItem = (id: string) => {
        const updatedItemSales = itemSales.filter(item => item.id !== id)
        setItemSales(updatedItemSales)
    }

    const handleReduceItem = (id: string) => {
        const findedItem = itemSales.find(item => item.id === id)
        if (findedItem && findedItem.quantity > 1) {
            const updatedItemSales = itemSales.map(item => item.id === id ? {...item, quantity: item.quantity - 1} : item)
            setItemSales(updatedItemSales)
        }
    }

    const openInsufficientModal = () => {
        insufficientRef.current?.showModal()
    }

    const closeInsufficientModal = () => {
        insufficientRef.current?.close()
    }

    const openSuccessModal = () => {
        successRef.current?.showModal()
    }

    const closeSuccessModal = () => {
        successRef.current?.close()
    }

    return (
        <div className={styles["sales-container"]}>
            <ProductInsufficientModal
                ref={insufficientRef}
                closeModal={closeInsufficientModal}
            />
            <SuccessSaleModal
                closeModal={closeSuccessModal}
                items={itemSales.map(item => (
                    { description: item.description, quantity: item.quantity, price: item.price * item.quantity }
                ))}
                ref={successRef}
            />
            <h1>Registro de ventas</h1>
            <div className={styles["sales-browser-container"]}>
                <ProductBrowserSales 
                    handleIncludeItem={handleIncludeItem}
                />
            </div>
            <ProductListSales 
                productsData={itemSales}
                handleIncludeItem={handleIncludeItem}
                handleDeleteItem={handleDeleteItem}
                handleReduceItem={handleReduceItem}
                setInsufficientStock={(b: boolean) => setInsufficientStock(b)}
            />
            <ProductTotalSales 
                itemSales={itemSales}
                insufficientStock={insufficientStock}
                openInsufficientModal={openInsufficientModal}
                openSuccessModal={openSuccessModal}
            />
        </div>
    )
}
