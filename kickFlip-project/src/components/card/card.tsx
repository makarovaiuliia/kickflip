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
    const discounted = !!masterVariant.prices[0].discounted;

    const price = masterVariant.prices[0].value.centAmount / 100;
    const images = getImageFromEachColor(productInfo);
    const [activeImage, setActiveImage] = useState(0);

    return (
        <div className="temp card">
            <Link to={`${productInfo.id}/${slug['en-US']}`} className="image-link">
                <img src={images[activeImage][0]} alt="ProductImage" className="card_image" />
                <img
                    src={images[activeImage][Math.random() < 0.5 ? 1 : 2]}
                    alt="ProductImage second"
                    className="card_image card_image-second"
                />
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
            <p className="card_description">{masterVariant.attributes[2].value}</p>
            {!discounted && <p className="card_price">{`€ ${price}`}</p>}
            {discounted && (
                <div className="card_discounted">
                    <p className="card_price">{`€ ${masterVariant.prices[0].discounted.value.centAmount / 100}`}</p>
                    <p className="card_price_old">{`€ ${price}`}</p>
                </div>
            )}
        </div>
    );
}

export default Card;
