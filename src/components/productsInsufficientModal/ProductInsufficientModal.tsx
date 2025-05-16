import { forwardRef } from "react"
import styles from "./ProductInsufficientModal.module.css"

interface Props {
    closeModal: () => void
}

export const ProductInsufficientModal = forwardRef<HTMLDialogElement, Props>(({ closeModal }, ref) => {
    return (
        <dialog ref={ref} className={styles["product-insufficient-modal-container"]}>
            <div className={styles["data-container"]}>
                <h2>Stock Insuficiente</h2>
                <p>No hay suficiente stock de alguno de los productos, por favor, revise y vuelva a registrar la venta</p>
                <div className={styles["buttons-container"]}>
                    <button onClick={closeModal} className={styles["accept-button"]}>Aceptar</button>
                </div>
            </div>
        </dialog>
    )
})