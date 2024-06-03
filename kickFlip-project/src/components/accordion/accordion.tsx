import { SyntheticEvent, useState } from 'react';
import './accordion.css';
import FilterOption from '../filterOption/filterOption';
import { TransformParams, FilterOptions } from '@/types/types';

interface AccordionProps {
    title: string;
    options: string[];
    setCategories: React.Dispatch<React.SetStateAction<TransformParams>>;
}

function Accordion({ title, options, setCategories }: AccordionProps): JSX.Element {
    const [isActive, setIsActive] = useState(false);

    const addCategory = (attribute: FilterOptions, value: string) => {
        setCategories((prevCategories) => {
            const newFilter = { ...prevCategories.filter };
            if (newFilter[attribute]) {
                if (!newFilter[attribute].includes(value)) {
                    newFilter[attribute] = [...newFilter[attribute], value];
                }
            } else {
                newFilter[attribute] = [value];
            }

            return { ...prevCategories, filter: newFilter };
        });
    };

    const handleClick = (event: SyntheticEvent) => {
        const target = event.target as HTMLElement;
        const attribute = title.toLowerCase() as FilterOptions;
        const value = target.closest('button')!.textContent!;

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
