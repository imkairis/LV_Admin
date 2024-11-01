import { Navigate, Outlet, useLocation } from 'react-router-dom';

function ProtectRoute({ children, isAllow, redirect = '/login' }) {
    const { pathname } = useLocation();

    if (!isAllow) {
        return <Navigate to={`${redirect}?redirect=${pathname}`} replace />;
    }

    return children ? children : <Outlet />;
}

export default ProtectRoute;
