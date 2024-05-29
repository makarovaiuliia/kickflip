import { ProductProjected } from '@/types/types';
import Card from '../card/card';
import './cardList.css';

interface CardListProps {
    products: ProductProjected[];
}

function CardList({ products }: CardListProps): JSX.Element {
    return (
        <div className="card-list">
            {products.map((product) => (
                <Card productInfo={product} key={product.id} />
            ))}
        </div>
    );
}

export default CardList;
