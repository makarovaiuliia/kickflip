import { useState } from 'react';
import { ProductResponse, ProductData, Price } from '@/types/types';
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
    const productPrices: Price = product.masterVariant.prices[0];
    const imagesData = processVariants(product.masterVariant, product.variants);
    const sizes = Array.from(getProductsSizes(product.masterVariant, product.variants));

    const [activeIndex, setActiveIndex] = useState(0);
    const [images, setImages] = useState(Object.values(imagesData)[0]);

    return (
        <div className="product-wrapper">
            <ImagesContainer imagesSrc={images} activeIndex={activeIndex} setIndex={setActiveIndex} />
            <DetailsContainer
                infoProps={{ name: productName, priceData: productPrices }}
                variantProps={{
                    images: imagesData,
                    setImages,
                    currentImages: images,
                }}
                sizesProps={{ sizes }}
                descrProps={{ description: productDescription }}
            />
        </div>
    );
}
