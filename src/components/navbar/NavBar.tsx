import React, { useState } from "react";
import { 
    ChartLineIcon,
    ChartLineGradientIcon,
    UtensilsIcon,
    UtensilsGradientIcon,
    ReceiptIcon,
    ReceiptGradientIcon,
    StockIcon,
    StockGradientIcon,
    ProductEntryIcon,
    ProductEntryGradientIcon,
    ExpiresIcon,
    ExpiresGradientIcon
} from "../../utils/icons";
import styles from "./NavBar.module.css";

interface Props {
    children: React.ReactNode
    selectPage: (id: number) => void
}

interface Pages {
    id: number
    Icon: any
    SelectedIcon: any
    title: string
    selected: boolean
}

export const NavigationBar = ({ children, selectPage }: Props) => {

    const [pages, setPages] = useState<Array<Pages>>([
        { id: 1, Icon: ChartLineIcon, SelectedIcon: ChartLineGradientIcon, title: "Estadísticas", selected: true },
        { id: 2, Icon: UtensilsIcon, SelectedIcon: UtensilsGradientIcon, title: "Menú", selected: false },
        { id: 3, Icon: ReceiptIcon, SelectedIcon: ReceiptGradientIcon, title: "Ventas", selected: false },
        { id: 4, Icon: StockIcon, SelectedIcon: StockGradientIcon, title: "Inventario", selected: false },
        { id: 5, Icon: ProductEntryIcon, SelectedIcon: ProductEntryGradientIcon, title: "Ingresos", selected: false },
        { id: 6, Icon: ExpiresIcon, SelectedIcon: ExpiresGradientIcon, title: "Vencimientos", selected: false },
    ]);

    const handleNavigate = (id: number) => {
        const newSelectedPage: Array<Pages> = pages.map(page => {
            if (page.id === id) {
                return { ...page, selected: true }
            } else {
                return { ...page, selected: false }
        }})

        setPages(newSelectedPage)
        selectPage(id)
    }

    return (
        <div className={styles["main-container"]}>
            <aside className={styles["aside-container"]}>
                <nav className={styles["navigation-options"]}>
                    {
                        pages.map(({ id, Icon, SelectedIcon, title, selected }) => (
                            <div 
                                className={`${styles["nav-option-container"]} ${selected ? styles["selected"] : ""}`}
                                onClick={() => handleNavigate(id)}
                            >
                                {
                                    selected ? (
                                        <SelectedIcon size={24} />
                                    ) : (
                                        <Icon size={24} />
                                    )
                                }
                                <p key={id} className={styles["nav-option"]}>{title}</p>
                            </div>
                        ))
                    }
                </nav>
            </aside>
            <main className={styles["main-content"]}>
                {children}
            </main>
        </div>
    )
}