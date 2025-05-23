import { useEffect, useState } from "react"
import Autosuggest from "react-autosuggest"
import styles from "./ProductBrowserSales.module.css"
import { getDrinks } from "../../mocks/apiMock"
import { normalizeText } from "../../utils/normalizeText"

interface Drink {
    id: string,
    description: string,
    stock: number,
    price: number
}

interface Props {
    handleIncludeItem: (id: string) => void
}

export const ProductBrowserSales = ({ handleIncludeItem }: Props) => {

    const autoSuggestionTheme = {
        container: styles["auto-suggestion-container"],
        input: styles["auto-suggestion-input"],
        suggestionsContainer: styles["suggestions-container"],
        suggestion: styles['suggestion'],
        suggestionHighlighted: styles['suggestionHighlighted']
    }

    const [allProducts, setAllProducts] = useState<Array<Drink>>([])
    const [displayProducts, setDisplayProducts] = useState<Array<Drink>>([])
    const [browsedValue, setBrowsedValue] = useState<string>("")
    const [selectedProduct, setSelectedProduct] = useState<Drink | null>(null)

    useEffect(() => {
        getDrinks()
            .then(drinks => setAllProducts(drinks))
    }, [])

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

    const getSuggestionValue = (suggestion: Drink) => {
        return `${suggestion.id}`
    }

    const renderSuggestion = (suggestion: Drink) => {
        return (
            <div onClick={() => setSelectedProduct(suggestion)}>
                <span>{suggestion.description}</span>
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

    const onSuggestionSelected = (_e: any, { suggestion }: { suggestion: Drink }) => {
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
