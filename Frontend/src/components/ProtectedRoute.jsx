import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
    const userRole = localStorage.getItem("role"); // Ambil role dari localStorage
    const token = localStorage.getItem("token");  // Cek apakah ada token

    // Jika tidak login atau bukan admin, redirect ke halaman login
    if (!token || userRole !== role) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;