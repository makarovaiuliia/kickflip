import { ProductInfoProps } from '@/types/componentsInterfaces';

export default function ProductInfo({ name, priceData }: ProductInfoProps) {
    return (
        <div className="product-info">
            <h1 className="product-title">{name}</h1>
            <span className="product-price">{`$ ${priceData.centAmount / 10 ** priceData.fractionDigits}`}</span>
        </div>
    );
}
