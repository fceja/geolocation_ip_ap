import { useEffect, useState } from "react";

import "@scss/components/geolocation/Geolocation.scss";
import { executeSendEmail } from "@api/profile/ProfileApi";
import { IpDataType, LocationType } from "@appTypes/index";

const Geolocation = ({ ipData }: { ipData: IpDataType | null }) => {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location && ipData) {
      sendEmailWithLocationAndIpData(location, ipData);
    }
    setIsLoading(false);
  }, [location, ipData]);

  const sendEmailWithLocationAndIpData = async (
    location: LocationType,
    ipData: IpDataType
  ) => {
    const contactEmailMessage = `\nPOST SIGN-IN ->\n latitude: ${
      location.latitude
    }\nlongitude: ${location.longitude}\nipData:\n ${Object.entries(ipData)}`;

    try {
      executeSendEmail(contactEmailMessage);
    } catch (error) {
      console.error(error);
    }
  };

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
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <h2>IP data</h2>
          <p>IP: {`${ipData.ip}`}</p>
        </div>
      )}
      {isLoading && <div className="loading-div">...loading</div>}
    </div>
  );
};

export default Geolocation;
