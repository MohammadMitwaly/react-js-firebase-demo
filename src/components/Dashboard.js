import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const Dashboard = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const { logOut, currentUser } = useFirebaseAuth();
  const history = useHistory();

  const handleLogOut = async () => {
    setErrorMsg("");
    try {
      await logOut();
      history.push("/login");
    } catch (error) {
      setErrorMsg(`Failed to log out with the following error: ${error}`);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h1 className="text-center mb-4">User Profile</h1>
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
          <strong>Email: </strong>
          {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogOut}>
          Log Out
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
