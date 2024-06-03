import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './profilePage.css';
import Button from '@/components/button/button';
import { clearUpdateUserMessage, getUserSelector } from '@/services/userSlice';

export default function ProfilePage(): JSX.Element {
    const dispatch = useDispatch();
    const { updateUserMessage } = useSelector(getUserSelector);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (updateUserMessage) {
            setShowMessage(true);
            timer = setTimeout(() => {
                setShowMessage(false);
                setTimeout(() => {
                    dispatch(clearUpdateUserMessage());
                }, 1000);
            }, 5000);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [updateUserMessage, dispatch]);

    return (
        <div className="main-wrapper profile-wrapper">
            <h1 className="home-title profile-page-title">My account</h1>

            <div className="profile">
                <div className="profile-nav">
                    <NavLink className="profile-nav-links" to="account">
                        <Button text="Account details" className="button profile-nav-button" />
                    </NavLink>
                    <NavLink className="profile-nav-links" to="password">
                        <Button text="Password" className="button profile-nav-button" />
                    </NavLink>
                    <NavLink className="profile-nav-links" to="address">
                        <Button text="Address" className="button profile-nav-button" />
                    </NavLink>
                    <NavLink className="profile-nav-links" to="orders">
                        <Button text="Orders" className="button profile-nav-button" />
                    </NavLink>
                </div>
                <div className="profile-content">
                    <Outlet />
                </div>
            </div>
            <p className={`successful-update-message ${showMessage ? 'show' : 'hide'}`}>{updateUserMessage}</p>
        </div>
    );
}
