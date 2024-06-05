import { useParams } from 'react-router-dom';

import Accordion from '../accordion/accordion';
import './filterComponent.css';
import { TransformParams, FilterOptions } from '@/types/types';
import SearchForm from '../searchForm/searchForm';
import SelectedCategories from '../selectedCategories/selectedCategories';

interface FilterComponentProps {
    options: TransformParams;
    setCategories: React.Dispatch<React.SetStateAction<TransformParams>>;
    categories: TransformParams;
    isMobile: boolean;
}

export interface SelectedFilterOptions {
    attribute: FilterOptions;
    value: string;
}

function FilterComponent({ options, setCategories, categories, isMobile }: FilterComponentProps): JSX.Element {
    const { section } = useParams<{ section: string }>();

    const isAnyFilterActive = Object.values(categories.filter).some((filterArray, index) => {
        const filterKey = Object.keys(categories.filter)[index];
        if (filterKey === 'discount' && section === 'outlet') {
            return filterArray.some((value) => value !== '');
        }
        return filterArray.length > 0;
    });

    const isFilterOption = (key: string): key is FilterOptions => {
        return ['color', 'size', 'price'].includes(key);
    };

    return (
        <div className="filter-wrapper">
            {!isMobile && <SearchForm setCategories={setCategories} />}
            {isAnyFilterActive && <SelectedCategories categories={categories} setCategories={setCategories} />}
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
