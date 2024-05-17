import { Link } from 'react-router-dom';
import logo from '../../assets/icons/logo.svg';
import user from '../../assets/icons/user-icon.svg';
import cart from '../../assets/icons/cart-icon.svg';
import './header.css';

export default function Header() {
    return (
        <header className="header">
            <div className="header-wrapper">
                <div className="logo">
                    <Link className="logo-link" to="/">
                        <img src={logo} alt="Kickflip" />
                    </Link>
                </div>
                <nav className="categories-nav">
                    <div className="categories-nav-list">
                        <Link className="categories-nav-link" to="/">
                            Home
                        </Link>
                        <Link className="categories-nav-link" to="/products">
                            Products
                        </Link>
                    </div>
                </nav>
                <nav className="services-nav">
                    <div className="services-nav-list">
                        <Link className="services-nav-link" to="/login">
                            <svg className="services-nav-link-icon">
                                <use xlinkHref={`${user}#user-icon`} />
                            </svg>
                            <span className="services-nav-link-text">Log in</span>
                        </Link>
                        <Link className="services-nav-link" to="/cart">
                            <svg className="services-nav-link-icon">
                                <use xlinkHref={`${cart}#cart-icon`} />
                            </svg>
                            <span className="services-nav-link-text">Cart</span>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}
