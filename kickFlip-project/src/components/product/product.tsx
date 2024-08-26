import { useEffect, useState } from 'react';
import { ProductResponse, ProductData, Price, UpdateActions, LineItem } from '@/types/types';
import {
    getProductsSizes,
    processVariants,
    setBodyOverflowStyle,
    getAdditionalSize,
    findVariantId,
} from '@/utils/utils';
import { useDispatch, useSelector } from '@/services/store';
import { getCartId, addToCart, getCartVersion } from '@/services/cartSlice';

import './product.css';

import ImagesContainer from './productImages/imagesContainer';
import DetailsContainer from './productDetails/productDetailsContainer';
import ModalWindow from '../modalWindow/modalWindow';
import ModalSlider from '../modalSlider/modalSlider';

interface ProductProps {
    productData: ProductResponse;
    itemsInCart: LineItem[];
}

export default function Product({ productData, itemsInCart }: ProductProps) {
    const product: ProductData = productData.masterData.current;
    const productName: string = product.name['en-US'];
    const productDescription: string = product.description['en-US'];
    const productPrices: Price = product.masterVariant.prices[0];
    const imagesData = processVariants(product.masterVariant, product.variants);
    const sizes = Array.from(getProductsSizes(product.masterVariant, product.variants));
    const allSizes = getAdditionalSize(sizes);

    const [activeColor, setActiveImage] = useState<number>(0);
    const [activeSize, setActiveSize] = useState<number>(allSizes[0]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [images, setImages] = useState(Object.values(imagesData)[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const cartId = useSelector(getCartId);
    const cartVersion = useSelector(getCartVersion);

    const dispatch = useDispatch();

    const handleActiveColorImage = (activeImageColor: number) => {
        setActiveImage(activeImageColor);
    };

    const handleActiveSize = (activeSizeItem: number) => {
        setActiveSize(activeSizeItem);
    };

    const selectedColor = Object.keys(imagesData)[activeColor];
    const selectedSize = String(activeSize);

    const productId = productData.id;
    const variantId = findVariantId(product.masterVariant, product.variants, selectedSize, selectedColor);

    let ifProductInCart = false;
    let productQuantity: number = 0;
    let cartItemIndex: number = 0;

    if (itemsInCart) {
        itemsInCart.forEach((item, index) => {
            if (item.productId === productId && item.variant.id === variantId) {
                ifProductInCart = true;
                productQuantity = item.quantity;
                cartItemIndex = index;
            }
        });
    }

    const handleAddToCart = async () => {
        // product info

        const data = {
            cartId,
            item: {
                action: UpdateActions.AddItem,
                productId,
                variantId,
            },
            cartVersion,
        };

        await dispatch(addToCart(data));
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const modalContent = <ModalSlider sliderImages={images} />;
    setBodyOverflowStyle(isModalOpen);
    return (
        <>
            <div className="product-wrapper">
                {!isMobile && (
                    <ImagesContainer
                        imagesSrc={images}
                        activeIndex={activeIndex}
                        setIndex={setActiveIndex}
                        openModal={setIsModalOpen}
                    />
                )}
                <DetailsContainer
                    infoProps={{ name: productName, priceData: productPrices }}
                    variantProps={{
                        images: imagesData,
                        setImages,
                        currentImages: images,
                        handleActiveColorImage,
                    }}
                    sizesProps={{ sizes, handleActiveSize, activeSize }}
                    descrProps={{ description: productDescription }}
                    imgProps={{
                        imagesSrc: images,
                        activeIndex,
                        setIndex: setActiveIndex,
                        openModal: setIsModalOpen,
                    }}
                    isMobile={isMobile}
                    itemsInCart={itemsInCart}
                    productQuantity={productQuantity}
                    ifProductInCart={ifProductInCart}
                    cartItemIndex={cartItemIndex}
                    handleAddToCart={handleAddToCart}
                />
            </div>
            {isModalOpen && <ModalWindow content={modalContent} closeModal={setIsModalOpen} open={isModalOpen} />}
        </>
    );
}
