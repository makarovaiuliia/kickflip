import { Link } from 'react-router-dom';
import { ProductResponse } from '@/types/types';

interface CardProps {
    productData: ProductResponse;
}

function Card({ productData }: CardProps): JSX.Element {
    const { slug, masterVariant } = productData;

    return (
        <li>
            <Link to={`products/${slug}`}>
                <img src={masterVariant.images[0].url} alt="ProductImage" />
            </Link>
        </li>
    );
}

export default Card;
