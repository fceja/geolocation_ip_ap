import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "@scss/components/_App.scss";
import { AuthProvider } from "@context/AuthContext";
import LoginForm from "./loginForm/LoginForm";
import Loading from "./loading/Loading";

const Geolocation = lazy(() => import("./geolocation/Geolocation"));

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

        <Suspense fallback={<Loading />}>
          <Geolocation />
        </Suspense>
      </div>
    </AuthProvider>
  );
};

export default App;
