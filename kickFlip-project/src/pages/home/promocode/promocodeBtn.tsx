import { SyntheticEvent } from 'react';
import { DiscountCode } from '@/types/types';

interface PromoCodeProps {
    discount: DiscountCode;
    onclick: (e: SyntheticEvent) => void;
}

export default function PromoCode({ discount, onclick }: PromoCodeProps) {
    return (
        <div className="promocode-wrapper">
            <button className="promocode_button" type="button" onClick={onclick}>
                {discount.code}
            </button>
            <p className="promocode-text">{discount.name['en-US']}</p>
        </div>
    );
}
