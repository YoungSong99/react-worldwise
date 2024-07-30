import styles from './CityList.module.css'
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import CityItem from "./CityItem.jsx";
import {UseCities} from "../contexts/CitiesProvider.jsx";

function CityList() {
    const {cities, isLoading} = UseCities();

    if (isLoading) return <Spinner/>;

    if (!cities.length) return <Message message="Add your first city by clicking on a city on the map"/>

    return (
        <ul className={styles.cityList}>
            {cities.map((city) => (
                <CityItem city={city} key={city.id}/>
            ))}
        </ul>
    )
}

export default CityList
