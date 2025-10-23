import React from "react";
import { useAuth } from "./Auth_providor";
import { Navigate } from "react-router-dom";

function Protect_route({ chidren }) {
  const { isAuthenticate } = useAuth();

  return isAuthenticate ? chidren : < Navigate to="/" replace />
}

export default Protect_route;
