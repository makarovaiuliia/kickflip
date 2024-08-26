import { SyntheticEvent } from 'react';
import './selectedCategories.css';
import { useParams } from 'react-router-dom';
import { TransformParams, FilterOptions } from '@/types/types';
import type { SelectedFilterOptions } from '../filterComponent/filterComponent';

/* eslint-disable import/no-absolute-path */
import cross from '/cross.svg';
/* eslint-enable import/no-absolute-path */

interface SelectedCategoriesProps {
    setCategories: React.Dispatch<React.SetStateAction<TransformParams>>;
    categories: TransformParams;
}

function SelectedCategories({ setCategories, categories }: SelectedCategoriesProps): JSX.Element {
    const { section } = useParams<{ section: string }>();
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
        setCategories({
            filter: { color: [], size: [], price: [], discount: section === 'outlet' ? [''] : [] },
            sort: '',
            search: '',
            category: '',
        });
    };

    const isFilterOption = (key: string): key is FilterOptions => {
        return ['color', 'size', 'price'].includes(key);
    };

    return (
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
    );
}

export default SelectedCategories;
