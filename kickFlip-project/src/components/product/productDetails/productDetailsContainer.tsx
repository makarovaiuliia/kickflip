import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { DetailsContainerProps } from '@/types/componentsInterfaces';
import ProductDescription from './productDescr';
import ProductInfo from './productInfo';
import ProductSizes from './productSizes';
import VariantsImages from './productVariantsImages';
import MainImage from '../productImages/mainImage';

import { responsesErrorsHandler } from '@/utils/utils';
import { getCartId, setCart } from '@/services/cartSlice';
import { updateCart } from '@/utils/kickflip-api';
import { ChangeLineItem, UpdateActions } from '@/types/types';

export default function DetailsContainer({
    infoProps,
    variantProps,
    sizesProps,
    descrProps,
    imgProps,
    isMobile,
    ifProductInCart,
    cartData,
    productQuantity,
    cartItemIndex,
    setCartData,
    handleAddToCart,
}: DetailsContainerProps) {
    const cartId = useSelector(getCartId);
    const dispatch = useDispatch();
    const [cartError, setCartError] = useState('');

    const handleDeleteFromCart = async (quantity: number, updateAction: string) => {
        const changedData: ChangeLineItem = {
            version: cartData.version,
            actions: [
                {
                    action: updateAction,
                    lineItemId: cartData.lineItems[cartItemIndex].id,
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
            if (error) console.log(cartError);
        }
    };

    const handleClick = () => {
        if (ifProductInCart === true) {
            handleDeleteFromCart(productQuantity, UpdateActions.RemoveItem);
        } else {
            handleAddToCart();
        }
    };

    return (
        <div className="details-container">
            <ProductInfo name={infoProps.name} priceData={infoProps.priceData} />
            {isMobile && (
                <MainImage
                    imagesSrc={imgProps.imagesSrc}
                    activeIndex={imgProps.activeIndex}
                    setIndex={imgProps.setIndex}
                    openModal={imgProps.openModal}
                />
            )}
            <VariantsImages
                images={variantProps.images}
                setImages={variantProps.setImages}
                currentImages={variantProps.currentImages}
                handleActiveColorImage={variantProps.handleActiveColorImage}
            />
            <ProductSizes
                sizes={sizesProps.sizes}
                handleActiveSize={sizesProps.handleActiveSize}
                activeSize={sizesProps.activeSize}
            />
            <button className="cart-btn" type="button" onClick={() => handleClick()}>
                {ifProductInCart === true ? 'Remove from cart' : 'Add to cart'}
            </button>
            <ProductDescription description={descrProps.description} />
        </div>
    );
}
