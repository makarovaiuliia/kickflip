import { useState } from 'react';
import './accordion.css';

interface AccordionProps {
    title: string;
    options: string[];
}

function Accordion({ title, options }: AccordionProps): JSX.Element {
    const [isActive, setIsActive] = useState(false);

    return (
        <li className="accordion">
            <button
                type="button"
                className="accordion_title"
                onClick={() => setIsActive((prevIsActive: boolean) => !prevIsActive)}
            >
                <div>{title}</div>
                <div>{isActive ? '-' : '+'}</div>
            </button>
            {isActive && (
                <ul className="accordion-content">
                    {options.map((option) => (
                        <li className="accordion-content-item" key={option}>
                            <button type="button" className="accordion-content-button">
                                {option}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
}

export default Accordion;
