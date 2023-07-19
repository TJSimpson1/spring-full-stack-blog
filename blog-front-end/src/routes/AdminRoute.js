import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import LoadingSpinner from "../components/LoadingSpinner";

const AdminRoute = ({ children }) => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    // Render a loading indicator while user data is being fetched
    return <LoadingSpinner />;
  }

  if(!user){
    return <Navigate to="/login" />;
  }

  if(user?.role !== "ADMIN") {
    return <Navigate to="/forbidden" />
  }

  return children;
};

export default AdminRoute;
