import { useEffect, useState } from "react"
import Autosuggest from "react-autosuggest"
import styles from "./Browser.module.css"
import { normalizeText } from "../../../utils/normalizeText"

import { useGeneralContext } from "../../../context/GeneralContext"

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

interface Props {
    handleIncludeItem: (product: Drink | Food) => void
}

export const ProductBrowserOffer = ({ handleIncludeItem }: Props) => {

    const { getProducts, getFoods } = useGeneralContext()!

    
    const [allProducts, setAllProducts] = useState<Array<Drink | Food>>([])
    const [displayProducts, setDisplayProducts] = useState<Array<Drink | Food>>([])
    const [browsedValue, setBrowsedValue] = useState<string>("")
    const [selectedProduct, setSelectedProduct] = useState<Drink | Food | null>(null)
    
    const autoSuggestionTheme = {
        container: styles["auto-suggestion-container"],
        input: styles["auto-suggestion-input"],
        suggestionsContainer: `${styles["suggestions-container"]} ${displayProducts.length ? styles["open"] : ""}`,
        suggestion: styles['suggestion'],
        suggestionHighlighted: styles['suggestionHighlighted']
    }

    useEffect(() => {
        setAllProducts([...getProducts(), ...getFoods()])
    }, [])

    const filterProducts = (value: string) => {
        const inputValue = value.trim().toLowerCase()
        const filteredProducts = allProducts.filter(product => {
            const completeText = `${product.id} ${
                product.type === "Bebida" ? 
                (product as Drink).description : 
                (product as Food).name
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

    const getSuggestionValue = (suggestion: Drink | Food) => {
        return `${suggestion.id}`
    }

    const renderSuggestion = (suggestion: Drink | Food) => {
        return (
            <div onClick={() => setSelectedProduct(suggestion)}>
                <span>
                    {
                        suggestion.type === "Bebida" ? 
                        (suggestion as Drink).description : 
                        (suggestion as Food).name
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
                handleIncludeItem(selectedProduct!)
                setBrowsedValue("")
            }
        }
    }

    const onSuggestionSelected = (_e: any, { suggestion }: { suggestion: Drink | Food}) => {
        handleIncludeItem(suggestion)
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
