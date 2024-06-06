import { useEffect, useState } from "react";

import { useAuth } from "@context/AuthContext";
import "@scss/components/geolocation/Geolocation.scss";
import { fetchIpInfoApiData, IpDataT } from "@api/ipInfo/IpInfoApi";
import Loading from "@components/loading/Loading";

type LocationType = {
  latitude: number;
  longitude: number;
};

const Geolocation = () => {
  const { isAuthd } = useAuth();
  const [location, setLocation] = useState<LocationType | null>(null);
  const [ipData, setIpData] = useState<IpDataT | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthd) {
      const fetchApiData = async () => {
        try {
          const response = await fetchIpInfoApiData();
          setIpData(response);
        } catch (error) {
          console.error(error);
        }
      };
      fetchApiData();
    }
  }, [isAuthd]);

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
      alert("Geolocation is not available for this browser. Try Google Chrome?");
    }
  };

  return (
    <div className="main-container">
      <button className="btn-geolocate" onClick={handleGetLocation}>
        Get My Location
      </button>
      {location && ipData && (
        <div className="coords mt-5">
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
      {isLoading && <Loading />}
    </div>
  );
};

export default Geolocation;
