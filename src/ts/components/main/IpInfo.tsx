import { useEffect, useState } from "react";

import "@scss/components/IpInfo.scss"
import { fetchIpInfoApiData, IpDataT } from "@api/ipInfo/IpInfoApi";
import Loading from "@/ts/common/components/Loading";


const isBlurred = process.env.REACT_APP_IS_SENSITIVE === "true" ? true : false

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

    return (
        <div className="ip-data-container m-5 p-3">
            <h2>IP Info</h2>
            <hr style={{ color: "black", borderWidth: "1px" }}></hr>
            {isLoading && <Loading className="ip-data" />}
            {isError &&
                <div className="error">Error:<br />IP data is not available.<br />Daily limit reached?</div>
            }
            {ipData &&
                <div className="ip-data">
                    <div>
                        <span className="title">IP:</span>
                        <span className={`${isBlurred ? "blur-overlay" : ""}`}><span>{`${ipData.ip}`}</span></span>
                    </div>
                    <div>
                        <span className="title">Country:</span>
                        <span>{`${ipData.country}`}</span>
                    </div>
                    <div>
                        <span className="title">City:</span>
                        <span className={`${isBlurred ? "blur-overlay" : ""}`}><span>{`${ipData.city}`}</span></span>
                    </div>
                    <div>
                        <span className="title">Region:</span>
                        <span className=""><span>{`${ipData.region}`}</span></span>
                    </div>
                </div>
            }
        </div>
    )
}
export default IpInfo