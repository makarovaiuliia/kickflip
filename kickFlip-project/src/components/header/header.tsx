import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from '@/services/store';

/* eslint-disable import/no-absolute-path */
import logo from '/logo.svg';
import user from '/user-icon.svg';
import cart from '/cart-icon.svg';
import logout from '/logoutIcon.svg';
/* eslint-enable import/no-absolute-path */

import './header.css';
import { getAnonymousToken, getIsAuth, logoutUser } from '@/services/userSlice';

export default function Header() {
    const [isOpen, setMenuIsOpen] = useState(false);
    const isAuth = useSelector(getIsAuth);
    const dispatch = useDispatch();

    const closeMenu = () => setMenuIsOpen(false);

    const handleLogout = () => {
        dispatch(getAnonymousToken());
        dispatch(logoutUser());
        closeMenu();
    };

    return (
        <header className="header">
            <div className="header-wrapper">
                <div className="logo">
                    <Link className="logo-link" to="/" onClick={closeMenu}>
                        <img src={logo} alt="Kickflip" />
                    </Link>
                </div>
                <div className={`navigation ${isOpen && 'open'}`}>
                    <nav className="categories-nav">
                        <div className="categories-nav-list">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? 'categories-nav-link categories-nav-link-active' : 'categories-nav-link'
                                }
                                to="/"
                                onClick={closeMenu}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? 'categories-nav-link categories-nav-link-active' : 'categories-nav-link'
                                }
                                to="/products"
                                onClick={closeMenu}
                            >
                                Products
                            </NavLink>
                        </div>
                    </nav>
                    <nav className="services-nav">
                        <div className="services-nav-list">
                            {!isAuth && (
                                <>
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'services-nav-link services-nav-link-active'
                                                : 'services-nav-link'
                                        }
                                        to="/login"
                                        onClick={closeMenu}
                                    >
                                        <svg className="services-nav-link-icon">
                                            <use xlinkHref={`${user}#user-icon`} />
                                        </svg>
                                        <span className="services-nav-link-text">Log in</span>
                                    </NavLink>
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'services-nav-link services-nav-link-active'
                                                : 'services-nav-link'
                                        }
                                        to="/registration"
                                        onClick={closeMenu}
                                    >
                                        <svg className="services-nav-link-icon">
                                            <use xlinkHref={`${user}#user-icon`} />
                                        </svg>
                                        <span className="services-nav-link-text">Sign up</span>
                                    </NavLink>
                                </>
                            )}
                            {isAuth && (
                                <>
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'services-nav-link services-nav-link-active'
                                                : 'services-nav-link'
                                        }
                                        to="/profile"
                                        onClick={closeMenu}
                                    >
                                        <svg className="services-nav-link-icon">
                                            <use xlinkHref={`${user}#user-icon`} />
                                        </svg>
                                        <span className="services-nav-link-text">Profile</span>
                                    </NavLink>
                                    <button className="services-nav-link" onClick={handleLogout} type="button">
                                        <svg className="services-nav-link-icon services-nav-link-icon-logout">
                                            <use xlinkHref={`${logout}#logout-icon`} />
                                        </svg>
                                        <span className="services-nav-link-text">Logout</span>
                                    </button>
                                </>
                            )}
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? 'services-nav-link services-nav-link-active' : 'services-nav-link'
                                }
                                to="/cart"
                                onClick={closeMenu}
                            >
                                <svg className="services-nav-link-icon">
                                    <use xlinkHref={`${cart}#cart-icon`} />
                                </svg>
                                <span className="services-nav-link-text">Cart</span>
                            </NavLink>
                        </div>
                    </nav>
                </div>
                <div className="navigation-toggle">
                    <button
                        type="button"
                        className={`navigation-toggle-button ${isOpen && 'open'}`}
                        onClick={() => setMenuIsOpen(!isOpen)}
                    >
                        <span className="navigation-toggle-bar" />
                    </button>
                </div>
            </div>
        </header>
    );
}
