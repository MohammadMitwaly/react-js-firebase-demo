import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useRef } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";

const LoginPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { logIn } = useFirebaseAuth();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmitCreateUserFrom = async (e) => {
    // Stop page from refreshing on submit
    e.preventDefault();

    const emailValue = emailRef.current.value;
    const passValue = passwordRef.current.value;

    try {
      setErrorMsg("");
      setLoading(true);
      await logIn(emailValue, passValue);
    } catch (err) {
      setErrorMsg(`Login failed, with the following error:\n ${err}`);
      history.push("/");
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h1 className="text-center mb-4">Login into your account</h1>

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
            <Button type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        If you don't have an account, <Link to="/signup">create one here!</Link>
      </div>
    </>
  );
};

export default LoginPage;
