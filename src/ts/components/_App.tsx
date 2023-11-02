import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "@scss/components/_App.scss";
import { AuthProvider } from "@context/AuthContext";
import LoginForm from "./loginForm/LoginForm";
import Geolocation from "./geolocation/Geolocation";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Navigate to="/" />} />
            <Route path="/" element={<LoginForm />} />
          </Routes>
        </BrowserRouter>
        <Geolocation />
      </div>
    </AuthProvider>
  );
};

export default App;
