import { useState } from 'react';
import { useDispatch, useSelector } from '@/services/store';
import { CartResponse } from '@/types/types';
import './cart.css';
import CartItem from './cartItem/cartItem';
import CartSummary from './cartSummary/cartSummary';
import RemoveAllItemsBtn from './removeIBtn/removeAllItemsBtn';
import ModalWindow from '../modalWindow/modalWindow';
import ConfirmRemovingMessage from '../confirmCartRemoving/confirmRemoving';
import { createCart, getCartId, getCartVersion } from '@/services/cartSlice';
import { deleteCartApi } from '@/utils/kickflip-api';

interface CartProps {
    cartData: CartResponse;
    setCartData: React.Dispatch<React.SetStateAction<CartResponse | null | undefined>>;
}

export default function Cart({ cartData, setCartData }: CartProps) {
    const [showConfirm, setShowConfirm] = useState(false);
    const catId = useSelector(getCartId);
    const cartVersion = useSelector(getCartVersion);
    const dispatch = useDispatch();

    const removeAllItem = async () => {
        await deleteCartApi(catId, cartVersion);
        dispatch(createCart());
        setShowConfirm(false);
    };

    const closeModal = () => setShowConfirm(false);

    return (
        <div className="cart-page-wrapper">
            <div className="title-wrapper">
                <h1 className="cart-title">Your shopping cart ({cartData.totalLineItemQuantity}) </h1>
                <RemoveAllItemsBtn onclick={() => setShowConfirm(true)} />
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
            {showConfirm && (
                <ModalWindow
                    content={<ConfirmRemovingMessage clickYes={removeAllItem} clickNo={closeModal} />}
                    open={showConfirm}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
}
