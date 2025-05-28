import { useEffect, useState } from "react"
import Autosuggest from "react-autosuggest"
import styles from "./IngredientBrowser.module.css"
import { normalizeText } from "../../../utils/normalizeText"

import { useGeneralContext } from "../../../context/GeneralContext"

interface Ingredient {
    id: string,
    description: string
}

interface Props {
    handleSetValue: (value: string, index: number) => void
    indexIngredient: number
    ingredientFlag: boolean
}

export const IngredientBrowser = ({ handleSetValue, indexIngredient, ingredientFlag }: Props) => {

    const { getIngredients } = useGeneralContext()!
    
    const [allIngredients, setAllIngredients] = useState<Array<Ingredient>>([])
    const [displayIngredients, setDisplayIngredients] = useState<Array<Ingredient>>([])
    const [browsedValue, setBrowsedValue] = useState<string>("")
    const [_selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null)
    
    const autoSuggestionTheme = {
        container: styles["auto-suggestion-container"],
        input: styles["auto-suggestion-input"],
        suggestionsContainer: `${styles["suggestions-container"]} ${displayIngredients.length ? styles["open"] : ""}`,
        suggestion: styles['suggestion'],
        suggestionHighlighted: styles['suggestionHighlighted']
    }

    useEffect(() => {
        const allOptions: Array<Ingredient> = [...getIngredients()]
        setAllIngredients(allOptions)
    }, [])

    useEffect(() => {
        setBrowsedValue("")
    }, [ingredientFlag])

    const filterIngredients = (value: string) => {
        const inputValue = value.trim().toLowerCase()
        const filteredIngredients = allIngredients.filter(ingredient => {
            const completeText = `${ingredient.id} ${ingredient.description}`
            if (normalizeText(completeText).includes(normalizeText(inputValue))) return ingredient
        })

        return filteredIngredients.length ? filteredIngredients : []
    }

    const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
        setDisplayIngredients(filterIngredients(value))
    }

    const onSuggestionsClearRequested = () => {
        setDisplayIngredients([])
    }

    const getSuggestionValue = (suggestion: Ingredient) => {
        return `${suggestion.id}`
    }

    const renderSuggestion = (suggestion: Ingredient) => {
        return (
            <div onClick={() => setSelectedIngredient(suggestion)}>
                <span>{suggestion.description}</span>
            </div>
        )
    }

    const handleInputChange = (_e: any, { newValue }: { newValue: string }) => {
        setBrowsedValue(newValue)
    }

    const inputProps = {
        placeholder: "Buscar Ingrediente...",
        className: styles["browser"],
        value: browsedValue,
        onChange: handleInputChange,
        onKeyDown: (e: any) => {
            if (e.key === "Enter") {
                handleSetValue(e.target.value, indexIngredient)
            }
        }
    }

    const onSuggestionSelected = (_e: any, { suggestion }: { suggestion: Ingredient }) => {
        handleSetValue(suggestion.id, indexIngredient)
    }

    return (
        <Autosuggest 
            suggestions={displayIngredients}
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