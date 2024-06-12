import { useEffect, useState } from 'react';
import { DefaultCartItem, LineItem } from '@/types/types';
import './cartItem.css';
import { findAttr, getFormatPrice } from '@/utils/utils';
import ProductPrices from '@/components/product/productDetails/productPrice';
import { getProductImg } from '@/utils/kickflip-api';

interface CartItemProps {
    itemData: LineItem;
}

export default function CartItem({ itemData }: CartItemProps) {
    const itemVariant = itemData.variant;
    const itemDescription = itemVariant.attributes.find((attr) => attr.name === 'shortDescription');

    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        async function ImgSrc() {
            if (itemVariant.images.length !== 0) {
                setImgSrc(itemVariant.images[0].url);
            } else {
                const color = findAttr('color', itemVariant.attributes)?.value;
                if (typeof color === 'string') {
                    const images = await getProductImg(itemData.productId, color);

                    if (images) {
                        setImgSrc(images.url);
                    }
                }
            }
        }
        ImgSrc();
    }, [itemData.productId, itemVariant.attributes, itemVariant.images]);
    return (
        <div className="cart-item">
            <div className="cart-item-img-wrapper">
                <img src={imgSrc} alt={itemData.name['en-US']} className="cart-item-img" />
            </div>
            <div className="item-data">
                <div className="item-info">
                    <h3 className="item-name">{itemData.name['en-US']}</h3>
                    <div className="item-description">
                        {itemDescription ? itemDescription.value : DefaultCartItem.ItemDescription}
                    </div>
                    <span className="item-price">
                        <ProductPrices priceData={itemVariant.prices[0]} />
                    </span>
                </div>

                <div className="item-total-cost">
                    <span className="item-quantity">Quantity {itemData.quantity}</span>
                    <span className="item-total">Total: $ {getFormatPrice(itemData.totalPrice)}</span>
                </div>
            </div>
        </div>
    );
}
