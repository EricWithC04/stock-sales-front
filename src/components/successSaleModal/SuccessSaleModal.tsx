import { forwardRef, useEffect, useState } from "react"
import styles from "./SuccessSaleModal.module.css"
import DataTable from "react-data-table-component"

import { useGeneralContext } from "../../context/GeneralContext"
import { getDateString } from "../../utils/getDateString"

interface ItemResume {
    id: string
    description: string
    quantity: number
    price: number
}

interface Props {
    items: Array<ItemResume>
    closeModal: () => void
    clearItems: () => void
}

export const SuccessSaleModal = forwardRef<HTMLDialogElement, Props> (({ items, closeModal, clearItems }, ref) => {

    const { uploadNewSale } = useGeneralContext()!

    const [discount, setDiscount] = useState<number | null>(null)
    const [discountType, setDiscountType] = useState<string>("1")
    const [subtotal, setSubtotal] = useState<number>(0)
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

    useEffect(() => {
        let subtot = 0
        items.forEach(item => subtot += item.price) // Nota: solo se suma el precio por que este ya esta previamente multiplicado por la cantidad
        setSubtotal(subtot)
    }, [items])

    const handleCalculateTotal = (sub: number, dis: number | null, type: string) => {
        if (dis === null) return sub
        if (type === "1") return (sub - dis)
        else return (sub - (dis as number * (sub / 100)))
    }

    const handleChangeDiscountType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "2" && (discount as number) > 100) setDiscount(100)
        else setDiscountType(e.target.value)
    }

    const handleCloseModal = () => {
        setDiscount(null)
        setDiscountType("1")
        setSubtotal(0)
        setMethod("")
        clearItems()
        closeModal()
    }

    const handleSubmitSale = () => {
        uploadNewSale({
            date: getDateString(new Date()),
            client: "",
            payMethod: method as "Efectivo" | "Transferencia",
            products: items.map(i => ({ id: i.id, quantity: i.quantity })),
            total: handleCalculateTotal(subtotal, discount, discountType)
        })
        handleCloseModal()
    }

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
                    <h3>${subtotal}</h3>
                </div>
                <div className={styles["discount"]}>
                    <h3>Descuento:</h3>
                    <input 
                        type="number" 
                        placeholder="Cantidad" 
                        value={discount ? discount : ""} 
                        onChange={(e) => setDiscount(e.target.value ? parseFloat(e.target.value) : null)}
                    />
                    <select name="" defaultValue="1" onChange={handleChangeDiscountType}>
                        <option value="1">$</option>
                        <option value="2">%</option>
                    </select>
                </div>
                <div className={styles["total"]}>
                    <h2>Total:</h2>
                    <h2>${handleCalculateTotal(subtotal, discount, discountType)}</h2>
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
                    <button type="button" onClick={handleCloseModal}>Cancelar</button>
                    <button 
                        type="button" 
                        className={method === "" ? styles["confirm-inactive"] : styles["confirm-active"]}
                        onClick={handleSubmitSale}
                    >Confirmar Venta</button>
                </div>
            </form>
        </dialog>
    )
})