import { forwardRef, useState } from "react"
import styles from "./FoodNewModal.module.css"

interface Props {
    closeModal: () => void
}

export const FoodNewModal = forwardRef<HTMLDialogElement, Props>(({ closeModal }, ref) => {

    const [ingredients, setIngredients] = useState<Array<{}>>([{}])

    const addNewIngredient = () => {
        setIngredients([...ingredients, {}])
    }

    const removeIngredient = () => {
        if (ingredients.length > 1) {
            const newIngredients = [...ingredients]
            newIngredients.pop()
            setIngredients(newIngredients)
        }
    }

    return (
        <dialog ref={ref} className={styles["food-new-modal-container"]}>
            <form className={styles["form-container"]}>
                <h2>Nueva comida</h2>
                <div className={styles["field-container"]}>
                    <label>Nombre</label>
                    <input type="text" placeholder="Ej: Hamburguesa Completa" />
                </div>
                <div className={styles["field-container"]}>
                    <div className={styles["ingredient-container-header"]}>
                        <label>Ingredientes</label>
                        <button type="button" onClick={addNewIngredient}>+ Agregar</button>
                    </div>
                    {
                        ingredients.map((_ingredient, index) => (
                            <div className={styles["ingredient-container"]} key={index}>
                                <input type="text" placeholder="Ingrediente" />
                                <input type="number" placeholder="Cantidad" />
                                <button 
                                    type="button" 
                                    className={styles["remove-ingredient"]}
                                    onClick={removeIngredient}
                                >X</button>
                            </div>
                        ))
                    }
                </div>
                <div className={styles["field-container"]}>
                    <label>Descripción</label>
                    <textarea placeholder="Ej: Carne 100g, Lechuga, Tomate y Jamón" />
                </div>
                <div className={styles["field-container"]}>
                    <label>Precio</label>
                    <input type="number" placeholder="Ej: 5000" />
                </div>
                <div className={styles["buttons-container"]}>
                    <button type="button" onClick={closeModal} className={styles["cancel-button"]}>Cancelar</button>
                    <button type="button" onClick={closeModal} className={styles["submit-button"]}>Guardar</button>
                </div>
            </form>
        </dialog>
    )
})
