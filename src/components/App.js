import { Container } from "react-bootstrap";
import { FirebaseAuthProvider } from "../contexts/FirebaseAuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUpPage from "./SignUp";
import Dashboard from "./Dashboard";
import LoginPage from "./Login";
const App = () => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <FirebaseAuthProvider>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/signup" component={SignUpPage} />
              <Route path="/login" component={LoginPage} />
            </Switch>
          </FirebaseAuthProvider>
        </Router>
      </div>
    </Container>
  );
};

export default App;
