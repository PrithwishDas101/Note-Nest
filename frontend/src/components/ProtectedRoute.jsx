import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = () => {
  const { user, loading, isSupabaseConfigured } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-base-300 px-5">
        <div className="flex flex-col items-center gap-4 text-base-content/60" role="status">
          <span className="loading loading-spinner loading-md text-primary" />
          <p className="text-sm">Opening your private space...</p>
        </div>
      </main>
    );
  }

  if (!isSupabaseConfigured || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;