import { CartResponse } from '@/types/types';
import './cart.css';
import CartItem from './cartItem/cartItem';
import CartSummary from './cartSummary/cartSummary';

interface CartProps {
    cartData: CartResponse;
}

export default function Cart({ cartData }: CartProps) {
    return (
        <>
            <h1 className="cart-title">Your shopping cart</h1>
            <div className="cart-wrapper">
                <div className="cart-items">
                    {cartData.lineItems.map((item) => (
                        <CartItem key={item.id} itemData={item} />
                    ))}
                </div>
                <div className="cart-summary">
                    <CartSummary summaryData={cartData} />
                </div>
            </div>
        </>
    );
}
