import { Link } from 'react-router-dom';
import './emptyCart.css';

/* eslint-disable import/no-absolute-path */
import cart from '/cart.svg';
/* eslint-enable import/no-absolute-path */

export default function EmptyCart() {
    return (
        <div className="empty-cart-wrapper">
            <img src={cart} alt="cart" className="empty-cart_icon" />
            <h1 className="empty-cart-title">
                Your cart is empty<span className="accent">.</span>
            </h1>
            <div className="empty-cart_text-container">
                <p>Looks like you haven’t added any kicks yet.</p>
                <p>Check what we’ve got for you!</p>
            </div>
            <Link to="/products" className="back-to-catalog-link">
                Back to Shopping
            </Link>
        </div>
    );
}
