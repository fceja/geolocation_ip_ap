import { ChangeEvent, useState } from "react";

import { useAuth } from "@context/AuthContext";
import "@scss/components/loginForm/LoginForm.scss";

const LoginForm = () => {
  const { isAuthenticated, isLoggingIn, isSubmitted, validateCreds } =
    useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // on submit, authenticate user
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateCreds(formData);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="main-form-container">
      {!isAuthenticated && (
        <form
          onSubmit={handleSubmit}
          className="form-container">
          <span className="app-title pt-3">Geolocation & IP App</span>
          <span className="greeting pb-3"> Please enter credentials to login.</span>
          <hr></hr>
          <label className="label-email mt-3 mb-1">Email</label>
          <input
            className="input-email-form py-1"
            name="email"
            onChange={handleInputChange}
            placeholder="email"
            required
            type="email"
          />
          <label className="label-pass mt-3 mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleInputChange}
            className="input-pass-form py-1"
            required
          />
          {/* <button type="submit" className="button-styles mt-3">Login</button> */}
          <button type="submit" className="button-styles mt-3">Login</button>
        </form>
      )
      }
      {
        isSubmitted && isLoggingIn && (
          <div className="div-loggin-in mt-1 text-center">...logging in</div>
        )
      }
      {
        isSubmitted && !isLoggingIn && !isAuthenticated && (
          <div className="div-failed-login mt-1 text-center text-danger">...failed log in</div>
        )
      }
    </div >
  );
};

export default LoginForm;
