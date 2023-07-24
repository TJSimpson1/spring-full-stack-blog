import React, { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import LoadingSpinner from "../components/LoadingSpinner";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute: FC<AdminRouteProps> = ({ children } ) => {
  const { user, isLoading }: any = useUser();

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

  return <>{children}</>;
};

export default AdminRoute;
