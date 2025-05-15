import { forwardRef } from "react"
import styles from "./FoodNewModal.module.css"

interface Props {
    closeModal: () => void
}

export const FoodNewModal = forwardRef<HTMLDialogElement, Props>(({ closeModal }, ref) => {
    return (
        <dialog ref={ref}>
            <form className={styles["form-container"]}>
                <h2>Nueva comida</h2>
                <button type="button" onClick={closeModal}>Cerrar</button>
            </form>
        </dialog>
    )
})
