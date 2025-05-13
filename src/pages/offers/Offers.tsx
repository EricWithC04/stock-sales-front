// import { NewOfferForm } from "../../components/newOfferForm/NewOfferForm"
import { useState } from "react"
import { OfferList } from "../../components/offerList/OfferList"
import styles from "./Offer.module.css"

export const OffersPage = () => {

    const [browser, setBrowser] = useState<string>("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBrowser(e.target.value)
    }

    return (
        <div className={styles["offers-container"]}>
            <h1>Ofertas Disponibles</h1>
            <p>Gestiona las ofertas disponibles</p>
            <input type="text" value={browser} onChange={handleChange} />
            <OfferList
                browser={browser}
            />
        </div>
    )
}