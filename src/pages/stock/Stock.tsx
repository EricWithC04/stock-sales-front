import { useState, useEffect, useRef } from 'react'
import DataTable from 'react-data-table-component';
import styles from "./Stock.module.css";
import { StockSearchBar } from '../../components/stockSearchBar/StockSearchBar';
import { normalizeText } from '../../utils/normalizeText';
import { LoadingSpinner } from '../../components/loadingSpinner/LoadingSpinner';
import { calculateProductStock } from '../../utils/calculateStock/calculateProductStock';
import { StockProductModal } from '../../components/stockProductModal/StockProductModal';
import { StockNewProductModal } from '../../components/stockNewProductModal/StockNewProductModal';

import { useGeneralContext } from '../../context/GeneralContext';

interface ItemStock {
    id: string;
    description: string;
    stock: number;
    price: number;
}

export const StockPage = () => {

    const { getProducts, getLots } = useGeneralContext()!

    const notFoundProductRef = useRef<HTMLDialogElement>(null)
    const newProductRef = useRef<HTMLDialogElement>(null)

    const columns = [
        {
            name: 'ID',
            selector: (row: ItemStock) => row.id,
        },
        {
            name: 'Descripción',
            selector: (row: ItemStock) => row.description,
            sortable: true,
        },
        {
            name: 'Stock',
            selector: (row: ItemStock) => row.stock, 
        },
        {
            name: 'Precio',
            selector: (row: ItemStock) => row.price,
        }
    ]

    const [data, setData] = useState<Array<ItemStock>>([])
    const [displayData, setDisplayData] = useState<Array<ItemStock>>([])

    const [loading, setLoading] = useState<boolean>(true)
    const [filter, setFilter] = useState<string>("")

    const [newProductFlag, setNewProductFlag] = useState<boolean>(false)

    useEffect(() => {
        const allProducts = getProducts().map(product => {
            return { ...product, stock: calculateProductStock(product.id, getLots()) }
        })
        setData(allProducts)
        setLoading(false)
    }, [newProductFlag])

    useEffect(() => {
        if (filter === "") {
            setDisplayData(data)
        } else {
            const appliedFilter = normalizeText(filter)
            const filteredData = data.filter(drink => (
                normalizeText(drink.description).includes(appliedFilter) || normalizeText(drink.id).includes(appliedFilter)
            ))
            setDisplayData(filteredData)
        }
    }, [filter, data])

    const notifyNewProduct = () => {
        setNewProductFlag(!newProductFlag)
    }

    // const openNotFoundModal = () => {
    //     notFoundProductRef.current?.showModal()
    // }

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
        <div className={styles["stock-container"]}>
            <StockProductModal
                ref={notFoundProductRef}
                closeModal={closeNotFoundModal}
                openNewProductModal={openNewProductModal}
            />
            <StockNewProductModal 
                ref={newProductRef}
                closeModal={closeNewProductModal}
                notifyNewProduct={notifyNewProduct}
            />
            <h1>Inventario</h1>
            <div className={styles["actions-container"]}>
                <StockSearchBar 
                    setFilter={setFilter}
                />
                <button 
                    className={styles["new-product-button"]}
                    onClick={openNewProductModal}
                >Nuevo Producto</button>
            </div>
            <DataTable 
                columns={columns} 
                data={displayData}
                pagination
                progressPending={loading}
                progressComponent={<LoadingSpinner />}
            />
        </div>
    )
}