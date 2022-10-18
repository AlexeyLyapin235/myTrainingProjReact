import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminAuth = ({ children }) => {
  const location = useLocation();
  const isAdmin = useSelector((state) => state.myState.admin);
  if (!isAdmin) {
    return <Navigate to="/login" state={{ from: location }}></Navigate>;
  }
  return children;
};
export default AdminAuth;
