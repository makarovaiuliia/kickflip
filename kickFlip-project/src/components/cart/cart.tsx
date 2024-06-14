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
import { responsesErrorsHandler } from '@/utils/utils';

interface CartProps {
    cartData: CartResponse;
    setCartData: React.Dispatch<React.SetStateAction<CartResponse | null | undefined>>;
}

export default function Cart({ cartData, setCartData }: CartProps) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [deletingError, setDeletingError] = useState('');
    const cartId = useSelector(getCartId);
    const cartVersion = useSelector(getCartVersion);
    const dispatch = useDispatch();

    const removeAllItem = async () => {
        try {
            await deleteCartApi(cartId, cartVersion);
            const newCart = await dispatch(createCart()).unwrap();
            setCartData(newCart);
        } catch (error) {
            if (error) {
                responsesErrorsHandler(error, setDeletingError);
            }
        } finally {
            setShowConfirm(false);
        }
    };

    const closeModal = () => setShowConfirm(false);

    return (
        <div className="cart-page-wrapper">
            <div className="title-wrapper">
                <h1 className="cart-title">Your shopping cart ({cartData.lineItems.length}) </h1>
                <RemoveAllItemsBtn onclick={() => setShowConfirm(true)} />
                {deletingError && <div className="delete-error">{deletingError}</div>}
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
                    <CartSummary summaryData={cartData} setCartData={setCartData} />
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
