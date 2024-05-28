import { SyntheticEvent, useEffect, useState } from 'react';
import Accordion from '../accordion/accordion';
import './filterComponent.css';
import cross from '../../../public/cross.svg';
// import { transformToMap } from '@/utils/utils';
// import { useDispatch } from '@/services/store';
// import { getProducts } from '@/services/sneakersSlice';

interface FilterComponentProps {
    filterOptions: { title: string; options: string[] }[];
}

export interface SelectedFilterOptions {
    attribute: string;
    value: string;
}

function FilterComponent({ filterOptions }: FilterComponentProps): JSX.Element {
    const [categories, setCategories] = useState<SelectedFilterOptions[]>([]);
    // const dispatch = useDispatch();

    const removeCategory = (category: SelectedFilterOptions) => {
        setCategories((prevCategories) =>
            prevCategories.filter((cat) => !(cat.attribute === category.attribute && cat.value === category.value))
        );
    };

    const handleClick = (event: SyntheticEvent) => {
        const target = event.target as HTMLElement;
        const attribute = target.closest('button')!.getAttribute('data-attribute')!;
        const value = target.closest('button')!.getAttribute('data-value')!;
        removeCategory({ attribute, value });
    };

    const handleClearAll = () => {
        setCategories([]);
    };

    useEffect(() => {
        // const transformed = transformToMap(categories);
        // dispatch(getProducts(transformed));
    }, [categories]);

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
                            <li key={category.value}>
                                <button
                                    type="button"
                                    className="category"
                                    onClick={handleClick}
                                    data-attribute={category.attribute}
                                    data-value={category.value}
                                >
                                    <span className="category_title">{category.value}</span>
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
