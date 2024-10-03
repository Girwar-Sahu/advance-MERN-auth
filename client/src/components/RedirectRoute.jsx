import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RedirectRoute() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return user && user.isVarified && isAuthenticated ? <Navigate to="/" /> : <Outlet />;
}

export default RedirectRoute;


