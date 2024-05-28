import { SyntheticEvent, useState } from 'react';
import './accordion.css';
import FilterOption from '../filterOption/filterOption';
import type { SelectedFilterOptions } from '../filterComponent/filterComponent';

interface AccordionProps {
    title: string;
    options: string[];
    setCategories: React.Dispatch<React.SetStateAction<SelectedFilterOptions[]>>;
}

function Accordion({ title, options, setCategories }: AccordionProps): JSX.Element {
    const [isActive, setIsActive] = useState(false);

    const addCategory = (attribute: string, value: string) => {
        setCategories((prevCategories) => {
            if (!prevCategories.some((cat) => cat.attribute === attribute && cat.value === value)) {
                return [...prevCategories, { attribute, value }];
            }
            return prevCategories;
        });
    };

    const handleClick = (event: SyntheticEvent) => {
        const target = event.target as HTMLElement;
        const attribute = title.toLowerCase();
        const value = target.textContent!;
        addCategory(attribute, value);
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
                        <FilterOption attribute={title} value={option} handleClick={handleClick} key={option} />
                    ))}
                </ul>
            )}
        </li>
    );
}

export default Accordion;
