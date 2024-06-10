import { useState } from 'react';
import { CartResponse } from '@/types/types';
import { getFormatPrice } from '@/utils/utils';
import './cartSummary.css';

interface CartSummaryProps {
    summaryData: CartResponse;
}

export default function CartSummary({ summaryData }: CartSummaryProps) {
    const deliveryCost = 30;
    const [inputValue, setInputValue] = useState('');

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
                    <button className={`promo-button ${inputValue ? '' : 'disable'}`} type="button">
                        Redeem
                    </button>
                </div>
            </div>
            <div className="cart-price">
                <span>Subtotal</span>
                <span>${getFormatPrice(summaryData.totalPrice)}</span>
            </div>
            <div className="cart-price">
                <span>Delivery</span>
                <span>${deliveryCost}</span>
            </div>
            <div className="cart-price total">
                <span>Total</span>
                <span>${+getFormatPrice(summaryData.totalPrice) + deliveryCost}</span>
            </div>
            <button className="send-order-btn" type="submit">
                Checkout
            </button>
        </div>
    );
}
