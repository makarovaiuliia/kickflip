import { SyntheticEvent, useState } from 'react';
import Accordion from '../accordion/accordion';
import './filterComponent.css';
import cross from '../../../public/cross.svg';

interface FilterComponentProps {
    filterOptions: { title: string; options: string[] }[];
}

function FilterComponent({ filterOptions }: FilterComponentProps): JSX.Element {
    const [categories, setCategories] = useState<string[]>([]);

    const removeCategory = (category: string) => {
        setCategories((prevCategories) => prevCategories.filter((cat) => cat !== category));
    };

    const handleClick = (event: SyntheticEvent) => {
        const target = event.target as HTMLElement;
        removeCategory(target.textContent!);
    };

    const handleClearAll = () => {
        setCategories([]);
    };

    return (
        <div className="filter-wrapper">
            {!!categories.length && (
                <div className="selected">
                    <div className="selected_title">
                        <p>Selected categories</p>
                        <button type="button" className="selected_text" onClick={handleClearAll}>
                            Clear all
                        </button>
                    </div>
                    <ul className="category_list">
                        {categories.map((category) => (
                            <li key={category}>
                                <button type="button" className="category" onClick={handleClick}>
                                    <span className="category_title">{category}</span>
                                    <img src={cross} alt="cross" className="category_icon" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <ul className="filter">
                {filterOptions.map((option) => (
                    <Accordion
                        title={option.title}
                        options={option.options}
                        key={option.title}
                        setCategories={setCategories}
                    />
                ))}
            </ul>
        </div>
    );
}

export default FilterComponent;
