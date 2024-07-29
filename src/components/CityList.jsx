import styles from './CityList.module.css'
import Spinner from "./Spinner.jsx";
import CityItem from "./CityItem.jsx";
import PropTypes from "prop-types";
import Message from "./Message.jsx";
function CityList({cities, isLoading}) {
    if (isLoading) return <Spinner/>;

    if (!cities.length) return <Message message="Add your first city by clicking on a city on the map"/>

    return <ul className={styles.cityList}>
        {cities.map(city => <CityItem city={city} key={city.id}/>)}
    </ul>
}

CityList.propTypes = {
    cities: PropTypes.arrayOf(PropTypes.object).isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default CityList
