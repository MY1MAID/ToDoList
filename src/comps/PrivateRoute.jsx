import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.user.token);

  return token ? children : <Navigate to="/main" />;
};

export default PrivateRoute;
