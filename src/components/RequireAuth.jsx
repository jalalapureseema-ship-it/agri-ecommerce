import { Navigate, useLocation } from "react-router-dom";
import { getSession } from "../utils/storage";

function RequireAuth({ role, children }) {
  const session = getSession();
  const location = useLocation();
  if (!session || session.role !== role) {
    const next = role === "farmer" ? "/farmer/login" : "/customer/login";
    return <Navigate to={next} state={{ from: location }} replace />;
  }
  return children;
}

export default RequireAuth;
