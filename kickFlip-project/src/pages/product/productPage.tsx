import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '@/utils/kickflip-api';
import { responsesErrorsHandler } from '@/utils/utils';
import { ProductResponse } from '@/types/types';
import Product from '@/components/product/product';
import './productPage.css';

export default function ProductPage() {
    const productId = useParams<{ id: string }>();
    const [productData, setProductData] = useState<ProductResponse | null>(null);
    const [productError, setProductErrorError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (productId.id) {
                    const data = await getProductById(productId.id);
                    setProductData(data);
                }
            } catch (error) {
                if (error) {
                    responsesErrorsHandler(error, setProductErrorError);
                }
            }
        };

        fetchProduct();
    }, [productId]);

    return (
        <div className="main-wrapper">
            {productData ? (
                <Product productData={productData} />
            ) : productError ? (
                <div> {productError}</div>
            ) : (
                <div className="load">Loading...</div>
            )}
        </div>
    );
}
