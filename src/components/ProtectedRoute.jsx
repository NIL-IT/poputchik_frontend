import { Navigate } from "react-router-dom";
import { useUserStore } from "../state/UserStore";

function ProtectedRoute({ children }) {
  const currentUser = useUserStore((state) => state.currentUser);
  const isAuthenticated = currentUser && currentUser.name;
  return isAuthenticated ? children : <Navigate to='/registration' />;
}

export default ProtectedRoute;
