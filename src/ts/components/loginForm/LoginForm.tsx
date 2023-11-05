import Button from "react-bootstrap/Button";
import { ChangeEvent, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import "@scss/components/loginForm/LoginForm.scss";
import { useAuth } from "@context/AuthContext";

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
    <div className="form-container">
      {!isAuthenticated && (
        <Form onSubmit={handleSubmit} className="rounded-4 p-4 fw-medium">
          <Col className="label-email">
            <Form.Label>Email</Form.Label>
          </Col>
          <Col className="input-email mb-3">
            <Form.Control
              type="email"
              name="email"
              placeholder="email"
              onChange={handleInputChange}
              className="rounded-3 lh-lg"
            />
          </Col>
          <Col className="label-pass mt-3">
            <Form.Label>Password</Form.Label>
          </Col>
          <Col className="input-pass mb-3">
            <Form.Control
              type="password"
              name="password"
              placeholder="password"
              onChange={handleInputChange}
              className="rounded-3 lh-lg"
            />
          </Col>
          <Col className="btn-div text-center">
            <Button
              role="button"
              variant="primary"
              type="submit"
              className="button-styles m-3 pl-2 pr-2 fs-5 fw-bold rounded-3"
            >
              Submit
            </Button>
          </Col>
        </Form>
      )}
      {isSubmitted && isLoggingIn && (
        <div className="div-loggin-in mt-1 text-center">...logging in</div>
      )}
      {isSubmitted && !isLoggingIn && !isAuthenticated && (
        <div className="div-failed-login mt-1 text-center text-danger">
          ...failed log in
        </div>
      )}
    </div>
  );
};

export default LoginForm;
