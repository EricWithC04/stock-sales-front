import { forwardRef, useState } from "react"
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

    const [discount, setDiscount] = useState<number>(0)
    const [discountType, setDiscountType] = useState<string>("$")
    const [method, setMethod] = useState<"Efectivo" | "Transferencia" | "">("")

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
        <dialog ref={ref} className={styles["success-sale-modal"]}>
            <form className={styles["data-container"]}>
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
                    <input type="text" placeholder="Cantidad" />
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
                    <div className={styles["methods-container"]}>
                        <button 
                            type="button" 
                            className={`${method === "Efectivo" ? styles["method-selected"] : ""}`}
                            onClick={() => setMethod("Efectivo")}
                        >Efectivo</button>
                        <button 
                            type="button" 
                            className={`${method === "Transferencia" ? styles["method-selected"] : ""}`}
                            onClick={() => setMethod("Transferencia")}
                        >Transferencia</button>
                    </div>
                </div>
                <div className={styles["buttons-container"]}>
                    <button type="button" onClick={closeModal}>Cancelar</button>
                    <button 
                        type="button" 
                        className={method === "" ? styles["confirm-inactive"] : styles["confirm-active"]}
                    >Confirmar Venta</button>
                </div>
            </form>
        </dialog>
    )
})