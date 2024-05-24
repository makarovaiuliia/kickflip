import { DetailsContainerProps } from '@/types/componentsInterfaces';
import ProductDescription from './productDescr';
import ProductInfo from './productInfo';
import ProductSizes from './productSizes';
import VariantsImages from './productVariantsImages';

export default function DetailsContainer({ infoProps, variantProps, sizesProps, descrProps }: DetailsContainerProps) {
    return (
        <div className="details-container">
            <ProductInfo name={infoProps.name} priceData={infoProps.priceData} />
            <VariantsImages
                images={variantProps.images}
                index={variantProps.index}
                setImage={variantProps.setImage}
                setImages={variantProps.setImages}
                currentImages={variantProps.currentImages}
            />
            <ProductSizes sizes={sizesProps.sizes} />
            <button className="cart-btn" type="button">
                Add to cart
            </button>
            <ProductDescription description={descrProps.description} />
        </div>
    );
}
