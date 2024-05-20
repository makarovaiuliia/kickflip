import { useDispatch, useSelector } from 'react-redux';
import './homePage.css';
import { useEffect, useState } from 'react';
import { clearRegistrationMessage, getUserSelector } from '@/services/userSlice';

export default function HomePage(): JSX.Element {
    const dispatch = useDispatch();
    const { registrationMessage } = useSelector(getUserSelector);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (registrationMessage) {
            setShowMessage(true);
            timer = setTimeout(() => {
                setShowMessage(false);
                setTimeout(() => {
                    dispatch(clearRegistrationMessage());
                }, 1000);
            }, 5000);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [registrationMessage, dispatch]);

    return (
        <div className="home-wrapper">
            <h1 className="home-title">Home page will be here</h1>
            <p className={`successful-message ${showMessage ? 'show' : 'hide'}`}>{registrationMessage}</p>
        </div>
    );
}
