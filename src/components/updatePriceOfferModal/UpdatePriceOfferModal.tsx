import { forwardRef, useEffect, useState } from "react"
import styles from "./UpdatePriceOfferModal.module.css"

import { useGeneralContext } from "../../context/GeneralContext"

interface Offer {
    id: string
    name: string
    products: Array<{ id: string }>
    regularPrice: number
    price: number
    available: boolean
}

interface Props {
    offerData: Offer | null
    closeModal: () => void
    resetUpdateOffer: () => void
    updateOffers: () => void
}

export const UpdatePriceOfferModal = forwardRef<HTMLDialogElement, Props>(({ 
    offerData, 
    closeModal, 
    resetUpdateOffer,
    updateOffers }, ref) => {

    const { updateOfferPrice } = useGeneralContext()!

    const [currentPrice, setCurrentPrice] = useState<string | null>(null)

    const handleSubmit = () => {
        if (offerData) {
            updateOfferPrice(offerData.id, parseInt(currentPrice!))
            resetUpdateOffer()
            updateOffers()
            closeModal()
        }
    }

    useEffect(() => {
        setCurrentPrice(offerData ? offerData.price.toString() : null)
    }, [offerData])

    return (
        <dialog ref={ref} className={styles["update-price-offer-modal-container"]}>
            <form className={styles["update-price-offer-modal"]}>
                <h2>Cambiar precio de oferta</h2>
                <div className={styles["fields-container"]}>
                    <input type="number" onChange={(e) => setCurrentPrice(e.target.value)} value={currentPrice!} placeholder="Precio" />
                </div>
                <div className={styles["buttons-container"]}>
                    <button type="button" onClick={closeModal} className={styles["cancel-button"]}>Cancelar</button>
                    <button type="button" onClick={handleSubmit} className={styles["update-button"]}>Actualizar</button>
                </div>
            </form>
        </dialog>
    )
})