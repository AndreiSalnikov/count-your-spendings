import {useAuth} from "../hooks/useAuth";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = ({auth = false, to = "/"}) => {

  const {email} = useAuth();

  if (!email === auth) {
    return <Navigate to={to}/>;
  }

  return <Outlet/>;
};

export default ProtectedRoute;
