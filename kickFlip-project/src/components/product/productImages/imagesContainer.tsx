import { SideImgProps } from '@/types/componentsInterfaces';

import MainImage from './mainImage';
import SideImages from './sideImage';

export default function ImagesContainer({ sideImagesSrc, mainImageSrc, setIndex, setImage }: SideImgProps) {
    return (
        <div className="images-container">
            <SideImages
                sideImagesSrc={sideImagesSrc}
                mainImageSrc={mainImageSrc}
                setIndex={setIndex}
                setImage={setImage}
            />
            <MainImage imageSrc={mainImageSrc} />
        </div>
    );
}
