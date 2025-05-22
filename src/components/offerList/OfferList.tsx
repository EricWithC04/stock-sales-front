import DataTable from "react-data-table-component"
import { SquarePen, Trash2 } from "lucide-react"
import styles from "./OfferList.module.css"
import { calculatePercentDiscount } from "../../utils/calculatePercentDiscount"
import { useEffect, useState } from "react"
import { normalizeText } from "../../utils/normalizeText"
import { customStyles } from "../../styles/customStylesTables"

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
    updateOffers: () => void
    offersFlag: boolean
}

export const OfferList = ({ browser, updateOffers, offersFlag }: Props) => {

    const { getOffers, updateOfferStatus } = useGeneralContext()!

    const [offers, setOffers] = useState<Array<Offer>>([])
    const [displayOffers, setDisplayOffers] = useState<Array<Offer>>([])

    const handleUpdateStatus = (row: Offer) => {
        updateOfferStatus(row.id)
        updateOffers()
    }

    const columns = [
        {
            name: "Nombre",
            cell: (row: Offer) => (
                <div className={styles["item-name"]}>
                    <span>{row.name}</span>
                </div>
            )
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
            cell: (row: Offer) => (
                <div className={styles["percent-discount"]}>
                    <span>{`${calculatePercentDiscount(row.regularPrice, row.price)}%`}</span>
                </div>
            )
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
                customStyles={customStyles}
            />
        </div>
    )
}
