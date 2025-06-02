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
import { customStylesWithPagination } from '../../styles/customStylesTables';
import { SquarePen } from 'lucide-react';
import { EditProductModal } from '../../components/editProductModal/EditProductModal';

interface ItemStock {
    id: string;
    description: string;
    stock: number;
    type: "Bebida" | "Ingrediente";
    price?: number;
}

interface ProductDataEdit {
    id: string;
    description: string;
    category: "Bebida" | "Ingrediente";
    price?: number;
}

export const StockPage = () => {

    const { getProducts, getIngredients, getLots } = useGeneralContext()!

    const [editProduct, setEditProduct] = useState<ProductDataEdit | null>(null) 

    const notFoundProductRef = useRef<HTMLDialogElement>(null)
    const newProductRef = useRef<HTMLDialogElement>(null)
    const editProductRef = useRef<HTMLDialogElement>(null)

    const openEditProductModal = () => {
        editProductRef.current?.showModal()
    }

    const closeEditProductModal = () => {
        editProductRef.current?.close()
    }

    const handleEditProduct = (product: ItemStock) => {
        setEditProduct({
            id: product.id,
            description: product.description,
            category: product.type,
            price: product.price
        })
        openEditProductModal()
    }

    const columnsDrinks = [
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
            selector: (row: ItemStock) => row.price!,
        },
        {
            name: 'Acciones',
            cell: (row: ItemStock) => (
                <div className={styles["actions-row"]}>
                    <div className={styles["edit"]} onClick={() => handleEditProduct(row)}>
                        <SquarePen color={"#000"} />
                    </div>
                </div>
            )
        }
    ]

    const columnsIngredients = [
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
        }
    ]

    const [type, setType] = useState<"Bebidas" | "Ingredientes">("Bebidas")

    const [data, setData] = useState<Array<ItemStock>>([])
    const [displayDataDrinks, setDisplayDataDrinks] = useState<Array<ItemStock>>([])
    const [displayDataIngredients, setDisplayDataIngredients] = useState<Array<ItemStock>>([])

    const [loading, setLoading] = useState<boolean>(true)
    const [filter, setFilter] = useState<string>("")

    const [newProductFlag, setNewProductFlag] = useState<boolean>(false)

    const obtainColumns = () => {
        return type === "Bebidas" ? columnsDrinks : columnsIngredients
    }

    const obtainData = () => {
        return type === "Bebidas" ? displayDataDrinks : displayDataIngredients
    }

    const setDataToDisplay = (dataToDisplay: Array<ItemStock>) => {
        const dataDrinks: Array<ItemStock> = []
        const dataIngredients: Array<ItemStock> = []
        dataToDisplay.forEach(d => {
            if (d.type === "Bebida") dataDrinks.push(d)
            else dataIngredients.push(d)
        })
        setDisplayDataDrinks(dataDrinks)
        setDisplayDataIngredients(dataIngredients)
    }

    useEffect(() => {
        const allProducts: Array<ItemStock> = getProducts().map(product => {
            return { ...product, stock: calculateProductStock(product.id, getLots()), type: "Bebida" }
        })
        const allIngredients: Array<ItemStock> = getIngredients().map(ingredient => {
            return { ...ingredient, stock: calculateProductStock(ingredient.id, getLots()), type: "Ingrediente" }
        })
        setData([...allProducts, ...allIngredients])
        setLoading(false)
    }, [newProductFlag])

    useEffect(() => {
        if (filter === "") {
            setDataToDisplay(data)
        } else {
            const appliedFilter = normalizeText(filter)
            const filteredData = data.filter(drink => (
                normalizeText(drink.description).includes(appliedFilter) || normalizeText(drink.id).includes(appliedFilter)
            ))
            setDataToDisplay(filteredData)
        }
    }, [filter, data])

    const notifyNewProduct = () => {
        setNewProductFlag(!newProductFlag)
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
        <div className={styles["stock-container"]}>
            <EditProductModal
                closeModal={closeEditProductModal}
                ref={editProductRef}
                productToEdit={editProduct}
            />
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
            <h1 className={styles["title"]}>Inventario</h1>
            <div className={styles["actions-container"]}>
                <StockSearchBar 
                    setFilter={setFilter}
                />
                <div className={styles["buttons-container"]}>
                    <button 
                        className={`${styles["button"]} ${type === "Bebidas" ? styles["selected"] : ""}`} 
                        onClick={() => setType("Bebidas")
                    }>Bebidas</button>
                    <button 
                        className={`${styles["button"]} ${type === "Ingredientes" ? styles["selected"] : ""}`} 
                        onClick={() => setType("Ingredientes")
                    }>Ingredientes</button>
                    <div className={styles["buttons-separator"]}></div>
                    <button 
                        className={styles["new-product-button"]}
                        onClick={openNewProductModal}
                    >Nuevo Producto</button>
                </div>
            </div>
            <DataTable 
                className={styles["data-table"]}
                columns={obtainColumns()} 
                data={obtainData()}
                pagination
                progressPending={loading}
                progressComponent={<LoadingSpinner />}
                customStyles={customStylesWithPagination}
            />
        </div>
    )
}