import { forwardRef } from "react"
import styles from "./StockProductModal.module.css"

interface Props {
    closeModal: () => void
    openNewProductModal: () => void
}

export const StockProductModal = forwardRef<HTMLDialogElement, Props>(({ closeModal, openNewProductModal }, ref) => {

    const handleNewProduct = () => {
        closeModal()
        openNewProductModal()
    }

    return (
        <dialog ref={ref} className={styles["stock-product-modal-container"]}>
            <div className={styles["data-container"]}>
                <h2>Producto no encontrado</h2>
                <p>El producto no se encuentra registrado en el sistema, ¿desea registrarlo manualmente?</p>
                <div className={styles["buttons-container"]}>
                    <button onClick={closeModal} className={styles["no-button"]}>No</button>
                    <button onClick={handleNewProduct} className={styles["yes-button"]}>Si, agregar al inventario</button>
                </div>
            </div>
        </dialog>
    )
})
