import { useSelector } from 'react-redux';
import { DetailsContainerProps } from '@/types/componentsInterfaces';
import ProductDescription from './productDescr';
import ProductInfo from './productInfo';
import ProductSizes from './productSizes';
import VariantsImages from './productVariantsImages';
import MainImage from '../productImages/mainImage';
import { useDispatch } from '@/services/store';

import { getCartId, getCartVersion, removeFromCart } from '@/services/cartSlice';
import { UpdateCart, UpdateActions } from '@/types/types';

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

    const handleDeleteFromCart = async () => {
        const changedData: UpdateCart = {
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
        </div>
    );
}
