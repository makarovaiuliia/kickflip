import { Variants } from './types';

export interface SideImgProps {
    sideImagesSrc: string[];
    mainImageSrc: string;
    setIndex: (index: number) => void;
    setImage: (image: string) => void;
}

export interface MainImgProps {
    imageSrc: string;
}

export interface VariantImagesProps {
    images: Variants;
    index: number;
    setImage: (image: string) => void;
    setImages: (images: string[]) => void;
    currentImages: string[];
}
