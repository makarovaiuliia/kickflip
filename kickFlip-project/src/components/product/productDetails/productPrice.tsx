import { ProductPricesProps } from '@/types/componentsInterfaces';
import { getFormatPrice } from '@/utils/utils';

export default function ProductPrices({ priceData }: ProductPricesProps) {
    const regularPrice = priceData.value;
    const discountPrice = priceData.discounted ? priceData.discounted.value : undefined;

    return (
        <div className="product-prices">
            <span className={`product-price ${discountPrice ? 'old-price' : ''}`}>
                $ {getFormatPrice(regularPrice)}
            </span>
            {discountPrice && <span className="product-price">$ {getFormatPrice(discountPrice)}</span>}
        </div>
    );
}
