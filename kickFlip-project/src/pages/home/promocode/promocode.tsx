import { SyntheticEvent } from 'react';
import './promocode.css';
import { DiscountCode } from '@/types/types';
import PromoCode from './promocodeBtn';

interface PromocodesProps {
    discounts: DiscountCode[];
}

export default function Promocodes({ discounts }: PromocodesProps): JSX.Element {
    const titleText = discounts.length
        ? 'Click to copy'
        : 'Unfortunately, we currently do not have any discounts available. ';

    const handleClick = (e: SyntheticEvent) => {
        const target = e.target as HTMLElement;
        const textToCopy = target.textContent!;

        navigator.clipboard.writeText(textToCopy).then(() => {
            target.textContent = 'Copied!';
            setTimeout(() => {
                target.textContent = textToCopy;
            }, 2000);
        });
    };

    return (
        <section className="section section-promocode">
            <div className="content promocode">
                <h2 className="promocode_title">
                    Get discount for the best kicks<span className="accent">.</span>
                </h2>
                <p className="promocode_text">{titleText}</p>
                <div className="promocodes-container">
                    {discounts.map((discount) => (
                        <PromoCode discount={discount} onclick={handleClick} key={discount.id} />
                    ))}
                </div>
            </div>
        </section>
    );
}
