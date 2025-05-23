// import { NewOfferForm } from "../../components/newOfferForm/NewOfferForm"
import { useState, useRef } from "react"
import { OfferList } from "../../components/offerList/OfferList"
import styles from "./Offer.module.css"
import { NewOfferForm } from "../../components/offerNewForm/NewOfferForm"
import { UpdatePriceOfferModal } from "../../components/updatePriceOfferModal/UpdatePriceOfferModal"
import { OfferDeleteModal } from "../../components/offerDeleteModal/OfferDeleteModal"

interface Offer {
    id: string
    name: string
    products: Array<{ id: string }>
    regularPrice: number
    price: number
    available: boolean
}

export const OffersPage = () => {

    const newOfferRef = useRef<HTMLDialogElement>(null)
    const updateOfferRef = useRef<HTMLDialogElement>(null)
    const deleteOfferRef = useRef<HTMLDialogElement>(null)

    const [browser, setBrowser] = useState<string>("")
    const [offersFlag, setOffersFlag] = useState<boolean>(false)

    const [offerToChange, setOfferToChange] = useState<Offer | null>(null)
    const [idToDelete, setIdToDelete] = useState<string | null>(null)

    const updateOffers = () => {
        setOffersFlag(!offersFlag)
    }

    const openNewOfferModal = () => {
        newOfferRef.current?.showModal()
    }

    const closeNewOfferModal = () => {
        newOfferRef.current?.close()
    }

    const openUpdateOfferModal = (offer: Offer) => {
        setOfferToChange(offer)
        updateOfferRef.current?.showModal()
    }

    const closeUpdateOfferModal = () => {
        updateOfferRef.current?.close()
        setOfferToChange(null)
    }

    const resetUpdateOffer = () => {
        setOfferToChange(null)
    }

    const openDeleteModal = (id: string) => {
        setIdToDelete(id)
        deleteOfferRef.current?.showModal()
    }

    const closeDeleteModal = () => {
        deleteOfferRef.current?.close()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBrowser(e.target.value)
    }

    return (
        <div className={styles["offers-container"]}>
            <OfferDeleteModal
                id={idToDelete}
                ref={deleteOfferRef}
                updateOffers={updateOffers}
                closeModal={closeDeleteModal}
            />
            <UpdatePriceOfferModal
                closeModal={closeUpdateOfferModal}
                offerData={offerToChange}
                updateOffers={updateOffers}
                ref={updateOfferRef}
                resetUpdateOffer={resetUpdateOffer}
            />
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
                openUpdateOfferModal={openUpdateOfferModal}
                openDeleteOfferModal={openDeleteModal}
                offersFlag={offersFlag}
                browser={browser}
            />
        </div>
    )
}