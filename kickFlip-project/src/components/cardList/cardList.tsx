import { useEffect, useState } from 'react';
import { ProductProjected } from '@/types/types';
import Card from '../card/card';
import './cardList.css';
import { useDispatch } from '@/services/store';
import { getFilteredProducts } from '@/services/sneakersSlice';

interface CardListProps {
    products: ProductProjected[];
}

function CardList({ products }: CardListProps): JSX.Element {
    const [query, setQuery] = useState<string | null>(null);
    const dispatch = useDispatch();

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setQuery(event.target.value);
    };

    useEffect(() => {
        if (query) {
            dispatch(getFilteredProducts({ sort: [query] }));
        }
    }, [query, dispatch]);

    return (
        <div className="card-list-container">
            <div className="card-list-sorting-container">
                <h2 className="card-list-title">{`The best kicks(${products.length})`}</h2>
                <select id="sort-select" className="card-list-sorting" onChange={handleSelect}>
                    <option value="">Sort by</option>
                    <option value="price asc">Price (Low-High)</option>
                    <option value="price desc">Price (High-Low)</option>
                    <option value="name.en-US desc">Name ⭡</option>
                    <option value="name.en-US asc">Name ⭣</option>
                </select>
            </div>
            <div className="card-list">
                {products.map((product) => (
                    <Card productInfo={product} key={product.id} />
                ))}
            </div>
        </div>
    );
}

export default CardList;
