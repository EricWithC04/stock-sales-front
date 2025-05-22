import { useState, useRef } from "react"
import { ProductListSales } from "../../components/productListSales/ProductListSales"
import { ProductBrowserSales } from "../../components/productsBrowserSales/ProductBrowserSales"
import styles from "./Sales.module.css"
import { ProductTotalSales } from "../../components/productTotalSales/ProductTotalSales"
import { ProductInsufficientModal } from "../../components/productsInsufficientModal/ProductInsufficientModal"
import { SuccessSaleModal } from "../../components/successSaleModal/SuccessSaleModal"
import { SalesListPage } from "../../components/salesListPage/SalesListPage"

import { useGeneralContext } from "../../context/GeneralContext"

interface ItemSale {
    id: string
    description: string
    type?: string
    quantity: number
    price: number
}

export const SalesPage = () => {

    const { getProductById } = useGeneralContext()!

    const [option, setOption] = useState<"Registro" | "Listado">("Registro")

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
            const data = getProductById(id)
            if (data !== "Código Invalido") {
                if (data.type === "Bebida") {
                    setItemSales([...itemSales, { id: data.id, description: (data as any).description, quantity: 1, price: data.price }])
                } else if (data.type === "Comida") {
                    setItemSales([...itemSales, { id: data.id, description: (data as any).name, type: "Comida", quantity: 1, price: data.price }])
                } else {
                    setItemSales([...itemSales, { id: data.id, description: (data as any).name, type: "Oferta", quantity: 1, price: data.price }])
                }
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
                    { id: item.id, description: item.description, type: item.type || "", quantity: item.quantity, price: item.price * item.quantity }
                ))}
                clearItems={() => setItemSales([])}
                ref={successRef}
            />
            <div className={styles["sales-header"]}>
                <h1>Ventas</h1>
                <button 
                    className={`${option === "Registro" ? styles["option-selected"]: "" }`}
                    onClick={() => setOption("Registro")}
                >Ver registro</button>
                <button 
                    className={`${option === "Listado" ? styles["option-selected"]: "" }`}
                    onClick={() => setOption("Listado")}
                >Ver listado</button>
            </div>
            {
                option === "Registro" ? (
                    <>
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
                    </>
                ) : (
                    <>
                        <SalesListPage />
                    </>
                )
            }
        </div>
    )
}
