import { Navigate } from "react-router-dom";

const is_auth = () => {
  return localStorage.getItem("adminToken") === "true";
};

function ProtectedRoute({ children }) {
    if (!is_auth()) {
      return <Navigate to="/" replace />
    }

    return children;
}

export default ProtectedRoute;