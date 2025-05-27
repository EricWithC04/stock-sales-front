import { useEffect, useState } from 'react'
import './App.css'
import { NavigationBar } from './components/navbar/NavBar'
import { MenuPage } from './pages/menu/Menu'
import { StockPage } from './pages/stock/Stock'
import { ProductsEntryPage } from './pages/productsEntry/ProductsEntry'
import { ExpiresPage } from './pages/expires/Expires'
import { SalesPage } from './pages/sales/Sales'
import { OffersPage } from './pages/offers/Offers'

function App() {

    const [selectedPage, setSelectedPage] = useState<number>(2)

    const [loading, setLoading] = useState<boolean>(true)

    const selectPage = (id: number) => {
        setSelectedPage(id)
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }, [])

    return (
        <>
            {
                loading ? (
                    <div>Cargando...</div>
                ) : (
                    <NavigationBar selectPage={selectPage} >
                        {
                            selectedPage === 2 ? (
                                <MenuPage></MenuPage>
                            ) : selectedPage === 3 ? (
                                <SalesPage></SalesPage>
                            ) : selectedPage === 4 ? (
                                <StockPage></StockPage>
                            ) : selectedPage === 5 ? (
                                <ProductsEntryPage></ProductsEntryPage>
                            ) : selectedPage === 6 ? (
                                <OffersPage></OffersPage>
                            ) : selectedPage === 7 ? (
                                <ExpiresPage></ExpiresPage>
                            ) : <h1>Pagina no disponible</h1>
                        }
                    </NavigationBar>
                )
            }
        </>
    )
}

export default App
