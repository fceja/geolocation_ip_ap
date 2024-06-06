import { useAuth } from "@context/AuthContext";
import Geolocation from "@/ts/components/main/Geolocation";
import LoginForm from "@/ts/components/main/LoginForm";

export const MainPage = () => {
    const { isAuthd } = useAuth();

    return (
        <>
            {!isAuthd ? <LoginForm /> : <Geolocation />}
        </>
    )
}

export default MainPage