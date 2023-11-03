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
    <>
      {!isAuthenticated && (
        <Form onSubmit={handleSubmit}>
          <Col className="label-email">
            <Form.Label>Email</Form.Label>
          </Col>
          <Col className="input-email">
            <Form.Control
              type="email"
              name="email"
              placeholder="email"
              onChange={handleInputChange}
            />
          </Col>
          <Col className="label-pass">
            <Form.Label>Password</Form.Label>
          </Col>
          <Col className="input-pass">
            <Form.Control
              type="password"
              name="password"
              placeholder="password"
              onChange={handleInputChange}
            />
          </Col>{" "}
          <Col className="m-5 p-5">
            <Button variant="primary" type="submit" className="m-3">
              Submit
            </Button>
          </Col>
        </Form>
      )}
      {isSubmitted && isLoggingIn && (
        <div className="div-loggin-in">...loggin in</div>
      )}
      {isSubmitted && !isLoggingIn && !isAuthenticated && (
        <div className="div-failed-login">...failed log in</div>
      )}
    </>
  );
};

export default LoginForm;
