import { useEffect } from 'react';
import RegistrationPage from '@/pages/registration/registrationPage';
import { useDispatch } from '@/services/store';
import { getAnonymousToken } from '@/services/userSlice';
import { getCookie } from '@/utils/cookie';
// import { getUserApi } from '@/utils/kickflip-api';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = getCookie('accessToken');
        if (token) {
            // console.log(token);
            // const user = getUserApi();
            // console.log(user);
        } else {
            dispatch(getAnonymousToken());
        }
    }, [dispatch]);

    return <RegistrationPage />;
}

export default App;
