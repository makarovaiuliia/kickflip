import { Price, Variants, CartResponse } from './types';

export interface ImgProps {
    imagesSrc: string[];
    setIndex: (index: number) => void;
    activeIndex: number;
    openModal?: (isOpen: boolean) => void;
}

export interface VariantImagesProps {
    images: Variants;
    setImages: (images: string[]) => void;
    currentImages: string[];
    handleActiveColorImage: (index: number) => void;
}

export interface ProductPricesProps {
    priceData: Price;
}

export interface ProductInfoProps {
    name: string;
    priceData: Price;
}

export interface ProductDescriptionProps {
    description: string;
}

export interface ProductSizesProps {
    sizes: number[];
    handleActiveSize: (index: number) => void;
    activeSize: number;
}

export interface DetailsContainerProps {
    infoProps: ProductInfoProps;
    variantProps: VariantImagesProps;
    sizesProps: ProductSizesProps;
    descrProps: ProductDescriptionProps;
    imgProps: ImgProps;
    isMobile: boolean;
    cartData: CartResponse;
    ifProductInCart: boolean;
    productQuantity: number;
    cartItemIndex: number;
    setCartData: React.Dispatch<React.SetStateAction<CartResponse | null | undefined>>;
}
