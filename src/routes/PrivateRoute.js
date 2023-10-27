import { Routes, Route } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect } from "react";
import Alert from "react-bootstrap/Alert";

const PrivateRoute = (props) => {
  const { user } = useContext(UserContext);

  if (user && !user.auth) {
    return (
      <>
        <Alert variant="danger" className="mt-3" dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>You donn have permission to access this route. 🤡</p>
        </Alert>
      </>
    );
  }

  return <>{props.children}</>;
};

export default PrivateRoute;
