export interface SideImgProps {
    sideImagesSrc: string[];
    mainImageSrc: string;
    setIndex: (index: number) => void;
    setImage: (image: string) => void;
}

export interface MainImgProps {
    imageSrc: string;
}
