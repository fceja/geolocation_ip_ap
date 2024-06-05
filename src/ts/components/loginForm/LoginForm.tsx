import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
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
        <Form onSubmit={handleSubmit} className="form-container">
          <div className="app-title d-flex justify-content-center pt-3">Geolocation App</div>
          <div className="greeting d-flex justify-content-center pb-3"> Please enter credentials to sign in.</div>
          <hr></hr>
          <label className="label-email">Email</label>
          <Form.Control
            className="input-email-form rounded-3 "
            name="email"
            onChange={handleInputChange}
            placeholder="email"
            required
            type="email"
          />
          <Form.Label className="label-pass mt-3">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="password"
            onChange={handleInputChange}
            className="input-pass-form mb-3 rounded-3 lh-lg"
            required
          />
          <Button
            role="button"
            variant="primary"
            type="submit"
            className="button-styles rounded-3"
          >
            Login
          </Button>
        </Form>
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
