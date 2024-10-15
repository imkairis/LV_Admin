import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProtectRoute({ children }) {
    const { token, user } = useSelector((state) => state.auth);
    const isLogin = !!token;
    const isAdmin = user?.isAdmin;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin || !isAdmin) {
            navigate('/login');
        }
    }, [isLogin, isAdmin, navigate]);

    return <>{children}</>;
}

export default ProtectRoute;
