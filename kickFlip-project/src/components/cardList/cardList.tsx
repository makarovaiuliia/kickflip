import { SyntheticEvent, useState } from 'react';

import { ProductProjected, TransformParams } from '@/types/types';
import Card from '../card/card';
import './cardList.css';

interface CardListProps {
    products: ProductProjected[];
    setCategories: React.Dispatch<React.SetStateAction<TransformParams>>;
    categories: TransformParams;
}

function CardList({ products, setCategories, categories }: CardListProps): JSX.Element {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategories((prevCategories) => {
            return { ...prevCategories, sort: event.target.value };
        });
    };

    const handleSearch = (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        event.preventDefault();
        setCategories((prevCategories) => {
            return { ...prevCategories, search: searchTerm.toLowerCase() };
        });
    };

    return (
        <div className="card-list-container">
            <div className="card-list-sorting-container">
                <h2 className="card-list-title">{`The best kicks (${products.length})`}</h2>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        className="card-list-sorting"
                        placeholder="Search"
                        onChange={(event) => setSearchTerm(event.target.value)}
                        value={searchTerm}
                    />
                    <button type="submit" className="card-list-search-button" aria-label="Search" />
                </form>
                <select id="sort-select" className="card-list-sorting" onChange={handleSelect}>
                    <option value="">Sort by</option>
                    <option value="price asc">Price (Low-High)</option>
                    <option value="price desc">Price (High-Low)</option>
                    <option value="name.en-US desc">Name ⭡</option>
                    <option value="name.en-US asc">Name ⭣</option>
                </select>
            </div>
            {products.length === 0 ? (
                <p className="card-list-title">No kicks match these filters. Try modifying your search</p>
            ) : (
                <div className="card-list">
                    {products.map((product) => (
                        <Card productInfo={product} key={product.id} selectedColors={categories.filter.color} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CardList;
