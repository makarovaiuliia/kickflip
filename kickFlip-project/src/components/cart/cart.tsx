import { CartResponse } from '@/types/types';
import './cart.css';
import CartItem from './cartItem/cartItem';
import CartSummary from './cartSummary/cartSummary';

interface CartProps {
    cartData: CartResponse;
    setCartData: React.Dispatch<React.SetStateAction<CartResponse | null>>;
}

export default function Cart({ cartData, setCartData }: CartProps) {
    return (
        <>
            <h1 className="cart-title">Your shopping cart</h1>
            <div className="cart-wrapper">
                <div className="cart-items">
                    {cartData.lineItems.map((item) => (
                        <CartItem
                            key={item.id}
                            itemData={item}
                            setCartData={setCartData}
                            cartVersion={cartData.version}
                        />
                    ))}
                </div>
                <div className="cart-summary">
                    <CartSummary summaryData={cartData} />
                </div>
            </div>
        </>
    );
}
