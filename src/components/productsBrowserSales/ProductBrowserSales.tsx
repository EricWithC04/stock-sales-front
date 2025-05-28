import { useEffect, useState } from "react"
import Autosuggest from "react-autosuggest"
import styles from "./ProductBrowserSales.module.css"
import { normalizeText } from "../../utils/normalizeText"

import { useGeneralContext } from "../../context/GeneralContext"

interface Drink {
    id: string,
    description: string,
    type?: string
    stock: number,
    price: number
}

interface Food {
    id: string
    name: string
    description: string
    type?: string
    category: string
    ingredients: Array<{ id: string, quantity: number }>
    price: number
}

interface Offer {
    id: string
    name: string
    type?: string
    products: Array<{ id: string }>
    regularPrice: number
    price: number
    available: boolean
}

interface Props {
    handleIncludeItem: (id: string) => void
}

export const ProductBrowserSales = ({ handleIncludeItem }: Props) => {

    const { getProducts, getFoods, getOffers } = useGeneralContext()!

    const autoSuggestionTheme = {
        container: styles["auto-suggestion-container"],
        input: styles["auto-suggestion-input"],
        suggestionsContainer: styles["suggestions-container"],
        suggestion: styles['suggestion'],
        suggestionHighlighted: styles['suggestionHighlighted']
    }

    const [allProducts, setAllProducts] = useState<Array<Drink | Food | Offer>>([])
    const [displayProducts, setDisplayProducts] = useState<Array<Drink | Food | Offer>>([])
    const [browsedValue, setBrowsedValue] = useState<string>("")
    const [_selectedProduct, setSelectedProduct] = useState<Drink | Food | Offer | null>(null)

    useEffect(() => {
        setAllProducts([...getProducts(), ...getFoods(), ...getOffers()])
    }, [])

    const filterProducts = (value: string) => {
        const inputValue = value.trim().toLowerCase()
        const filteredProducts = allProducts.filter(product => {
            const completeText = `${product.id} ${
                product.type === "Bebida" ? 
                (product as Drink).description : 
                (product as Food | Offer).name
            }`
            if (normalizeText(completeText).includes(normalizeText(inputValue))) return product
        })

        return filteredProducts.length ? filteredProducts : []
    }

    const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
        setDisplayProducts(filterProducts(value))
    }

    const onSuggestionsClearRequested = () => {
        setDisplayProducts([])
    }

    const getSuggestionValue = (suggestion: Drink | Food | Offer) => {
        return `${suggestion.id}`
    }

    const renderSuggestion = (suggestion: Drink | Food | Offer) => {
        return (
            <div onClick={() => setSelectedProduct(suggestion)}>
                <span>
                    {
                        suggestion.type === "Bebida" ? 
                        (suggestion as Drink).description : 
                        (suggestion as Food | Offer).name
                    }
                </span>
                <span className={styles["price"]}>{`$${suggestion.price}`}</span>
            </div>
        )
    }

    const handleInputChange = (_e: any, { newValue }: { newValue: string }) => {
        setBrowsedValue(newValue)
    }

    const inputProps = {
        placeholder: "Buscar...",
        className: styles["browser"],
        value: browsedValue,
        onChange: handleInputChange,
        onKeyDown: (e: any) => {
            if (e.key === "Enter") {
                handleIncludeItem(e.target.value)
                setBrowsedValue("")
            }
        }
    }

    const onSuggestionSelected = (_e: any, { suggestion }: { suggestion: Drink | Food | Offer }) => {
        handleIncludeItem(suggestion.id)
        setBrowsedValue("")
    }

    return (
        <Autosuggest 
            suggestions={displayProducts}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={onSuggestionSelected}
            theme={autoSuggestionTheme}
        />
    )
}
