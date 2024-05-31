import { ImgProps } from '@/types/componentsInterfaces';

import MainImage from './mainImage';
import SideImages from './sideImage';

export default function ImagesContainer({ imagesSrc, setIndex, activeIndex, openModal }: ImgProps) {
    return (
        <div className="images-container">
            <SideImages imagesSrc={imagesSrc} activeIndex={activeIndex} setIndex={setIndex} />
            <MainImage imagesSrc={imagesSrc} activeIndex={activeIndex} setIndex={setIndex} openModal={openModal} />
        </div>
    );
}
