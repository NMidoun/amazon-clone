import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useFirestore } from "../../contexts/FirestoreContext";

const ProtectedRoutes = ({ children }) => {
  const { currentUser, isLoadingAuth, name } = useAuth();
  const { isLoadingProducts } = useFirestore();
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if (name && path === "/login/register") return <Navigate to="/login/myAccount" />;
  }, [name])

  if (isLoadingAuth || isLoadingProducts) {
    return (
      <div className="login">
        <CircularProgress />
      </div>
    );
  }

  if (!currentUser && path === "/comingSoon") return <Navigate to="/" />;
  
  if (
    currentUser &&
    currentUser.displayName &&
    path.match(/^\/login/) &&
    path !== "/login/myAccount"
  )  return <Navigate to="/login/myAccount" />;

  if (!currentUser && path === "/login/myAccount")
    return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoutes;