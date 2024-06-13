import { DetailsContainerProps } from '@/types/componentsInterfaces';
import ProductDescription from './productDescr';
import ProductInfo from './productInfo';
import ProductSizes from './productSizes';
import VariantsImages from './productVariantsImages';
import MainImage from '../productImages/mainImage';

export default function DetailsContainer({
    infoProps,
    variantProps,
    sizesProps,
    descrProps,
    imgProps,
    isMobile,
    ifProductInCart,
}: DetailsContainerProps) {
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
            <button className="cart-btn" type="button">
                {ifProductInCart === true ? 'Remove from cart' : 'Add to cart'}
            </button>
            <ProductDescription description={descrProps.description} />
        </div>
    );
}
