import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "") || null;

  // Check if the user is authenticated
  if (!userInfo) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/auth" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};
