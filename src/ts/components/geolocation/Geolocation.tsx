import { useEffect, useState } from "react";

import "@scss/components/geolocation/Geolocation.scss";
import { fetchIpInfoApiData } from "@api/ipInfo/IpInfoApi";
import { IpDataType, LocationType } from "@appTypes/index";

const Geolocation = () => {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ipData, setIpData] = useState<IpDataType | null>(null);

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await fetchIpInfoApiData();
        setIpData(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchApiData();
  }, []);

  useEffect(() => {
    if (location) {
      setIsLoading(false);
    }
  }, [location]);

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation({ latitude, longitude });
      });
    } else {
      console.log("Geolocation is not available in this browser.");
    }
  };

  return (
    <div className="main-container">
      <button className="btn-geolocate" onClick={handleGetLocation}>
        Get My Location
      </button>
      {location && ipData && (
        <div className="coords">
          <h2>Coordinates</h2>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <br />
          <h2>IP data</h2>
          <p>IP: {`${ipData.ip}`}</p>
          <p>Country: {`${ipData.country}`}</p>
          <p>City: {`${ipData.city}`}</p>
          <p>region: {`${ipData.region}`}</p>
        </div>
      )}
      {isLoading && <div className="loading-div">...loading</div>}
    </div>
  );
};

export default Geolocation;
