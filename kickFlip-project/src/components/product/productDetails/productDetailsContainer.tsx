import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { DetailsContainerProps } from '@/types/componentsInterfaces';
import ProductDescription from './productDescr';
import ProductInfo from './productInfo';
import ProductSizes from './productSizes';
import VariantsImages from './productVariantsImages';
import MainImage from '../productImages/mainImage';
import { useDispatch } from '@/services/store';

import { getCartId, getCartVersion, removeFromCart, getCartError, clearErrorMessage } from '@/services/cartSlice';
import { ChangeLineItem, UpdateActions } from '@/types/types';

export default function DetailsContainer({
    infoProps,
    variantProps,
    sizesProps,
    descrProps,
    imgProps,
    isMobile,
    ifProductInCart,
    itemsInCart,
    productQuantity,
    cartItemIndex,
    handleAddToCart,
}: DetailsContainerProps) {
    const cartId = useSelector(getCartId);
    const cartVersion = useSelector(getCartVersion);
    const dispatch = useDispatch();

    const cartErr = useSelector(getCartError);
    const cartErrMessage = cartErr === 'Failed to fetch' ? 'Internet is disconected' : cartErr;
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (cartErrMessage) {
            setShowMessage(true);
            timer = setTimeout(() => {
                setShowMessage(false);
                setTimeout(() => {
                    dispatch(clearErrorMessage());
                }, 1000);
            }, 5000);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [cartErrMessage, dispatch]);

    const handleDeleteFromCart = async () => {
        const changedData: ChangeLineItem = {
            version: cartVersion,
            actions: [
                {
                    action: UpdateActions.RemoveItem,
                    lineItemId: itemsInCart[cartItemIndex].id,
                    quantity: productQuantity,
                },
            ],
        };

        const requestData = {
            cartId,
            dataRequest: changedData,
        };
        await dispatch(removeFromCart(requestData));
    };

    const handleClick = () => {
        if (ifProductInCart === true) {
            handleDeleteFromCart();
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
            <p className={`successful-update-message ${showMessage ? 'show' : 'hide'}`}>{cartErrMessage}</p>
        </div>
    );
}
