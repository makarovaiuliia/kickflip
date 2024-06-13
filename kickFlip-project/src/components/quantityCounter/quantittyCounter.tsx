import { useState } from 'react';
import './quantittyCounter.css';
import { UpdateActions } from '@/types/types';

interface QuantityCounterProps {
    initialQuantity: number;
    onQuantityChange: (quantity: number, updateAction: string) => void;
}

export default function QuantityCounter({ initialQuantity, onQuantityChange }: QuantityCounterProps) {
    const [quantity, setQuantity] = useState(initialQuantity);

    const handleIncrease = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onQuantityChange(newQuantity, UpdateActions.ChangeQty);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onQuantityChange(newQuantity, UpdateActions.ChangeQty);
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
