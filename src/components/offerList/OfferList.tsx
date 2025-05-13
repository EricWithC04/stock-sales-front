import DataTable from "react-data-table-component"
import { SquarePen, Trash2 } from "lucide-react"
import styles from "./OfferList.module.css"
import { calculatePercentDiscount } from "../../utils/calculatePercentDiscount"
import { useEffect, useState } from "react"
import { normalizeText } from "../../utils/normalizeText"

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
    browser: string
}

export const OfferList = ({ browser }: Props) => {

    const { getOffers, updateOfferStatus } = useGeneralContext()!

    const [offers, setOffers] = useState<Array<Offer>>([])
    const [displayOffers, setDisplayOffers] = useState<Array<Offer>>([])
    const [offersFlag, setOffersFlag] = useState<boolean>(false)

    const handleUpdateStatus = (row: Offer) => {
        updateOfferStatus(row.id)
        setOffersFlag(!offersFlag)
    }

    const columns = [
        {
            name: "Nombre",
            selector: (row: Offer) => row.name
        },
        {
            name: "Productos",
            selector: (row: Offer) => row.products.length
        },
        {
            name: "Precio Regular",
            selector: (row: Offer) => row.regularPrice
        },
        {
            name: "Precio Oferta",
            selector: (row: Offer) => row.price
        },
        {
            name: "Descuento",
            selector: (row: Offer) => `${calculatePercentDiscount(row.regularPrice, row.price)}%`
        },
        {
            name: "Estado",
            cell: (row: Offer) => (
                <div
                    onClick={() => handleUpdateStatus(row)}
                    className={`${styles["offer-status"]} ${row.available ? styles["active"] : styles["inactive"]}`}
                >
                    <span>{row.available ? "Disponible" : "Inactivo"}</span>
                </div>
            )
        },
        {
            name: "Acciones",
            cell: (_row: Offer) => (
                <div className={styles["actions-container"]}>
                    <div className={styles["action"]}>
                        <SquarePen color="#000" />
                    </div>
                    <div className={styles["action"]}>
                        <Trash2 color="red"/>
                    </div>
                </div>
            )
        },
    ]

    useEffect(() => {
        setOffers(getOffers())
    }, [offersFlag])

    useEffect(() => {
        if (browser.length) {
            const browsedOffers: Array<Offer> = []
            offers.forEach(offer => {
                if (normalizeText(offer.name).includes(normalizeText(browser))) {
                    browsedOffers.push(offer)
                }
            })
            setDisplayOffers(browsedOffers)
        } else {
            setDisplayOffers(offers)
        }
    }, [browser, offers])
    
    return (
        <div className={styles["offer-list-container"]}>
            <DataTable
                columns={columns}
                data={displayOffers}
            />
        </div>
    )
}
