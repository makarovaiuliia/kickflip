import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { CartResponse, DefaultCartItem, DiscountCode, UpdateActions } from '@/types/types';
import { getFormatPrice, getOldPrice, getPriceWithoutDiscount } from '@/utils/utils';
import './cartSummary.css';
import { getCartId, getCartVersion, setCart } from '@/services/cartSlice';
import { getDiscountByIdApi, updateDiscountApi } from '@/utils/kickflip-api';
import OldNewPrise from '@/components/oldNewPrice/oldNewPrice';

interface CartSummaryProps {
    summaryData: CartResponse;
    setCartData: React.Dispatch<React.SetStateAction<CartResponse | null | undefined>>;
}

export default function CartSummary({ summaryData, setCartData }: CartSummaryProps) {
    const [inputValue, setInputValue] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode[]>([]);
    const cartId = useSelector(getCartId);
    const cartVersion = useSelector(getCartVersion);
    const dispatch = useDispatch();

    const apllyDiscount = async () => {
        const request = {
            version: cartVersion,
            actions: [{ action: UpdateActions.ApplayDiscount, code: inputValue }],
        };
        try {
            const newCart = await updateDiscountApi(cartId, request);
            setCartData(newCart);
            const discountDetailsPromises = newCart.discountCodes.map(async (discount) => {
                return getDiscountByIdApi(discount.discountCode.id);
            });

            const appliedDiscounts = await Promise.all(discountDetailsPromises);
            setAppliedDiscount(appliedDiscounts);

            dispatch(setCart(newCart));
        } catch (error) {
            console.log(error);
        } finally {
            setInputValue('');
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
    return (
        <div className="summary-wrapper">
            <h1 className="summary-title">Order summary</h1>
            <div className="promo">
                <h4 className="promo-title">Promo code?</h4>
                <div className="promo-field">
                    <input
                        type="text"
                        placeholder="Enter promo code"
                        className="form-input promo-input"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <button
                        className={`promo-button ${inputValue ? '' : 'disable'}`}
                        type="button"
                        onClick={apllyDiscount}
                    >
                        Redeem
                    </button>
                </div>
                {appliedDiscount.map((discount) => (
                    <p className="isApplied" key={discount.id}>
                        {discount.name['en-US']} is applied
                    </p>
                ))}
            </div>
            <div className="cart-price">
                <span>Subtotal</span>
                <span>
                    {summaryData.discountOnTotalPrice ||
                    summaryData.totalPrice.centAmount !== getPriceWithoutDiscount(summaryData.lineItems) ? (
                        <OldNewPrise oldPrice={getOldPrice(summaryData.lineItems)} newPrice={summaryData.totalPrice} />
                    ) : (
                        <span>${getFormatPrice(summaryData.totalPrice)}</span>
                    )}
                </span>
            </div>
            <div className="cart-price">
                <span>Delivery</span>
                <span>${DefaultCartItem.ShippingCost}</span>
            </div>
            <div className="cart-price total">
                <span>Total</span>
                <span>${+getFormatPrice(summaryData.totalPrice) + +DefaultCartItem.ShippingCost}</span>
            </div>
            <button className="send-order-btn" type="submit">
                Checkout
            </button>
        </div>
    );
}
