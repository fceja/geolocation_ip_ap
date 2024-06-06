import { useEffect, useState } from "react";

import "@scss/components/IpInfo.scss"
import { fetchIpInfoApiData, IpDataT } from "@api/ipInfo/IpInfoApi";
import Loading from "@/ts/common/components/Loading";

const IpInfo = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [ipData, setIpData] = useState<IpDataT | null>(null);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchApiData = async () => {
            try {
                const response = await fetchIpInfoApiData();
                setIpData(response);
            } catch (error) {
                console.error(error);
                setIsError(true)

            } finally {

                setIsLoading(false)
            }
        };
        fetchApiData();
    }, []);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setIsError(true);
            setIsLoading(false);
        }, 15000)

        return () => clearTimeout(timerId)
    }, [])

    return (
        <div className="ip-data mt-5 p-3">
            <h2>IP Info</h2>
            <hr style={{ color: "black", borderWidth: "1px" }}></hr>
            {isLoading && <Loading className="ip-data" />}
            {isError &&
                <div className="error">Error:<br />IP data is not available.<br />Daily limit reached?</div>
            }
            {ipData &&
                <span className="d-flex flex-column align-items-center">
                    <p>IP: {`${ipData.ip}`}</p>
                    <p>Country: {`${ipData.country}`}</p>
                    <p>City: {`${ipData.city}`}</p>
                    <p>region: {`${ipData.region}`}</p>
                </span>
            }
        </div>
    )
}
export default IpInfo