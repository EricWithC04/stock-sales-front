import { forwardRef } from "react"
import styles from "./OfferDeleteModal.module.css"

import { useGeneralContext } from "../../context/GeneralContext"

interface Props {
    closeModal: () => void
    id: string | null
    updateOffers: () => void
}

export const OfferDeleteModal = forwardRef<HTMLDialogElement, Props>(({ closeModal, updateOffers, id }, ref) => {

    const { deleteOffer } = useGeneralContext()!

    const handleDeleteOffer = (idOffer: string | null) => {
        if (idOffer) {
            deleteOffer(idOffer)
            updateOffers()
            closeModal()
        }
    }

    return (
        <dialog ref={ref} className={styles["offer-delete-modal-container"]}>
            <div className={styles["data-container"]}>
                <h2>¿Estás seguro de que quieres eliminar esta oferta?</h2>
                <div className={styles["buttons-container"]}>
                    <button type="button" className={styles["cancel-button"]} onClick={closeModal}>Cancelar</button>
                    <button type="button" className={styles["delete-button"]} onClick={() => handleDeleteOffer(id)}>Eliminar</button>
                </div>
            </div>
        </dialog>
    )
})
