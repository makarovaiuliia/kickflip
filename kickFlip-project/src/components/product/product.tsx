import { useState } from 'react';
import { ProductResponse, ProductData, PriceValue } from '@/types/types';
import { getProductsSizes, processVariants } from '@/utils/utils';
import './product.css';

import ImagesContainer from './productImages/imagesContainer';
import DetailsContainer from './productDetails/productDetailsContainer';

interface ProductProps {
    productData: ProductResponse;
}

export default function Product({ productData }: ProductProps) {
    const product: ProductData = productData.masterData.current;
    const productName: string = product.name['en-US'];
    const productDescription: string = product.description['en-US'];
    const productPrice: PriceValue = product.masterVariant.prices[0].value;
    const imagesData = processVariants(product.masterVariant, product.variants);
    const sizes = Array.from(getProductsSizes(product.masterVariant, product.variants));

    const [activeIndex, setActiveIndex] = useState(0);
    const [mainImage, setMainImage] = useState(Object.values(imagesData)[0][activeIndex]);
    const [sideImages, setSideImages] = useState(Object.values(imagesData)[0]);

    return (
        <div className="product-wrapper">
            <ImagesContainer
                sideImagesSrc={sideImages}
                mainImageSrc={mainImage}
                setIndex={setActiveIndex}
                setImage={setMainImage}
            />
            <DetailsContainer
                infoProps={{ name: productName, priceData: productPrice }}
                variantProps={{
                    images: imagesData,
                    index: activeIndex,
                    setImage: setMainImage,
                    setImages: setSideImages,
                    currentImages: sideImages,
                }}
                sizesProps={{ sizes }}
                descrProps={{ description: productDescription }}
            />
        </div>
    );
}
