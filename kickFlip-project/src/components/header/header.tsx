import { NavLink } from 'react-router-dom';
import logo from '../../assets/icons/logo.svg';
import user from '../../assets/icons/user-icon.svg';
import cart from '../../assets/icons/cart-icon.svg';
import './header.css';

export default function Header() {
    return (
        <header className="header">
            <div className="header-wrapper">
                <div className="logo">
                    <NavLink className="logo-link" to="/">
                        <img src={logo} alt="Kickflip" />
                    </NavLink>
                </div>
                <nav className="categories-nav">
                    <div className="categories-nav-list">
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? 'categories-nav-link categories-nav-link-active' : 'categories-nav-link'
                            }
                            to="/"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? 'categories-nav-link categories-nav-link-active' : 'categories-nav-link'
                            }
                            to="/products"
                        >
                            Products
                        </NavLink>
                    </div>
                </nav>
                <nav className="services-nav">
                    <div className="services-nav-list">
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? 'services-nav-link services-nav-link-active' : 'services-nav-link'
                            }
                            to="/login"
                        >
                            <svg className="services-nav-link-icon">
                                <use xlinkHref={`${user}#user-icon`} />
                            </svg>
                            <span className="services-nav-link-text">Log in</span>
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? 'services-nav-link services-nav-link-active' : 'services-nav-link'
                            }
                            to="/cart"
                        >
                            <svg className="services-nav-link-icon">
                                <use xlinkHref={`${cart}#cart-icon`} />
                            </svg>
                            <span className="services-nav-link-text">Cart</span>
                        </NavLink>
                    </div>
                </nav>
            </div>
        </header>
    );
}
