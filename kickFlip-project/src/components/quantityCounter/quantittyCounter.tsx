import { useState } from 'react';
import './quantittyCounter.css';

interface QuantityCounterProps {
    initialQuantity: number;
    onQuantityChange: (quantity: number, updateAction: string) => void;
}

export default function QuantityCounter({ initialQuantity, onQuantityChange }: QuantityCounterProps) {
    const [quantity, setQuantity] = useState(initialQuantity);

    const handleIncrease = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onQuantityChange(newQuantity, 'changeLineItemQuantity');
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onQuantityChange(newQuantity, 'changeLineItemQuantity');
        }
    };

    return (
        <div className="quantity-counter">
            <button
                className="quantity-btn decrease-btn"
                onClick={handleDecrease}
                disabled={quantity <= 1}
                type="button"
            >
                -
            </button>
            <span className="quantity-count">{quantity}</span>
            <button className="quantity-btn increase-btn" onClick={handleIncrease} type="button">
                +
            </button>
        </div>
    );
}
