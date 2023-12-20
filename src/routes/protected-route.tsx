import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const userInfo = localStorage.getItem("userInfo");

  // // Check if the user is authenticated
  if (!userInfo) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/auth" replace={true} />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};
