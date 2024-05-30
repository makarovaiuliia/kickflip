import { SyntheticEvent } from 'react';
import Accordion from '../accordion/accordion';
import './filterComponent.css';
import cross from '../../../public/cross.svg';
import { TransformParams, FilterOptions } from '@/types/types';

interface FilterComponentProps {
    options: TransformParams;
    setCategories: React.Dispatch<React.SetStateAction<TransformParams>>;
    categories: TransformParams;
}

export interface SelectedFilterOptions {
    attribute: FilterOptions;
    value: string;
}

function FilterComponent({ options, setCategories, categories }: FilterComponentProps): JSX.Element {
    const removeCategory = (category: SelectedFilterOptions) => {
        setCategories((prevCategories) => {
            const newFilter = { ...prevCategories.filter };

            if (newFilter[category.attribute]) {
                newFilter[category.attribute] = newFilter[category.attribute].filter(
                    (value) => value !== category.value
                );

                if (newFilter[category.attribute].length === 0) {
                    delete newFilter[category.attribute];
                }
            }

            return { ...prevCategories, filter: newFilter };
        });
    };

    const handleClick = (event: SyntheticEvent) => {
        const target = event.target as HTMLElement;
        const attribute = target.closest('button')!.getAttribute('data-attribute')! as FilterOptions;
        const value = target.closest('button')!.getAttribute('data-value')!;
        removeCategory({ attribute, value });
    };

    const handleClearAll = () => {
        setCategories({ filter: { color: [], size: [], price: [] }, sort: '' });
    };

    const isFilterOption = (key: string): key is FilterOptions => {
        return ['color', 'size', 'price'].includes(key);
    };

    return (
        <div className="filter-wrapper">
            {!!Object.keys(categories.filter).length && (
                <div className="selected">
                    <div className="selected_title">
                        <p>Selected categories</p>
                        <button type="button" className="selected_text" onClick={handleClearAll}>
                            Clear all
                        </button>
                    </div>
                    <ul className="category_list">
                        {Object.keys(categories.filter)
                            .filter(isFilterOption)
                            .map((category) =>
                                categories.filter[category].map((value) => (
                                    <li key={value}>
                                        <button
                                            type="button"
                                            className="category"
                                            onClick={handleClick}
                                            data-attribute={category}
                                            data-value={value}
                                        >
                                            <span className="category_title">{value}</span>
                                            <img src={cross} alt="cross" className="category_icon" />
                                        </button>
                                    </li>
                                ))
                            )}
                    </ul>
                </div>
            )}
            <ul className="filter">
                {Object.keys(options.filter)
                    .filter(isFilterOption)
                    .map((option) => (
                        <Accordion
                            title={option}
                            options={options.filter[option]}
                            key={option}
                            setCategories={setCategories}
                        />
                    ))}
            </ul>
        </div>
    );
}

export default FilterComponent;
