import { Navigate } from "react-router-dom";

function GuestRoute({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem("token");

    if (token) {
        return <Navigate to="/perfil" />;
    }

    return children;
}

export default GuestRoute;
