import { Navigate } from "react-router-dom";
import { useUserStore } from "../../state/UserStore";

export default function ProtectedRoute({ children, redirectPath = "/" }) {
  const { currentUser } = useUserStore();
  const isAuthenticated = currentUser && currentUser.name;
  return isAuthenticated ? children : <Navigate to={redirectPath} />;
}
