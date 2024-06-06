import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider } from "@context/AuthContext";
import MainPage from "@pages/MainPage"

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Navigate to="/" />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider >
  );
};

export default App;