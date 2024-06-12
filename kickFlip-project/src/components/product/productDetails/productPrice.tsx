import { ProductPricesProps } from '@/types/componentsInterfaces';

export default function ProductPrices({ priceData }: ProductPricesProps) {
    const regularPrice = priceData.value;
    const discountPrice = priceData.discounted ? priceData.discounted.value : undefined;

    return (
        <div className="product-prices">
            <span className={`product-price ${discountPrice ? 'old-price' : ''}`}>
                $ {regularPrice.centAmount / 10 ** regularPrice.fractionDigits}
            </span>
            {discountPrice && (
                <span className="product-price">$ {discountPrice.centAmount / 10 ** discountPrice.fractionDigits}</span>
            )}
        </div>
    );
}
