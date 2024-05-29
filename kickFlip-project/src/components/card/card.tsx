import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductProjected } from '@/types/types';
import './card.css';
import { getImageFromEachColor } from '@/utils/utils';

interface CardProps {
    productInfo: ProductProjected;
}

function Card({ productInfo }: CardProps): JSX.Element {
    const { masterVariant, name, slug } = productInfo;
    const [activeImage, setActiveImage] = useState(0);

    const productPrices = masterVariant.prices[0];

    const price = productPrices.value.centAmount / 10 ** masterVariant.prices[0].value.fractionDigits;
    const discountPrice = productPrices.discounted
        ? productPrices.discounted.value.centAmount / 10 ** masterVariant.prices[0].value.fractionDigits
        : undefined;
    const images = getImageFromEachColor(productInfo);

    return (
        <div className="card">
            <Link to={`/products/${productInfo.id}/${slug['en-US']}`} className="image-link">
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
                        key={`image url: ${image[0]}`}
                        className={`card_image-mini ${index === activeImage ? 'active' : ''}`}
                        style={{
                            backgroundImage: `url(${image[0]})`,
                        }}
                        aria-label={`Variant ${index + 1}`}
                    />
                ))}
            </div>
            <h3 className="card_title">{name['en-US']}</h3>
            <p className="card_description">{masterVariant.attributes[2].value}</p>
            {!discountPrice && <p className="card_price">{`$ ${price}`}</p>}
            {discountPrice && (
                <div className="card_discounted">
                    <p className="card_price">{`$ ${discountPrice}`}</p>
                    <p className="card_price_old">{`$ ${price}`}</p>
                </div>
            )}
        </div>
    );
}

export default Card;
