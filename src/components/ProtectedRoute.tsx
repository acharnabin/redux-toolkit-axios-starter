import React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // user login ache kina
  // tar jonne token check korte hbe

  // jodi token thake userProfile api call korte hy
  // jodi api thke 200 dei then ok
  // jodi api thke 400 dei then logout

  if (localStorage.getItem("token")) {
    return children;
  }

  return <Navigate to="/auth/sign-in"/>
};

export default ProtectedRoute;
