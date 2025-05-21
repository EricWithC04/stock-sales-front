import DataTable from "react-data-table-component"
import { Trash2, TriangleAlert } from "lucide-react"
import { Tooltip } from "react-tooltip"
import { calculateProductStock, calculateItemStock } from "../../utils/calculateStock/calculateProductStock"
import styles from "./ProductListSales.module.css"

import { useGeneralContext } from "../../context/GeneralContext"
import { useEffect, useState } from "react"

interface ItemSale {
    id: string
    description: string
    quantity: number
    price: number
}

interface Stock {
    [id: string]: {
        stock: number
        description: string
    }
}

interface Props {
    productsData: Array<ItemSale>
    handleIncludeItem: (id: string) => void
    handleDeleteItem: (id: string) => void
    handleReduceItem: (id: string) => void
    setInsufficientStock: (b: boolean) => void
}

export const ProductListSales = ({ 
    productsData, 
    handleIncludeItem, 
    handleReduceItem, 
    setInsufficientStock, 
    handleDeleteItem }: Props) => {

    const { getLots, getProducts, getIngredients, getProductById } = useGeneralContext()!

    const [stocks, setStocks] = useState<Stock>({})

    const columns = [
        {
            name: 'Producto',
            selector: (row: ItemSale) => row.id
        },
        {
            name: 'Descripción',
            selector: (row: ItemSale) => row.description
        },
        {
            name: 'Cantidad',
            cell: (row: ItemSale) => (
                <div className={styles["quantity-container"]}>
                    <button onClick={() => handleReduceItem(row.id)}>-</button>
                    <span>{row.quantity}</span>
                    <button onClick={() => handleIncludeItem(row.id)}>+</button>
                    {
                        stocks[row.id] && stocks[row.id].stock < row.quantity && (
                            <>
                                <TriangleAlert 
                                    color="orange"
                                    data-tooltip-id="stockWarning"
                                />
                                <Tooltip id="stockWarning" place="top">
                                    No hay suficiente stock
                                </Tooltip>
                            </>
                        )
                    }
                </div>
            )
        },
        {
            name: 'Precio unitario',
            selector: (row: ItemSale) => row.price
        },
        {
            name: 'Subtotal',
            selector: (row: ItemSale) => row.quantity * row.price
        },
        {
            name: 'Acciones',
            cell: (row: ItemSale) => (
                <div className={styles["actions-container"]}>
                    <Trash2 
                        onClick={() => handleDeleteItem(row.id)}
                        color={"red"}
                    />
                </div>
            )
        }
    ]

    useEffect(() => {
        if (productsData.length > 0) {
            const newStocks: Stock = {}
            const lots = getLots()
            const allDrinks = getProducts()
            const allIngredients = getIngredients()
            // TODO : Traer los datos de cada producto en cada iteracion
            productsData.forEach(({ id, description }) => newStocks[id] = {
                description,
                stock: calculateItemStock(getProductById(id), lots, [...allDrinks, ...allIngredients])
            })
            setStocks(newStocks)
            // Si hay alguno de los productos con stock insufficiente automaticamente se activa el estado
            productsData.some(({ id, quantity }: ItemSale) => newStocks[id] && newStocks[id].stock < quantity) ? 
            setInsufficientStock(true) : 
            setInsufficientStock(false)
        }
    }, [productsData])

    return (
        <div className={styles["product-list-sales-container"]}>
            <DataTable 
                className={styles["product-list-sales-table"]}
                pagination
                columns={columns}
                data={productsData}
            />
        </div>
    )
}