import Button from "react-bootstrap/Button";
import { ChangeEvent, useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import "@scss/components/loginForm/LoginForm.scss";
import { authUser } from "@api/geolocationEmail/GeolocationEmailApi";
import { executeSendEmail } from "@api/profile/ProfileApi";
import { fetchIpInfoApiData } from "@api/ipInfo/IpInfoApi";
import Geolocation from "@components/geolocation/Geolocation";
import { IpDataType } from "@appTypes/index";

const LoginForm = () => {
  const [isAuthd, setIsAuthd] = useState(false);
  const [ipData, setIpData] = useState<IpDataType | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // fetch ipInfo data
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await fetchIpInfoApiData();
        setIpData(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchApiData();
  }, []);

  // when ipInfo retrieved, execute sendEmail endpoint
  useEffect(() => {
    if (ipData) {
      const userAgent = navigator.userAgent;
      console.log(`userAgent -> ${userAgent}`);

      const ipInfoMessage = `${Object.entries(ipData)}`;
      const contactEmailMessage = `\nPRE SIGN-IN ->\nipInfoMessage:\n${ipInfoMessage}\nuserAgent: ${userAgent}`;

      const executeApiCall = async () => {
        try {
          executeSendEmail(contactEmailMessage);
        } catch (error) {
          console.error(error);
        }
      };

      executeApiCall();
    }
  }, [ipData]);

  // on submit, authenticate user
  const authenticateUser = async () => {
    try {
      const isAuthd = await authUser(formData);
      setIsAuthd(isAuthd);
    } catch (error) {
      console.error(error);
      setIsAuthd(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`handling submit`);

    await authenticateUser();
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const myForm = (
    <Form onSubmit={handleSubmit}>
      <Col className="label-email">
        {/* <Form.Label className="label-email">Email address</Form.Label> */}
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
  );

  return <>{isAuthd ? <Geolocation ipData={ipData} /> : myForm}</>;
};

export default LoginForm;
