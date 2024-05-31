import { useState } from 'react';

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

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = products.filter((product) =>
        product.name['en-US'].toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="card-list-container">
            <div className="card-list-sorting-container">
                <h2 className="card-list-title">{`The best kicks (${filteredProducts.length})`}</h2>
                <input
                    type="text"
                    className="card-list-sorting"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <select id="sort-select" className="card-list-sorting" onChange={handleSelect}>
                    <option value="">Sort by</option>
                    <option value="price asc">Price (Low-High)</option>
                    <option value="price desc">Price (High-Low)</option>
                    <option value="name.en-US desc">Name ⭡</option>
                    <option value="name.en-US asc">Name ⭣</option>
                </select>
            </div>
            <div className="card-list">
                {filteredProducts.map((product) => (
                    <Card productInfo={product} key={product.id} selectedColors={categories.filter.color} />
                ))}
            </div>
        </div>
    );
}

export default CardList;
