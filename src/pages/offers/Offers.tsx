// import { NewOfferForm } from "../../components/newOfferForm/NewOfferForm"
import { useState, useRef } from "react"
import { OfferList } from "../../components/offerList/OfferList"
import styles from "./Offer.module.css"
import { NewOfferForm } from "../../components/offerNewForm/NewOfferForm"

export const OffersPage = () => {

    const newOfferRef = useRef<HTMLDialogElement>(null)

    const [browser, setBrowser] = useState<string>("")
    const [offersFlag, setOffersFlag] = useState<boolean>(false)

    const updateOffers = () => {
        setOffersFlag(!offersFlag)
    }

    const openNewOfferModal = () => {
        newOfferRef.current?.showModal()
    }

    const closeNewOfferModal = () => {
        newOfferRef.current?.close()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBrowser(e.target.value)
    }

    return (
        <div className={styles["offers-container"]}>
            <NewOfferForm
                closeModal={closeNewOfferModal}
                updateOffers={updateOffers}
                ref={newOfferRef}
            />
            <h1>Ofertas Disponibles</h1>
            <p>Gestiona las ofertas disponibles</p>
            <div className={styles["action-container"]}>
                <input type="text" value={browser} onChange={handleChange} placeholder="Nombre de la oferta" />
                <button
                    className={styles["new-offer-button"]}
                    onClick={openNewOfferModal}
                >Nueva Oferta</button>
            </div>
            <OfferList
                updateOffers={updateOffers}
                offersFlag={offersFlag}
                browser={browser}
            />
        </div>
    )
}