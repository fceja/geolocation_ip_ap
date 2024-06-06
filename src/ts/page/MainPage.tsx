import { useAuth } from "@context/AuthContext";
import Geolocation from "@components/geolocation/Geolocation";
import LoginForm from "../components/loginForm/LoginForm";

export const MainPage = () => {
    const { isAuthd } = useAuth();
    return (
        <>
            {!isAuthd ? <LoginForm /> : <Geolocation />}
        </>
    )
}

export default MainPage