import { forwardRef } from "react"
import styles from "./SuccessSaleModal.module.css"
import DataTable from "react-data-table-component"

interface ItemResume {
    description: string
    quantity: number
    price: number
}

interface Props {
    items: Array<ItemResume>
    closeModal: () => void
}

export const SuccessSaleModal = forwardRef<HTMLDialogElement, Props> (({ items, closeModal }, ref) => {

    const columns = [
        {
            name: "Producto",
            selector: (row: ItemResume) => row.description
        },
        {
            name: "Cantidad",
            selector: (row: ItemResume) => row.quantity
        },
        {
            name: "Precio",
            selector: (row: ItemResume) => row.price
        }
    ]

    return (
        <dialog ref={ref}>
            <div className={styles["success-sale-modal-container"]}>
                <h2>Finalizar Venta</h2>
                <DataTable 
                    columns={columns}
                    data={items}
                />
                <div className={styles["subtotal"]}>
                    <h3>Subtotal:</h3>
                    <h3>${items.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h3>
                </div>
                <div className={styles["discount"]}>
                    <h3>Descuento:</h3>
                    <input type="text" />
                    <select name="" defaultValue="1">
                        <option value="1">$</option>
                        <option value="2">%</option>
                    </select>
                </div>
                <div className={styles["total"]}>
                    <h2>Total:</h2>
                    <h2>${items.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h2>
                </div>
                <div className={styles["pay-method"]}>
                    <h2>Metodo de Pago:</h2>
                    <div className="methods-container">
                        <button>Efectivo</button>
                        <button>Transferencia</button>
                    </div>
                </div>
                <div className={styles["buttons-container"]}>
                    <button className={styles["cancel-button"]} onClick={closeModal}>Cancelar</button>
                    <button className={styles["confirm-button"]}>Confirmar Venta</button>
                </div>
            </div>
        </dialog>
    )
})