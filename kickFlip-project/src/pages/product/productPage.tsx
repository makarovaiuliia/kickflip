import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '@/utils/kickflip-api';
import { responsesErrorsHandler } from '@/utils/utils';
import { ProductResponse } from '@/types/types';
import Product from '@/components/product/product';
import Loader from '@/components/loader/loader';
import BreadCrumbs, { CrumbType } from '@/components/breadCrumbs/breadCrumbs';
import './productPage.css';

export default function ProductPage() {
    const { id, slug, category } = useParams<{ id: string; slug: string; category: string }>();

    const [productData, setProductData] = useState<ProductResponse | null>(null);
    const [productError, setProductErrorError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (id) {
                    const data = await getProductById(id);
                    setProductData(data);
                }
            } catch (error) {
                if (error) {
                    responsesErrorsHandler(error, setProductErrorError);
                }
            }
        };

        fetchProduct();
    }, [id]);

    const breadCrumbs: CrumbType[] = [
        {
            label: 'Sneakers',
            url: '/products',
        },
        {
            label: category!,
            url: `/products/${category}`,
        },
        {
            label: slug!,
            url: '',
        },
    ];

    return (
        <div className="main-wrapper product-page-wrapper">
            <BreadCrumbs crumbs={breadCrumbs} />
            {productData ? (
                <Product productData={productData} />
            ) : productError ? (
                <div>{productError}</div>
            ) : (
                <Loader />
            )}
        </div>
    );
}
