import { useState, useRef } from "react"
import styles from "./Tables.module.css"
import { TablesList } from "../../components/tablesList/TablesList"
import { EditOrderModal } from "../../components/editOrderModal/EditOrderModal"

interface Order {
    id: number
    status: boolean
    client: string
    products: Array<{ id: string, name: string, price: number, quantity: number }>
}

export const TablesPage = () => {

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

    return (
        <div className={styles["tables-container"]}>
            <EditOrderModal 
                closeModal={closeTableModal}
                ref={tableRef}
            />
            <h1 className={styles["title"]}>Gestión de Mesas</h1>
            <div>
                <button onClick={() => setTables([...tables, { id: tables.length + 1, status: false, client: "", products: [] }])}>Agregar Mesa</button>
            </div>
            <TablesList
                selectOrderToChange={openTableModal}
                changeTableStatus={changeTableStatus}
                tables={tables}
            />
        </div>
    )
}
