import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useRef } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";

const ResetPasswordPage = () => {
  const emailRef = useRef();
  const { resetPassword } = useFirebaseAuth();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPasswordFormSubmit = async (e) => {
    // Stop page from refreshing on submit
    e.preventDefault();

    const emailValue = emailRef.current.value;

    try {
      setSuccessMsg("");
      setErrorMsg("");
      setLoading(true);
      await resetPassword(emailValue);
      setSuccessMsg("Email sent, check your inbox in order to reset password");
    } catch (err) {
      setErrorMsg(`Sending email failed, with the following error:\n ${err}`);
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h1 className="text-center mb-4">Send email to reset password</h1>
          {successMsg && <Alert variant="success">{successMsg}</Alert>}
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
          <Form onSubmit={handleResetPasswordFormSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button type="submit" className="w-100">
              Send email
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ResetPasswordPage;
