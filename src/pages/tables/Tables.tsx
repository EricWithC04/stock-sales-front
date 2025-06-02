import { useState, useRef } from "react"
import styles from "./Tables.module.css"
import { TablesList } from "../../components/tablesList/TablesList"
import { EditOrderModal } from "../../components/editOrderModal/EditOrderModal"

import { useGeneralContext } from "../../context/GeneralContext"
import { SuccessSaleModal } from "../../components/successSaleModal/SuccessSaleModal"

interface Drink {
    id: string
    description: string
    type?: string
    stock: number
    price: number
}

interface Food {
    id: string
    name: string
    description: string
    category: string
    ingredients: Array<{ id: string, quantity: number }>
    quantity: number
    price: number
}

interface Order {
    id: number
    status: boolean
    client: string
    products: Array<{ id: string, name: string, type?: string, price: number, quantity: number }>
}

export const TablesPage = () => {

    const { getProductById } = useGeneralContext()!

    const tableRef = useRef<HTMLDialogElement>(null)
    const successSaleRef = useRef<HTMLDialogElement>(null)

    const [tables, setTables] = useState<Array<Order>>([
        { id: 1, status: true, client: "", products: [] },
        { id: 2, status: true, client: "", products: [] },
        { id: 3, status: true, client: "", products: [] },
        { id: 4, status: true, client: "", products: [] },
        { id: 5, status: true, client: "", products: [] },
        { id: 6, status: true, client: "", products: [] },
        { id: 7, status: true, client: "", products: [] },
        { id: 8, status: true, client: "", products: [] },
    ])

    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

    const openTableModal = () => { 
        tableRef.current?.showModal()
    }

    const closeTableModal = () => {
        tableRef.current?.close()
    }

    const openSuccessModal = () => {
        successSaleRef.current?.showModal()
    }

    const closeSuccessModal = () => {
        successSaleRef.current?.close()
    }

    const changeTableStatus = (id: number) => {
        const newTables = tables.map(table => table.id === id ? { ...table, status: !table.status } : table)
        setTables(newTables)
    }

    const handleSelectOrder = (order: Order) => {
        setSelectedOrder(order)
        openTableModal()
    }

    const handleRemoveProduct = (id: number, productId: string) => {
        const newTables = tables.map(table => {
            if (table.id !== id) return table
            else {
                const newProducts: Array<{ id: string, name: string, price: number, quantity: number }> = 
                    table.products.filter(product => product.id !== productId)
                setSelectedOrder({ ...table, products: newProducts })
                return {
                    ...table,
                    products: newProducts
                }
            }
        })
        setTables(newTables)
    }

    const handleAddProductOrder = (order: Order, productId: string, quantity:number = 1) => {
        const product = getProductById(productId)
        if (product !== "Código Invalido") {
            const newTables = tables.map(table => {
                if (table.id !== order.id) return table
    
                const newProducts: Array<{ id: string, name: string, type?: string, price: number, quantity: number }> = [...table.products]
                const finded = newProducts.find(product => product.id === productId)
    
                if (finded) finded.quantity += quantity
                else newProducts.push({ 
                    id: productId, 
                    price: product.price, 
                    type: product.type,
                    quantity, 
                    name: product.type === "Bebida" ? (product as Drink).description : (product as Food).name 
                })
                setSelectedOrder({ ...table, products: newProducts })
                return { ...table, products: newProducts }
            })
            setTables(newTables)
        }
    }

    const removeTable = (id: number) => {
        const newTables = tables.filter(table => table.id !== id)
        setTables(newTables)
    }

    const handleSuccessSale = (order: Order) => {
        setSelectedOrder(order)
        openSuccessModal()
    }

    const handleClearItems = () => {
        const newTables = tables.map(table => {
            if (table.id !== selectedOrder!.id) return table
            else return { ...table, products: [], status: true, client: "" }
        })
        setSelectedOrder(null)
        setTables(newTables)
        closeSuccessModal()
    }

    const formatData = (order: Order) => {
        return [
            ...order.products.map(product => ({
                id: product.id,
                description: product.name,
                type: product.type,
                price: product.price,
                quantity: product.quantity
            }))
        ]
    }


    return (
        <div className={styles["tables-container"]}>
            <SuccessSaleModal
                clearItems={handleClearItems}
                items={selectedOrder ? formatData(selectedOrder) : []}
                closeModal={closeSuccessModal}
                ref={successSaleRef}
            />
            <EditOrderModal 
                closeModal={closeTableModal}
                selectedOrder={selectedOrder}
                addProductOrder={handleAddProductOrder}
                removeProductOrder={handleRemoveProduct}
                ref={tableRef}
            />
            <h1 className={styles["title"]}>Gestión de Mesas</h1>
            <div>
                <button onClick={() => setTables([
                    ...tables, 
                    { id: tables[tables.length-1].id + 1, status: true, client: "", products: [] }
                ])}>Agregar Mesa</button>
            </div>
            <TablesList
                selectOrderToChange={handleSelectOrder}
                changeTableStatus={changeTableStatus}
                removeTable={removeTable}
                successSale={handleSuccessSale}
                tables={tables}
            />
        </div>
    )
}
