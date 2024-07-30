/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-empty */

import {useEffect, useState} from "react";
import styles from "./Form.module.css";
import Button from "./Button.jsx";
import BackButton from "./BackButton.jsx";
import {useUrlLocation} from "../hooks/useUrlLocation.js";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {UseCities} from "../contexts/CitiesProvider.jsx";
import {useNavigate} from "react-router-dom";


export function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

function Form() {
    const [lat, lng] = useUrlLocation();
    const {createCity, isLoading} = UseCities()
    const navigate = useNavigate();
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    const [countryName, setCountryName] = useState(""); // Add state for country name
    const [cityName, setCityName] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [emoji, setEmoji] = useState("")
    const [geoodingError, setgeocodingError] = useState("")

    useEffect(() => {

        if(!lat && !lng) return;
        async function fetchCityData() {
            try{
                setIsLoadingGeocoding(true);
                setgeocodingError('')
                const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
                const data = await res.json();
                console.log(data);

                if(!data.countryCode) throw new Error(
                    "That doesn't seem to be a city. Click somewhere else😉"
                )

                setCityName(data.cityName|| data.locality || "");
                setCountryName(data.countryName || "");
                setEmoji(convertToEmoji(data.countryCode))
            }catch (err) {
                setgeocodingError(err.message)
            }finally {
                setIsLoadingGeocoding(false);
            }
        }
        fetchCityData();
    }, [lat, lng]);

    async function handelSubmit(e){
        e.preventDefault()
        if(!cityName || !date) return

        const newCity={
            cityName,
            countryName,
            emoji,
            date,
            notes,
            position: {lat, lng}
        }
        await createCity(newCity)
        navigate('/app/cities')
    }



    if(isLoadingGeocoding) return <Spinner/>
    if(!lat && !lng) return <Message message=' Start by clicking on the map'/>
    if(geoodingError) return <Message message={geoodingError}/>

    return (
        <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handelSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <DatePicker onChange={(date) => setDate(date)} selected={date} dateFormat='MM/dd/yyyy'/>
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type='primary'>Add</Button>
                <BackButton/>
            </div>
        </form>
    );
}

export default Form;
