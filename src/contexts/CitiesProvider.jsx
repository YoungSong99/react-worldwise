import {createContext, useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";

const BASE_URL = 'http://localhost:9000'

const CitiesContext = createContext()

function CitiesProvider({children}) {
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
        <CitiesContext.Provider value={{
            cities,
            isLoading
        }}>
            {children}
        </CitiesContext.Provider>
    )
}

CitiesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

function UseCities(){
    const context = useContext(CitiesContext);
    if(context === undefined) throw new Error('CitiesContext used outside of CitiesProvider')
    return context
}


export {CitiesProvider, UseCities}
