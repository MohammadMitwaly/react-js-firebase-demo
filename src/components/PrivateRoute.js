import { Route, Redirect } from "react-router-dom";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";

const PrivateRoute = ({ component: Component, ...extra }) => {
  const { currentUser } = useFirebaseAuth();
  return (
    <Route
      {...extra}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
};

export default PrivateRoute;
