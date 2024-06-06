import { useEffect, useState } from "react";

import "@scss/components/GeoCoordinates.scss"
import Loading from "@/ts/common/components/Loading";

type LocationType = {
    latitude: number;
    longitude: number;
};

const GeoCoordinates = () => {
    const [location, setLocation] = useState<LocationType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    setLocation({ latitude, longitude });
                    setIsLoading(false);
                },
                () => {
                    setIsError(true);
                    setIsLoading(false);
                }
            );
        } else {
            setIsError(true);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setIsError(true);
            setIsLoading(false);
        }, 30000)

        return () => clearTimeout(timerId)
    }, [])

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
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                </span>
            )}
        </div>
    );
};

export default GeoCoordinates;
