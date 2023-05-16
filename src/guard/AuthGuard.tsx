import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiAuth } from '../service/api/api.auth';

export default function withAuth(WrappedComponent: any) {
    return function AuthenticatedComponent() {
        const navigate = useNavigate();
        const [authenticated, setAuthenticated] = useState(false);

        useEffect(() => {
            const token = localStorage.getItem('token');
            const sevice=new ApiAuth()
            if (!token) {
                navigate('/login');
                return;
            }
            sevice.validateToken(token).then((valid: any) => {
                if (!valid) {
                    navigate('/login');
                    return;
                }
                setAuthenticated(true);
            });
        }, [navigate]);

        if (!authenticated) {
            return null;
        }
        return <WrappedComponent />;
    };
}


