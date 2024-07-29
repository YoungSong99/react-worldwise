import {BrowserRouter, Routes, Route} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import Homepage from "./pages/Homepage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import CityList from "./components/CityList.jsx";
import {useEffect, useState} from "react";

const BASE_URL = 'http://localhost:9000'

function App() {

    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchCities() {
            try {
                const res = await fetch(`${BASE_URL}/cities`);
                console.log(res)
                const data = await res.json();
                setCities(data);
            } catch {
                alert('There was an error loading data...');
            } finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, []);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Homepage/>}/>
                    <Route path="product" element={<Product/>}/>
                    <Route path="pricing" element={<Pricing/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="app" element={<AppLayout/>}>
                        <Route index element={<CityList cities={cities} isLoading={isLoading}/>}/>
                        <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>}/>
                        <Route path="countries" element={<p>countries</p>}/>
                        <Route path="form" element={<p>form</p>}/>
                    </Route>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
