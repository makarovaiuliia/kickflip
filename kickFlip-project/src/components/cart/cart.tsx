import { CartResponse } from '@/types/types';
import './cart.css';
import CartItem from './cartItem/cartItem';
import CartSummary from './cartSummary/cartSummary';
import RemoveAllItemsBtn from './removeIBtn/removeAllItemsBtn';

interface CartProps {
    cartData: CartResponse;
    setCartData: React.Dispatch<React.SetStateAction<CartResponse | null | undefined>>;
}

export default function Cart({ cartData, setCartData }: CartProps) {
    return (
        <div className="cart-page-wrapper">
            <div className="title-wrapper">
                <h1 className="cart-title">Your shopping cart ({cartData.totalLineItemQuantity}) </h1>
                <RemoveAllItemsBtn onclick={() => console.log(123)} />
            </div>
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
        </div>
    );
}
