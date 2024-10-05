import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../reducers/store";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const userLogin = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();

  console.log(userLogin);

  if (!userLogin) {
    // Pass the current location (where the user was trying to go) in the state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
