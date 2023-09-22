import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");
    if (!jwtToken) {
      navigate("/login");
    }
  }, [navigate]);

  return children;
};

export default ProtectedRoutes;