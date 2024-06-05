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
  const [isFormDataValid, setIsFormDataValid] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isMissingVisible, setMissingVisible] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsButtonDisabled(false)
    validateCreds(formData);
  };

  const handleHoverEnter = () => {
    const isEmailValid = /^[^@\s]+@[^@\s]+\.(com|org|net|edu|gov)$/.test(formData.email);

    if (isEmailValid && formData.password !== "") {
      setMissingVisible(false)
      setIsFormDataValid(true)
      setIsButtonDisabled(false);

    } else {
      setMissingVisible(true)
      setIsFormDataValid(false)
      setIsButtonDisabled(true);
    }

  }
  const handleHoverLeave = () => {
    setMissingVisible(false)
  }

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
          <div
            className=" mt-4"
            onMouseEnter={handleHoverEnter}
            onMouseLeave={handleHoverLeave}
          >
            <button
              type="submit"
              className={`button-styles w-100 ${isFormDataValid ? "btn-valid" : "btn-invalid"}`}
              disabled={isButtonDisabled}
            >
              Login
            </button>
          </div>
          <div
            className="missing-fields mt-1"
            style={{ visibility: `${isMissingVisible ? 'visible' : 'hidden'}` }}>...missing or invalid fields
          </div>
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
          <div className="div-failed-login mt-1 text-center text-danger">...failed login attempt</div>
        )
      }
    </div >
  );
};

export default LoginForm;
