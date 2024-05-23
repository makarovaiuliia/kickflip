import { useEffect, useState } from 'react';
import { getProductByKey } from '@/utils/kickflip-api';
import { responsesErrorsHandler } from '@/utils/utils';
import { ProductResponse } from '@/types/types';
import ProductInfo from '@/components/product/product';

interface ProductProps {
    productKey: string;
}

export default function ProductPage({ productKey }: ProductProps) {
    const [productData, setProductData] = useState<ProductResponse | null>(null);
    const [productError, setProductErrorError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductByKey(productKey);
                setProductData(data);
            } catch (error) {
                if (error) {
                    responsesErrorsHandler(error, setProductErrorError);
                }
            }
        };

        fetchProduct();
    }, [productKey]);

    if (productError) {
        return <div> {productError}</div>;
    }

    if (!productData) {
        return <div>Loading...</div>;
    }

    return <ProductInfo productInfo={productData} />;
}
