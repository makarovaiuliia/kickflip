import { SyntheticEvent, useState } from 'react';
import './accordion.css';
import FilterOption from '../filterOption/filterOption';

interface AccordionProps {
    title: string;
    options: string[];
    setCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

function Accordion({ title, options, setCategories }: AccordionProps): JSX.Element {
    const [isActive, setIsActive] = useState(false);

    const addCategory = (category: string) => {
        setCategories((prevCategories) => {
            if (!prevCategories.includes(category)) {
                return [...prevCategories, category];
            }
            return prevCategories;
        });
    };

    const handleClick = (event: SyntheticEvent) => {
        const target = event.target as HTMLElement;
        addCategory(target.textContent!);
    };

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
                        <FilterOption option={option} handleClick={handleClick} key={option} />
                    ))}
                </ul>
            )}
        </li>
    );
}

export default Accordion;
