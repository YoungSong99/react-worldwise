import {createContext, useContext, useEffect, useState} from "react";

const BASE_URL = 'http://localhost:9000'

const CitiesContext = createContext()

function CitiesProvider({children}) {
    const [cities, setCities] = useState([])
    const [currentCity, setCurrentCity] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchCities() {
            try {
                const res = await fetch(`${BASE_URL}/cities`);
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

    async function getCity(id) {
        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data);
        } catch {
            alert('There was an error loading data...');
        } finally {
            setIsLoading(false);
        }
    }

    async function createCity(newCity) {
        try {
            const res = await fetch(`${BASE_URL}/cities`, {
             method: 'POST',
             body: JSON.stringify(newCity),
             header: {
             "Content-Type": "application/json",
             },
            });
            const data = await res.json();
            setCities(cities=> [...cities, data])
        } catch {
            alert('There was an error loading data...');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            currentCity,
            getCity,
            createCity,
        }}>
            {children}
        </CitiesContext.Provider>
    )
}


function UseCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error('CitiesContext used outside of CitiesProvider')
    return context
}


export {CitiesProvider, UseCities}
