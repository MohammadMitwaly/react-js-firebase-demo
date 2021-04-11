import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useRef } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";
import isValidEmail from "../utils/isValidEmail";

const SignUpPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confPassRef = useRef();
  const { signUp } = useFirebaseAuth();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmitCreateUserFrom = async (e) => {
    // Stop page from refreshing on submit
    e.preventDefault();

    const emailValue = emailRef.current.value;
    const passValue = passwordRef.current.value;
    const confPassValue = confPassRef.current.value;

    if (!emailValue && isValidEmail(emailValue)) {
      return setErrorMsg("Invalid email");
    }
    if (passValue !== confPassValue) {
      return setErrorMsg("Passwords do not match");
    }
    if (passValue.length < 6) {
      return setErrorMsg(
        "Password is too short, minimum limit is 6 characters"
      );
    }

    try {
      setErrorMsg("");
      setLoading(true);
      await signUp(emailValue, passValue);
      history.push("/");
    } catch (err) {
      setErrorMsg(`Create account failed, with the following error:\n ${err}`);
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h1 className="text-center mb-4">Create an account</h1>

          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
          <Form onSubmit={handleSubmitCreateUserFrom}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={confPassRef} required />
            </Form.Group>
            <Button type="submit" className="w-100">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/login">Login if you already have an account!</Link>
      </div>
    </>
  );
};

export default SignUpPage;
