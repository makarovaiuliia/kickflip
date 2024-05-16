import { useEffect } from 'react';
import RegistrationPage from '@/pages/registration/registrationPage';
import { useDispatch } from '@/services/store';
import { getAnonymousToken } from '@/services/userSlice';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAnonymousToken());
    }, [dispatch]);

    return <RegistrationPage />;
}

export default App;
