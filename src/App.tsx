import { useEffect, useState } from 'react'
import './App.css'
import { NavigationBar } from './components/navbar/NavBar'
import { MenuPage } from './pages/menu/Menu'
import { StockPage } from './pages/stock/Stock'
import { ProductsEntryPage } from './pages/productsEntry/ProductsEntry'
import { ExpiresPage } from './pages/expires/Expires'
import { SalesPage } from './pages/sales/Sales'
import { OffersPage } from './pages/offers/Offers'
import { Loading } from './pages/loading/Loading'
import { MobileNotSupported } from './pages/mobileNotSupported/MobileNotSupported'
import { TablesPage } from './pages/tables/Tables'

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
                window.innerHeight > window.innerWidth ? (
                    <MobileNotSupported></MobileNotSupported>
                ) :
                loading ? (
                    <Loading></Loading>
                ) : (
                    <NavigationBar selectPage={selectPage} >
                        {
                            selectedPage === 2 ? (
                                <MenuPage></MenuPage>
                            ) : selectedPage === 3 ? (
                                <TablesPage></TablesPage>
                            ) : selectedPage === 4 ? (
                                <SalesPage></SalesPage>
                            ) : selectedPage === 5 ? (
                                <StockPage></StockPage>
                            ) : selectedPage === 6 ? (
                                <ProductsEntryPage></ProductsEntryPage>
                            ) : selectedPage === 7 ? (
                                <OffersPage></OffersPage>
                            ) : selectedPage === 8 ? (
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
