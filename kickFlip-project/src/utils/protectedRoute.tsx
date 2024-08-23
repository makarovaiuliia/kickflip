import { Navigate, useLocation } from 'react-router-dom';
import { getIsAuth } from '@/services/userSlice';
import { useSelector } from '../services/store';

type ProtectedRouteProps = {
    onlyUnAuth?: boolean;
    children: React.ReactElement;
};

export default function ProtectedRoute({ onlyUnAuth = false, children }: ProtectedRouteProps) {
    const isAuth = useSelector(getIsAuth);
    const location = useLocation();

    if (onlyUnAuth && isAuth) {
        const { from } = location.state || { from: { pathname: '/' } };
        return <Navigate to={from} />;
    }

    if (!onlyUnAuth && !isAuth) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}

ProtectedRoute.defaultProps = {
    onlyUnAuth: false,
};
