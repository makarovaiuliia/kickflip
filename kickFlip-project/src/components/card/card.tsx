import { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductProjected } from '@/types/types';
import './card.css';
import { findVariantId, getImageFromEachColor, processVariants } from '@/utils/utils';
import { getAllCategories } from '@/services/sneakersSlice';
import { useDispatch, useSelector } from '@/services/store';
import AddToCartForm from './addToCartForm/addToCartForm';
import { addToCart, getCardId } from '@/services/cartSlice';
import { getIsAuth } from '@/services/userSlice';

interface CardProps {
    productInfo: ProductProjected;
    selectedColors: string[];
}

function Card({ productInfo, selectedColors }: CardProps): JSX.Element {
    const dispatch = useDispatch();

    const { masterVariant, name, slug } = productInfo;
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

    const cartId = useSelector(getCardId);
    const isAuth = useSelector(getIsAuth);

    const handleAddToCart = async (event: SyntheticEvent) => {
        event.preventDefault();

        // product info
        const target = event.target as HTMLFormElement;
        const selectedSize = target.size.value;
        const selectedColor = Object.keys(colorMap)[activeImage];

        const variantId = findVariantId(masterVariant, productInfo.variants, selectedSize, selectedColor);
        const data = {
            isAuth,
            cartId,
            item: {
                action: 'addLineItem',
                productId: productInfo.id,
                variantId,
            },
        };
        dispatch(addToCart(data));
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
            <AddToCartForm productInfo={productInfo} handleAddToCart={handleAddToCart} />
        </div>
    );
}

export default Card;
