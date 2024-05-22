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
    const { slug, masterVariant, name } = productData;
    const price = masterVariant.prices[0].value.centAmount / 100;
    const images = getImageFromEachColor(productInfo);
    const [activeImage, setActiveImage] = useState(0);

    return (
        <div className="temp card">
            <Link to={`products/${slug['en-US']}`} className="">
                <img src={images[activeImage]} alt="ProductImage" className="card_image" />
            </Link>
            <div className="card_variant-list">
                {images.map((image, index) => (
                    <button
                        type="button"
                        onClick={() => setActiveImage(index)}
                        className={`card_image-mini ${index === activeImage ? 'active' : ''}`}
                        key={image}
                        style={{
                            backgroundImage: `url(${image})`,
                        }}
                        aria-label={`Variant ${index + 1}`}
                    />
                ))}
            </div>
            <h3 className="card_title">{name['en-US']}</h3>
            <p className="card_price">{`${price}€`}</p>
        </div>
    );
}

export default Card;
