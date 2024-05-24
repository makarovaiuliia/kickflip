import { ProductResponse } from '@/types/types';
import Card from '../card/card';
import './cardList.css';
import BreadCrumbs, { CrumbType } from '../breadCrumbs/breadCrumbs';

interface CardListProps {
    products: ProductResponse[];
}

const mockProps: CrumbType[] = [
    {
        label: 'Main',
        url: '/',
    },
    {
        label: 'Sneakers',
        url: '',
    },
];

function CardList({ products }: CardListProps): JSX.Element {
    return (
        <div className="main-wrapper">
            <BreadCrumbs crumbs={mockProps} />
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
