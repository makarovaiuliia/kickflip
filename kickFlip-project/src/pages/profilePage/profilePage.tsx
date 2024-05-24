import { NavLink, Outlet } from 'react-router-dom';
import './profilePage.css';
import Button from '@/components/button/button';

export default function ProfilePage(): JSX.Element {
    return (
        <div className="main-wrapper profile-wrapper">
            <h1 className="home-title profile-page-title">My account</h1>

            <div className="profile">
                <div className="profile-nav">
                    <NavLink className="profile-nav-links" to="account">
                        <Button text="Account details" className="button profile-nav-button" />
                    </NavLink>
                    <NavLink className="profile-nav-links" to="orders">
                        <Button text="Orders" className="button profile-nav-button" />
                    </NavLink>
                    <NavLink className="profile-nav-links" to="address">
                        <Button text="Address" className="button profile-nav-button" />
                    </NavLink>
                    <NavLink className="profile-nav-links" to="password">
                        <Button text="Password" className="button profile-nav-button" />
                    </NavLink>
                </div>
                <div className="profile-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
