import React, { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import LoadingSpinner from "../components/LoadingSpinner";
import { User } from "../interfaces/User";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute: FC<AdminRouteProps> = ({ children } ) => {
  const { user, isLoading }: { user: User | null; isLoading: boolean } =
  useUser();

  if (isLoading) {
    // Render a loading indicator while user data is being fetched
    return <LoadingSpinner text="Checking user details"/>;
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
