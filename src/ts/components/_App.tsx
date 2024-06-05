import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider } from "@context/AuthContext";
import LoginForm from "./loginForm/LoginForm";
import Loading from "./loading/Loading";

const Geolocation = lazy(() => import("@components/geolocation/Geolocation"));

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Navigate to="/" />} />
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>

      <Suspense fallback={<Loading />}>
        <Geolocation />
      </Suspense>
    </AuthProvider >
  );
};

export default App;
