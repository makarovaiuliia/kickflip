import { ProductInfoProps } from '@/types/componentsInterfaces';
import ProductPrices from './productPrice';

export default function ProductInfo({ name, priceData }: ProductInfoProps) {
    return (
        <div className="product-info">
            <h1 className="product-title">{name}</h1>
            <ProductPrices priceData={priceData} />
        </div>
    );
}
