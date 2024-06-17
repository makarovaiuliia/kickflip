import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { CartResponse, UpdateCart, DefaultCartItem, LineItem, UpdateActions } from '@/types/types';
import './cartItem.css';
import { findAttr, getFormatPrice, getOldProductTotalPrice, responsesErrorsHandler } from '@/utils/utils';
import ProductPrices from '@/components/product/productDetails/productPrice';
import { getProductDetailsApi, updateCart, updateDiscountApi } from '@/utils/kickflip-api';
import QuantityCounter from '@/components/quantityCounter/quantityCounter';
import { getCartId, setCart } from '@/services/cartSlice';
import RemoveItemBtn from '../removeIBtn/removeItemBtn';
import OldNewPrise from '@/components/oldNewPrice/oldNewPrice';
import Loader from '@/components/loader/loader';

interface CartItemProps {
    itemData: LineItem;
    cartVersion: number;
    setCartData: React.Dispatch<React.SetStateAction<CartResponse | null | undefined>>;
}

export default function CartItem({ itemData, setCartData, cartVersion }: CartItemProps) {
    const [cartError, setCartError] = useState('');
    const itemVariant = itemData.variant;
    const isDiscounted = itemVariant.prices[0].discounted;
    const itemDescription = itemVariant.attributes.find((attr) => attr.name === 'shortDescription');
    const [imgSrc, setImgSrc] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const cartId = useSelector(getCartId);
    const dispatch = useDispatch();

    useEffect(() => {
        async function getProductDetails() {
            if (itemVariant.images.length !== 0) {
                setImgSrc(itemVariant.images[0].url);
            }
            try {
                const color = findAttr('color', itemVariant.attributes)?.value;
                if (typeof color === 'string') {
                    const details = await getProductDetailsApi(itemData.productId, color);
                    if (details) {
                        if (itemVariant.images.length === 0) {
                            setImgSrc(details.image.url);
                        }
                        setProductCategory(details.category);
                    }
                }
            } catch (error) {
                if (error) {
                    responsesErrorsHandler(error, setCartError);
                }
            }
        }

        getProductDetails();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = async (quantity: number, updateAction: string) => {
        const changedData: UpdateCart = {
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
            let newCart = await updateCart(cartId, changedData);
            if (newCart.lineItems.length === 0 && newCart.discountCodes.length > 0) {
                const removeDiscountsActions = newCart.discountCodes.map((discountCode) => ({
                    action: UpdateActions.DeleteDiscount,
                    discountCode: {
                        typeId: discountCode.discountCode.typeId,
                        id: discountCode.discountCode.id,
                    },
                }));

                const removeDiscountsRequest = {
                    version: newCart.version,
                    actions: removeDiscountsActions,
                };

                newCart = await updateDiscountApi(cartId, removeDiscountsRequest);
            }
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
                {imgSrc ? (
                    <Link
                        to={`/catalog/${isDiscounted ? 'outlet' : 'products'}/${productCategory.toLowerCase()}/${itemData.productId}/${itemData.productSlug['en-US']}`}
                        className="image-link"
                    >
                        <img src={imgSrc} alt={itemData.name['en-US']} className="cart-item-img" />
                    </Link>
                ) : (
                    <Loader />
                )}
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
                        <div className="total-price">
                            {itemData.totalPrice.centAmount !== itemData.price.value.centAmount * itemData.quantity ? (
                                <OldNewPrise
                                    oldPrice={getOldProductTotalPrice(itemData.price.value, itemData.quantity)}
                                    newPrice={itemData.totalPrice}
                                />
                            ) : (
                                <span> $ {getFormatPrice(itemData.totalPrice)}</span>
                            )}
                        </div>
                    </div>
                </div>
                <RemoveItemBtn onclick={() => handleChange(itemData.quantity, UpdateActions.RemoveItem)} />
            </div>
        </div>
    );
}
