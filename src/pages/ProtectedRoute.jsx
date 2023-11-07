import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAccountContext } from "../Context/AccountContext";

function ProtectedRoute({ children }) {
  const {
    state: { isAuthenticated },
  } = useAccountContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
