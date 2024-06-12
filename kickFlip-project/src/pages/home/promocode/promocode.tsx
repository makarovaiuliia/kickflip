import { SyntheticEvent } from 'react';
import './promocode.css';

export default function Promocode(): JSX.Element {
    const handleClick = (e: SyntheticEvent) => {
        const target = e.target as HTMLElement;
        const textToCopy = target.textContent!;

        navigator.clipboard.writeText(textToCopy).then(() => {
            target.textContent = 'Copied!';
            setTimeout(() => {
                target.textContent = 'newToKickFlip';
            }, 2000);
        });
    };

    return (
        <section className="section section-promocode">
            <div className="content promocode">
                <h2 className="promocode_title">
                    Promocode for the first purchase<span className="accent">.</span>
                </h2>
                <p className="promocode_text">Click to copy</p>
                <button className="promocode_button" type="button" onClick={handleClick}>
                    newToKickFlip
                </button>
            </div>
        </section>
    );
}
