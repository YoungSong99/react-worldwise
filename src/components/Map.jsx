import styles from './Map.module.css';
import {useNavigate, useSearchParams} from 'react-router-dom';

function Map() {
    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    return (
        <div className={styles.mapContainer} onClick={()=>navigate("form")}>
            Map
            Positions: {lat}, {lng}
            <button
                onClick={() => {
                    setSearchParams({ lat: "23", lng: "50" });
                }}
            >
                Update Position
            </button>
        </div>
    );
}

export default Map;
