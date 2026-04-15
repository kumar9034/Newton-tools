import { Navigate } from "react-router-dom";

const Protective = ({ children }) => {
  const isAdmin = localStorage.getItem("admin");

  return isAdmin ? children : <Navigate to="/admin/login" />;
};

export default Protective;