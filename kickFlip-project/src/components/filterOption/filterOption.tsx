import { MouseEventHandler } from 'react';
import './filterOption.css';

interface FilterOptionProps {
    attribute: string;
    value: string;
    handleClick: MouseEventHandler<HTMLButtonElement>;
}

function FilterOption({ attribute, value, handleClick }: FilterOptionProps): JSX.Element {
    return (
        <li className="accordion-content-item" key={attribute}>
            <button type="button" className="accordion-content-button" onClick={handleClick} data-attribute={attribute}>
                {attribute === 'color' && (
                    <span className="accordion-content-button-color" style={{ backgroundColor: value }} />
                )}
                {value}
            </button>
        </li>
    );
}

export default FilterOption;