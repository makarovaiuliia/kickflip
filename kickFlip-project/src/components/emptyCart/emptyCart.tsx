import { Link } from 'react-router-dom';
import './emptyCart.css';

export default function EmptyCart() {
    return (
        <div className="empty-cart-wrapper">
            <h1 className="empty-cart-title">
                Your cart is <span className="accent">empty</span>
            </h1>
            <p className="empty-cart-text">Looks like you haven’t added any kicks yet.</p>
            <p className="back-link-text">Check what we’ve got for you...</p>
            <Link to="/products" className="back-to-catalog-link">
                Go back to shopping
            </Link>
        </div>
    );
}
