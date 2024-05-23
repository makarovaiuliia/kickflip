import { ProductResponse } from '@/types/types';
import Card from '../card/card';

interface CardListProps {
    products: ProductResponse[];
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
