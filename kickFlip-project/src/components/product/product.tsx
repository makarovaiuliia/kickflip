import { ProductResponse, ProductData } from '@/types/types';

interface ProductProps {
    productInfo: ProductResponse;
}

export default function ProductInfo({ productInfo }: ProductProps) {
    const product: ProductData = productInfo.masterData.current;
    const productName: string = product.name['en-US'];
    return <div>{productName}</div>;
}
