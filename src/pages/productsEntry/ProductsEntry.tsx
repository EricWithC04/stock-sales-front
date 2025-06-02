import { useEffect, useRef, useState } from "react";
import { ProductsEntryForm } from "../../components/productsEntryForm/ProductsEntryForm";
import { ProductsEntryList } from "../../components/productsEntryList/ProductsEntryList";
import styles from "./ProductsEntry.module.css";
import { getDateString } from "../../utils/getDateString";
import { StockProductModal } from "../../components/stockProductModal/StockProductModal";
import { StockNewProductModal } from "../../components/stockNewProductModal/StockNewProductModal";

import { useGeneralContext } from "../../context/GeneralContext";

interface ProductsEntry {
    id: number,
    productId: string
    quantity: number,
    expiresDate: string | null
}

interface entryData {
    id: number
    productId: string
    quantity: number
    expiresDate: string | null
}

export const ProductsEntryPage = () => {

    const { getLots } = useGeneralContext()!

    const notFoundProductRef = useRef<HTMLDialogElement>(null)
    const newProductRef = useRef<HTMLDialogElement>(null)

    const [entriesData, setEntriesData] = useState<Array<ProductsEntry>>([])

    const entryProducts = (data: entryData) => {
        setEntriesData([
            ...entriesData, 
            {
                id: data.id,
                productId: data.productId,
                quantity: data.quantity,
                expiresDate: getDateString(new Date(data.expiresDate!))
            }
        ])
    }

    useEffect(() => {
        setEntriesData(getLots())
    }, [])

    const openNotFoundModal = () => {
        notFoundProductRef.current?.showModal()
    }

    const closeNotFoundModal = () => {
        notFoundProductRef.current?.close()
    }

    const openNewProductModal = () => {
        newProductRef.current?.showModal()
    }

    const closeNewProductModal = () => {
        newProductRef.current?.close()
    }

    return (
        <div className={styles["products-entry-container"]}>
            <h1 className={styles["title"]}>Ingresos</h1>
            <StockProductModal
                ref={notFoundProductRef}
                openNewProductModal={openNewProductModal}
                closeModal={closeNotFoundModal}
            />
            <StockNewProductModal 
                ref={newProductRef}
                closeModal={closeNewProductModal}
            />
            <ProductsEntryForm
                entryProducts={entryProducts}
                openModal={openNotFoundModal}
            />
            <ProductsEntryList
                entriesData={entriesData}
            />
        </div>
    )
}
