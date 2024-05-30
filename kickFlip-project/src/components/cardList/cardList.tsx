import { ProductProjected, TransformParams } from '@/types/types';
import Card from '../card/card';
import './cardList.css';

interface CardListProps {
    products: ProductProjected[];
    setCategories: React.Dispatch<React.SetStateAction<TransformParams>>;
}

function CardList({ products, setCategories }: CardListProps): JSX.Element {
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategories((prevCategories) => {
            return { ...prevCategories, sort: event.target.value };
        });
    };

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
