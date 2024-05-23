import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductResponse } from '@/types/types';
import './card.css';
import { getImageFromEachColor } from '@/utils/utils';

interface CardProps {
    productInfo: ProductResponse;
}

function Card({ productInfo }: CardProps): JSX.Element {
    const productData = productInfo.masterData.current;
    const { masterVariant, name, slug } = productData;
    const price = masterVariant.prices[0].value.centAmount / 100;
    const images = getImageFromEachColor(productInfo);
    const [activeImage, setActiveImage] = useState(0);

    return (
        <div className="temp card">
            {/* TODO: подправить путь, когда будет ясно, на каком пути лежит product list */}
            <Link to={`products/${productInfo.id}/${slug['en-US']}`} className="image-link">
                <img src={images[activeImage][0]} alt="ProductImage" className="card_image" />
                <img src={images[activeImage][1]} alt="ProductImage second" className="card_image card_image-second" />
            </Link>
            <div className="card_variant-list">
                {images.map((image, index) => (
                    <button
                        type="button"
                        onClick={() => setActiveImage(index)}
                        className={`card_image-mini ${index === activeImage ? 'active' : ''}`}
                        key={image[0]}
                        style={{
                            backgroundImage: `url(${image[0]})`,
                        }}
                        aria-label={`Variant ${index + 1}`}
                    />
                ))}
            </div>
            <h3 className="card_title">{name['en-US']}</h3>
            <p className="card_price">{`€ ${price}`}</p>
        </div>
    );
}

export default Card;
