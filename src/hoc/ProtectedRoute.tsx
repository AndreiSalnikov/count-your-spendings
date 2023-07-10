import {useAuth} from "../hooks/useAuth";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = ({ auth = false, to = "/" }) => {
  const { email } = useAuth();

  const isAuth = email !== null;

  if (isAuth !== auth) {
    return <Navigate to={to} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
