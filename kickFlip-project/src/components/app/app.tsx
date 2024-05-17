import { useEffect } from 'react';
import RegistrationPage from '@/pages/registration/registrationPage';
import { useDispatch } from '@/services/store';
import { getAnonymousToken, getUser } from '@/services/userSlice';
import { getCookie } from '@/utils/cookie';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = getCookie('accessToken');
        if (token) {
            dispatch(getUser())
                .unwrap()
                .catch(() => {
                    dispatch(getAnonymousToken());
                });
        } else {
            dispatch(getAnonymousToken());
        }
    }, [dispatch]);

    return <RegistrationPage />;
}

export default App;
