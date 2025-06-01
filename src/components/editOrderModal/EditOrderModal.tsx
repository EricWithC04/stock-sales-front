import { forwardRef } from "react"
import styles from "./EditOrderModal.module.css"

interface Props {
    closeModal: () => void
}

export const EditOrderModal = forwardRef<HTMLDialogElement, Props>(({ closeModal }, ref) => {
    return (
        <dialog ref={ref} className={styles["edit-order-modal-container"]}>
            <div className={styles["data-container"]}>
                <div className={styles["buttons-container"]}>
                    <button className={styles["cancel-button"]} onClick={closeModal}>Cancelar</button>
                    <button className={styles["submit-button"]}>Guardar</button>
                </div> 
            </div>
        </dialog>
    )
})