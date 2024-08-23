import { SyntheticEvent, useState } from 'react';
import './searchForm.css';
import { TransformParams } from '@/types/types';

interface SearchFormProps {
    setCategories: React.Dispatch<React.SetStateAction<TransformParams>>;
}

function SearchForm({ setCategories }: SearchFormProps): JSX.Element {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        event.preventDefault();
        setCategories((prevCategories) => {
            return { ...prevCategories, search: searchTerm.toLowerCase() };
        });
    };

    return (
        <form onSubmit={handleSearch} className="filter-search-form">
            <input
                type="text"
                className="filter-search"
                placeholder="Search"
                onChange={(event) => setSearchTerm(event.target.value)}
                value={searchTerm}
            />
            <button type="submit" className="filter-search-button" aria-label="Search" />
        </form>
    );
}

export default SearchForm;
