import styles from "./Menu.module.css"
import { FoodList } from "../../components/foodList/FoodList";
import { CategoryList } from "../../components/categoryList/CategoryList";
import { FoodNewModal } from "../../components/foodNewModal/FoodNewModal";
import { useRef } from "react";

export const MenuPage = () => {

    const newFoodRef = useRef<HTMLDialogElement>(null)

    const openNewFoodModal = () => {
        newFoodRef.current?.showModal()
    }

    const closeNewFoodModal = () => {
        newFoodRef.current?.close()
    }

    return (
        <div className={styles["menu-container"]}>
            <FoodNewModal 
                closeModal={closeNewFoodModal}
                ref={newFoodRef}
            />
            <h1>Menú</h1>
            <div className={styles["categories-container"]}>
                <h2>Categoría</h2>
                <CategoryList></CategoryList>
            </div>
            <div className={styles["options-container"]}>
                <div className={styles["options-container-header"]}>
                    <h2>Opciónes</h2>
                    <button onClick={openNewFoodModal}>Nueva Opción</button>
                </div>
                <FoodList></FoodList>
            </div>
        </div>
    )
}