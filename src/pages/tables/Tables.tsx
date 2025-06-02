import { useState, useRef } from "react"
import styles from "./Tables.module.css"
import { TablesList } from "../../components/tablesList/TablesList"
import { EditOrderModal } from "../../components/editOrderModal/EditOrderModal"

import { useGeneralContext } from "../../context/GeneralContext"

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
    products: Array<{ id: string, name: string, price: number, quantity: number }>
}

export const TablesPage = () => {

    const { getProductById } = useGeneralContext()!

    const tableRef = useRef<HTMLDialogElement>(null)

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

    const changeTableStatus = (id: number) => {
        const newTables = tables.map(table => table.id === id ? { ...table, status: !table.status } : table)
        setTables(newTables)
    }

    const handleSelectOrder = (order: Order) => {
        setSelectedOrder(order)
        openTableModal()
    }

    const handleAddProductOrder = (order: Order, productId: string, quantity:number = 1) => {
        const product = getProductById(productId)
        if (product !== "Código Invalido") {
            const newTables = tables.map(table => {
                if (table.id !== order.id) return table
    
                const newProducts: Array<{ id: string, name: string, price: number, quantity: number }> = [...table.products]
                const finded = newProducts.find(product => product.id === productId)
    
                if (finded) finded.quantity += quantity
                else newProducts.push({ 
                    id: productId, 
                    price: product.price, 
                    quantity, 
                    name: product.type === "Bebida" ? (product as Drink).description : (product as Food).name 
                })
                return { ...table, products: newProducts }
            })
            setTables(newTables)
        }
    }

    const removeTable = (id: number) => {
        const newTables = tables.filter(table => table.id !== id)
        setTables(newTables)
    }

    return (
        <div className={styles["tables-container"]}>
            <EditOrderModal 
                closeModal={closeTableModal}
                selectedOrder={selectedOrder}
                addProductOrder={handleAddProductOrder}
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
                tables={tables}
            />
        </div>
    )
}
