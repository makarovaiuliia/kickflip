import OldNewPrise from '@/components/oldNewPrice/oldNewPrice';
import { ProductPricesProps } from '@/types/componentsInterfaces';

export default function ProductPrices({ priceData }: ProductPricesProps) {
    const regularPrice = priceData.value;
    const discountPrice = priceData.discounted ? priceData.discounted.value : undefined;

    return <OldNewPrise oldPrice={regularPrice} newPrice={discountPrice} />;
}
