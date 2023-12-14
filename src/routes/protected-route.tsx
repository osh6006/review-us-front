import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { tokenState } from "../recoil/auth-state";

export const ProtectedRoute = () => {
  const token = useRecoilValue(tokenState);

  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/auth" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};
