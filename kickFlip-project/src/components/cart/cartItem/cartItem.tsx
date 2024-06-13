import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { CartResponse, ChangeLineItem, DefaultCartItem, LineItem, UpdateActions } from '@/types/types';
import './cartItem.css';
import { findAttr, getFormatPrice, responsesErrorsHandler } from '@/utils/utils';
import ProductPrices from '@/components/product/productDetails/productPrice';
import { getProductImg, updateCart } from '@/utils/kickflip-api';
import QuantityCounter from '@/components/quantityCounter/quantittyCounter';
import { getCartId, setCart } from '@/services/cartSlice';
import RemoveItemBtn from '../removeIBtn/removeItemBtn';

interface CartItemProps {
    itemData: LineItem;
    cartVersion: number;
    setCartData: React.Dispatch<React.SetStateAction<CartResponse | null | undefined>>;
}

export default function CartItem({ itemData, setCartData, cartVersion }: CartItemProps) {
    const [cartError, setCartError] = useState('');
    const itemVariant = itemData.variant;
    const itemDescription = itemVariant.attributes.find((attr) => attr.name === 'shortDescription');
    const [imgSrc, setImgSrc] = useState('');
    const cartId = useSelector(getCartId);
    const dispatch = useDispatch();

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = async (quantity: number, updateAction: string) => {
        const changedData: ChangeLineItem = {
            version: cartVersion,
            actions: [
                {
                    action: updateAction,
                    lineItemId: itemData.id,
                    quantity,
                },
            ],
        };
        try {
            const newCart = await updateCart(`${cartId}`, changedData);
            setCartData(newCart);
            dispatch(setCart(newCart));
        } catch (error) {
            if (error) {
                responsesErrorsHandler(error, setCartError);
                setTimeout(() => setCartError(''), 2000);
            }
        }
    };

    return (
        <div className="cart-item">
            {cartError && <div className="cart-error">{cartError}</div>}
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
                    <div className="item-quantity">
                        Qty
                        <QuantityCounter initialQuantity={itemData.quantity} onQuantityChange={handleChange} />
                    </div>
                    <div className="item-total">
                        Total
                        <div className="total-price">$ {getFormatPrice(itemData.totalPrice)}</div>
                    </div>
                </div>
                <RemoveItemBtn onclick={() => handleChange(itemData.quantity, UpdateActions.RemoveItem)} />
            </div>
        </div>
    );
}
