import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductProjected } from '@/types/types';
import './card.css';
import { getAdditionalSize, getImageFromEachColor, getProductsSizes, processVariants } from '@/utils/utils';
import { getAllCategories } from '@/services/sneakersSlice';
import { useDispatch, useSelector } from '@/services/store';
import { createCart, getCardId } from '@/services/cartSlice';

interface CardProps {
    productInfo: ProductProjected;
    selectedColors: string[];
}

function Card({ productInfo, selectedColors }: CardProps): JSX.Element {
    const dispatch = useDispatch();

    const { masterVariant, name, slug, variants } = productInfo;
    const cartId = useSelector(getCardId);
    const [activeImage, setActiveImage] = useState<number>(0);
    const { section } = useParams<{ section: string }>();
    const productCategories = useSelector(getAllCategories);
    const category = Object.keys(productCategories)
        .filter((cat) => productCategories[cat].id === productInfo.categories[0].id)[0]
        .toLowerCase();

    // card info

    const productPrices = masterVariant.prices[0];
    const price = productPrices.value.centAmount / 10 ** masterVariant.prices[0].value.fractionDigits;
    const discountPrice = productPrices.discounted
        ? productPrices.discounted.value.centAmount / 10 ** masterVariant.prices[0].value.fractionDigits
        : undefined;
    const colorMap = useMemo(() => processVariants(productInfo.masterVariant, productInfo.variants), [productInfo]);
    const images = getImageFromEachColor(colorMap);
    const sizes = Array.from(getProductsSizes(masterVariant, variants));

    useEffect(() => {
        if (selectedColors) {
            const colorIndex = Object.keys(colorMap).findIndex((color) => {
                return selectedColors.some((selectedColor) => selectedColor.toLowerCase() === color.toLowerCase());
            });

            if (colorIndex !== -1) {
                setActiveImage(colorIndex);
            }
        }
    }, [selectedColors, colorMap]);

    const handleAddToCart = () => {
        if (!cartId) {
            dispatch(createCart());
        }
    };

    return (
        <div className="card">
            <Link
                to={`/${discountPrice ? 'outlet' : section}/${category}/${productInfo.id}/${slug['en-US']}`}
                className="image-link"
            >
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
            <form onSubmit={handleAddToCart} className="card_cart-form">
                <select id="size-select" className="card_size-select">
                    <option value="">Size</option>
                    {getAdditionalSize(sizes).map((size, index) => (
                        <option key={size} value={size} disabled={index > sizes.length}>
                            {size}
                        </option>
                    ))}
                </select>
                <button type="submit" className="card_button">
                    Add to Cart
                </button>
            </form>
        </div>
    );
}

export default Card;
