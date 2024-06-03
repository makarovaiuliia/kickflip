import { useDispatch, useSelector } from 'react-redux';
import './homePage.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
        <div className="main-wrapper home-wrapper">
            <p className={`successful-message ${showMessage ? 'show' : 'hide'}`}>{registrationMessage}</p>

            <section className="section">
                <h3 className="section-title">What’s on the menu?</h3>
                <ul className="section-list">
                    <li className="section-list-categories">
                        <Link to="/products">
                            <p className="section-subtitle">Products</p>
                        </Link>
                    </li>
                    <li className="section-list-categories">
                        <Link to="/outlet">
                            <p className="section-subtitle">Outlet</p>
                        </Link>
                    </li>
                </ul>
            </section>
        </div>
    );
}
