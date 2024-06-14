import { PriceValue } from '@/types/types';
import { getFormatPrice } from '@/utils/utils';

interface OldNewPriseProps {
    oldPrice: PriceValue;
    newPrice: PriceValue | undefined;
}

export default function OldNewPrise({ oldPrice, newPrice }: OldNewPriseProps) {
    return (
        <div className="product-prices">
            <span className={`product-price ${newPrice ? 'old-price' : ''}`}>$ {getFormatPrice(oldPrice)}</span>
            {newPrice && <span className="product-price">$ {getFormatPrice(newPrice)}</span>}
        </div>
    );
}
