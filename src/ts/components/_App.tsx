import { BrowserRouter, Route, Routes } from "react-router-dom";

import "@scss/components/_App.scss";
import LoginForm from "./loginForm/LoginForm";

const App: React.FC = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
