import { useState } from 'react';
import { CartResponse, DefaultCartItem } from '@/types/types';
import { getFormatPrice } from '@/utils/utils';
import './cartSummary.css';
import ModalWindow from '@/components/modalWindow/modalWindow';
import PlaceOrder from '../placeOrder/placeOrder';

interface CartSummaryProps {
    summaryData: CartResponse;
}

export default function CartSummary({ summaryData }: CartSummaryProps) {
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

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
                <span>${DefaultCartItem.ShippingCost}</span>
            </div>
            <div className="cart-price total">
                <span>Total</span>
                <span>${+getFormatPrice(summaryData.totalPrice) + +DefaultCartItem.ShippingCost}</span>
            </div>
            <button className="send-order-btn" type="submit" onClick={() => setIsOpen(true)}>
                Place your Order
            </button>
            {isOpen && <ModalWindow content={<PlaceOrder />} closeModal={() => setIsOpen(false)} open={isOpen} />}
        </div>
    );
}
