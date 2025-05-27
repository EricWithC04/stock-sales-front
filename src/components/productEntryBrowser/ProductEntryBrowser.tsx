import { useEffect, useState } from "react"
import Autosuggest from "react-autosuggest"
import styles from "./ProductEntryBrowser.module.css"
import { normalizeText } from "../../utils/normalizeText"

import { useGeneralContext } from "../../context/GeneralContext"

interface Drink {
    id: string,
    description: string,
    stock: number,
    price: number
}

interface Ingredient {
    id: string,
    description: string
}

interface Props {
    handleSetValue: (value: string) => void
    entryFlag: boolean
}

export const ProductEntryBrowser = ({ handleSetValue, entryFlag }: Props) => {

    const { getProducts, getIngredients } = useGeneralContext()!

    const autoSuggestionTheme = {
        container: styles["auto-suggestion-container"],
        input: styles["auto-suggestion-input"],
        suggestionsContainer: styles["suggestions-container"],
        suggestion: styles['suggestion'],
        suggestionHighlighted: styles['suggestionHighlighted']
    }

    const [allProducts, setAllProducts] = useState<Array<Drink | Ingredient>>([])
    const [displayProducts, setDisplayProducts] = useState<Array<Drink | Ingredient>>([])
    const [browsedValue, setBrowsedValue] = useState<string>("")
    const [_selectedProduct, setSelectedProduct] = useState<Drink | Ingredient | null>(null)

    useEffect(() => {
        const allOptions: Array<Drink | Ingredient> = [...getProducts(), ...getIngredients()]
        setAllProducts(allOptions)
    }, [])

    useEffect(() => {
        setBrowsedValue("")
    }, [entryFlag])

    const filterProducts = (value: string) => {
        const inputValue = value.trim().toLowerCase()
        const filteredProducts = allProducts.filter(product => {
            const completeText = `${product.id} ${product.description}`
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

    const getSuggestionValue = (suggestion: Drink | Ingredient) => {
        return `${suggestion.id}`
    }

    const renderSuggestion = (suggestion: Drink | Ingredient) => {
        const isDrink = (s: Drink | Ingredient): s is Drink => {
            return (s as Drink).price !== undefined;
        };

        return (
            <div onClick={() => setSelectedProduct(suggestion)}>
                <span>{suggestion.description}</span>
                {
                    isDrink(suggestion) ? (
                        <span className={styles["price"]}>{`$${suggestion.price}`}</span>
                    ) : null
                }
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
                handleSetValue(e.target.value)
            }
        }
    }

    const onSuggestionSelected = (_e: any, { suggestion }: { suggestion: Drink | Ingredient }) => {
        handleSetValue(suggestion.id)
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
