import { useEffect, useState } from "react";

import "@scss/components/GeoCoordinates.scss"
import Loading from "@/ts/common/components/Loading";

type LocationType = {
    latitude: number;
    longitude: number;
};

const isBlurred = process.env.REACT_APP_IS_SENSITIVE === "true" ? true : false

const GeoCoordinates = () => {
    const [location, setLocation] = useState<LocationType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        try {
            if (!("geolocation" in navigator)) throw new Error('Browser does not support geo-location')

            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setLocation({ latitude, longitude });
                setIsLoading(false);
            },
                () => { throw new Error('Error retrieving geo data.') }
            );

        } catch (error) {
            console.error(error)
            setIsError(true);
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="geo-coords mt-5 p-3">
            <h2>Geo-Coordinates</h2>
            <hr style={{ color: "black", borderWidth: "1px" }}></hr>
            {isLoading && <Loading className="geo-coords" />}
            {isError &&
                <div className="error">Error:<br />Geolocation is not available for this browser.<br />Try the latest Chrome browser?</div>
            }
            {location && (
                <span className="d-flex flex-column align-items-center">
                    <div>
                        <span className="title">Latitude:</span>
                        <span className={`${isBlurred ? "blur-overlay" : ""}`}>{location.latitude}</span>
                    </div>
                    <div>
                        <span className="title">Longitude:</span>
                        <span className={`${isBlurred ? "blur-overlay" : ""}`}>{location.longitude}</span>
                    </div>
                </span>
            )}
        </div>
    );
};

export default GeoCoordinates;
