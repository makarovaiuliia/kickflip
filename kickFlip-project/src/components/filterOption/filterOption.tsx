import { MouseEventHandler } from 'react';
import './filterOption.css';

interface FilterOptionProps {
    option: string;
    handleClick: MouseEventHandler<HTMLButtonElement>;
}

function FilterOption({ option, handleClick }: FilterOptionProps): JSX.Element {
    return (
        <li className="accordion-content-item" key={option}>
            <button type="button" className="accordion-content-button" onClick={handleClick}>
                {option}
            </button>
        </li>
    );
}

export default FilterOption;
