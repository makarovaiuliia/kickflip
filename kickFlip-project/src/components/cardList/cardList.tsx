import { ProductResponse } from '@/types/types';
import Card from '../card/card';
import './cardList.css';

interface CardListProps {
    products: ProductResponse[];
}

function CardList({ products }: CardListProps): JSX.Element {
    return (
        <div className="main-wrapper">
            <div className="card-list">
                {products.map((product) => (
                    <Card productInfo={product} key={product.id} />
                ))}
            </div>
            s
        </div>
    );
}

export default CardList;
