import { forwardRef, useState } from "react"
import styles from "./FoodNewModal.module.css"

import { useGeneralContext } from "../../context/GeneralContext"
import { IngredientBrowser } from "./browser/IngredientBrowser"

interface FoodData {
    name: string
    category: string
    description: string
    price: number
}

interface Ingredient {
    uid: number
    id: string
    quantity: number
}

interface Props {
    closeModal: () => void
    changeFoods: () => void
}

export const FoodNewModal = forwardRef<HTMLDialogElement, Props>(({ closeModal, changeFoods }, ref) => {

    const { uploadNewFood, getFoods, getCategories } = useGeneralContext()!

    const [data, setData] = useState<FoodData>({
        name: "",
        category: "",
        description: "",
        price: 0
    })
    const [ingredients, setIngredients] = useState<Array<Ingredient>>([{ uid: 1, id: "", quantity: 0 }])
    const [ingredientFlag, setIngredientFlag] = useState<boolean>(false)

    const changeIngredientFlag = () => {
        setIngredientFlag(!ingredientFlag)
    }

    const addNewIngredient = () => {
        setIngredients([...ingredients, { uid: ingredients[ingredients.length-1].uid+1, id: "", quantity: 0 }])
    }

    const removeIngredient = (uid: number) => {
        if (ingredients.length > 1) {
            const newIngredients: Array<Ingredient> = ingredients.filter((i) => i.uid !== uid)
            setIngredients(newIngredients)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeIngredient = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let newIngredients: Array<Ingredient> = [...ingredients]
        newIngredients[index] = {
            ...newIngredients[index],
            [e.target.name]: e.target.value
        }
        setIngredients(newIngredients)
    }

    const handleSubmit = () => {
        const newIngredients = ingredients.map(i => ({ id: i.id, quantity: i.quantity }))
        const newFood = {
            id: (getFoods().length+1).toString(),
            name: data.name,
            description: data.description,
            price: data.price,
            ingredients: newIngredients,
            category: data.category
        }
        setData({
            name: "",
            category: "",
            description: "",
            price: 0
        })
        setIngredients([{ uid: 1, id: "", quantity: 0 }])
        uploadNewFood(newFood)
        changeFoods()
        changeIngredientFlag()
        closeModal()
    }

    const handleCloseModal = () => {
        setData({ name: "", category: "", description: "", price: 0 })
        setIngredients([{ uid: 1, id: "", quantity: 0 }])
        changeIngredientFlag()
        closeModal()
    }

    return (
        <dialog ref={ref} className={styles["food-new-modal-container"]}>
            <form className={styles["form-container"]}>
                <h2>Nueva comida</h2>
                <div className={styles["field-container"]}>
                    <label>Nombre</label>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Ej: Hamburguesa Completa" 
                        onChange={handleChange}
                        value={data.name}
                    />
                </div>
                <div className={styles["field-container"]}>
                    <label>Categoría</label>
                    <select name="category" onChange={handleChange} defaultValue={""}>
                        <option value="">Seleccionar</option>
                        {
                            getCategories().map((category) => (
                                <option value={category.name}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={styles["field-container"]}>
                    <div className={styles["ingredient-container-header"]}>
                        <label>Ingredientes</label>
                        <button type="button" onClick={addNewIngredient}>+ Agregar</button>
                    </div>
                    {
                        ingredients.map((ingredient, index) => (
                            <div className={styles["ingredient-container"]} key={index}>
                                <IngredientBrowser 
                                    indexIngredient={index}
                                    ingredientFlag={ingredientFlag}
                                    handleSetValue={(id: string, index: number) => 
                                        handleChangeIngredient({ 
                                                target: { name: "id", value: id } 
                                            } as React.ChangeEvent<HTMLInputElement>, 
                                            index)
                                    }
                                />
                                <input 
                                    type="number"
                                    name="quantity" 
                                    placeholder="Cantidad"
                                    value={ingredients[index].quantity}
                                    onChange={(e) => handleChangeIngredient(e, index)}
                                />
                                <button 
                                    type="button" 
                                    className={styles["remove-ingredient"]}
                                    onClick={() => removeIngredient(ingredient.uid)}
                                >X</button>
                            </div>
                        ))
                    }
                </div>
                <div className={styles["field-container"]}>
                    <label>Descripción</label>
                    <textarea 
                        name="description" 
                        placeholder="Ej: Carne 100g, Lechuga, Tomate y Jamón" 
                        onChange={handleChange}
                        value={data.description}
                    />
                </div>
                <div className={styles["field-container"]}>
                    <label>Precio</label>
                    <input type="number" value={data.price} name="price" placeholder="Ej: 5000" onChange={handleChange}/>
                </div>
                <div className={styles["buttons-container"]}>
                    <button type="button" onClick={handleCloseModal} className={styles["cancel-button"]}>Cancelar</button>
                    <button type="button" onClick={handleSubmit} className={styles["submit-button"]}>Guardar</button>
                </div>
            </form>
        </dialog>
    )
})
