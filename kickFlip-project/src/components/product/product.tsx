import { useEffect, useState } from 'react';
import { ProductResponse, ProductData, Price } from '@/types/types';
import { getProductsSizes, processVariants, setBodyoverflowStyle } from '@/utils/utils';
import './product.css';

import ImagesContainer from './productImages/imagesContainer';
import DetailsContainer from './productDetails/productDetailsContainer';
import ModalWindow from '../modalWindow/modalWindow';
import ModalSlider from '../modalSlider/modalSlider';

interface ProductProps {
    productData: ProductResponse;
}

export default function Product({ productData }: ProductProps) {
    const product: ProductData = productData.masterData.current;
    const productName: string = product.name['en-US'];
    const productDescription: string = product.description['en-US'];
    const productPrices: Price = product.masterVariant.prices[0];
    const imagesData = processVariants(product.masterVariant, product.variants);
    const sizes = Array.from(getProductsSizes(product.masterVariant, product.variants));

    const [activeIndex, setActiveIndex] = useState(0);
    const [images, setImages] = useState(Object.values(imagesData)[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const modalContent = <ModalSlider sliderImages={images} />;
    setBodyoverflowStyle(isModalOpen);
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
                    }}
                    sizesProps={{ sizes }}
                    descrProps={{ description: productDescription }}
                    imgProps={{
                        imagesSrc: images,
                        activeIndex,
                        setIndex: setActiveIndex,
                        openModal: setIsModalOpen,
                    }}
                    isMobile={isMobile}
                />
            </div>
            {isModalOpen && <ModalWindow content={modalContent} closeModal={setIsModalOpen} open={isModalOpen} />}
        </>
    );
}
