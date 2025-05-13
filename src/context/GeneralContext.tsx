import React, { useContext, createContext, useState, useEffect } from 'react'
import { getDrinks, getLotsData, getOffersData, } from '../mocks/apiMock'
import { calculateExpiresDates } from '../utils/calculateStock/getExpiresDates'

interface Props {
    children: React.ReactNode
}

interface Drink {
    id: string
    description: string
    stock: number
    price: number
}

interface Lot {
    id: number
    productId: string
    quantity: number
    expiresDate: string | null
}

interface ExpiresLot {
    product: string
    quantity: number
    expiresDate: string
}

interface Offer {
    id: string
    name: string
    products: Array<{ id: number }>
    regularPrice: number
    price: number
    available: boolean
}

interface GeneralContextProps {
    getProducts: () => Array<Drink>
    getLots: () => Array<Lot>
    getExpiresDates: () => Array<ExpiresLot>
    getOffers: () => Array<Offer>
    uploadNewProduct: (product: Drink) => void
    uploadNewLot: (lot: Lot) => void
    uploadNewOffer: (offer: Offer) => void
    updateOfferStatus: (id: string) => void
    getProductsStock: () => any
    discountProduct: () => any
}

const GeneralContext = createContext<GeneralContextProps | null>(null)

export const useGeneralContext = () => useContext(GeneralContext)

export const GeneralProvider = ({ children }: Props) => {

    const [products, setProducts] = useState<Array<Drink>>([])
    const [lots, setLots] = useState<Array<Lot>>([])
    const [offers, setOffers] = useState<Array<Offer>>([])

    // Obtener todos los productos
    const getProducts = () => {
        return products
    }

    const getLots = () => {
        return lots
    }

    const getExpiresDates = () => {
        return calculateExpiresDates(lots, 7)
    }

    const getOffers = () => {
        return offers
    }

    // Cuando se registra un nuevo producto
    const uploadNewProduct = (product: Drink) => {
        setProducts([...products, product])
    }

    // Cuando se registra un nuevo lote
    const uploadNewLot = (lot: Lot) => {
        setLots([...lots, lot])
    }

    const uploadNewOffer = (newOffer: Offer) => {
        setOffers([...offers, newOffer])
    }

    const updateOfferStatus = (id: string) => {
        const newOffers: Array<Offer> = []
        offers.forEach(offer => {
            if (offer.id === id) {
                newOffers.push({ ...offer, available: !offer.available })
            } else {
                newOffers.push(offer)
            }
        })
        setOffers(newOffers)
    }

    // Obtener listado de los productos con cantidad en stock
    const getProductsStock = () => {
        alert("Funcionalidad en desarrollo")
    }

    // Descontar la cantidad de stock priorizando las fechas de vencimiento más recientes
    const discountProduct = () => {
        alert("Funcionalidad en desarrollo")
    }

    useEffect(() => {
        getDrinks()
            .then(products => setProducts(products))
        getLotsData()
            .then(lots => setLots(lots))
        getOffersData()
            .then(offers => setOffers(offers))
    }, [])

    return (
        <GeneralContext.Provider value={{ 
            getProducts, 
            getLots, 
            getExpiresDates,
            getOffers, 
            uploadNewProduct, 
            uploadNewLot, 
            uploadNewOffer,
            updateOfferStatus,
            getProductsStock, 
            discountProduct 
        }}>
            {children}
        </GeneralContext.Provider>
    )
}
