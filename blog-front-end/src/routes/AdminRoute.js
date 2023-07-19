import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const AdminRoute = ({ children }) => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    // Render a loading indicator or skeleton screen while user data is being fetched
    return <div>Loading...</div>;
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
