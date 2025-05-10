import styles from "./Menu.module.css"
import { FoodList } from "../../components/foodList/FoodList";
import { CategoryList } from "../../components/categoryList/CategoryList";

export const MenuPage = () => {
    return (
        <div className={styles["menu-container"]}>
            <h1>Menú</h1>
            <div className={styles["categories-container"]}>
                <h2>Categoría</h2>
                <CategoryList></CategoryList>
            </div>
            <div className={styles["options-container"]}>
                <h2>Opciónes</h2>
                <FoodList></FoodList>
            </div>
        </div>
    )
}