import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '@/utils/kickflip-api';
import { responsesErrorsHandler } from '@/utils/utils';
import { ProductResponse } from '@/types/types';
import Product from '@/components/product/product';
import Loader from '@/components/loader/loader';
import BreadCrumbs, { CrumbType } from '@/components/breadCrumbs/breadCrumbs';
import { getCartItems } from '@/services/cartSlice';

import './productPage.css';

export default function ProductPage() {
    const { section, id, slug, category } = useParams<{
        id: string;
        slug: string;
        category: string;
        section: string;
    }>();

    const [productData, setProductData] = useState<ProductResponse | null>(null);
    const [productError, setProductErrorError] = useState('');

    const itemsInCart = useSelector(getCartItems);

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
            label: 'Main',
            url: '/',
        },
        {
            label: section!,
            url: `/${section}`,
        },
        {
            label: category!,
            url: `/${section}/${category}`,
        },
        {
            label: slug!,
            url: '',
        },
    ];

    return (
        <div className="main-wrapper product-page-wrapper">
            {productData ? (
                <>
                    <BreadCrumbs crumbs={breadCrumbs} />
                    <Product productData={productData} itemsInCart={itemsInCart} />
                </>
            ) : productError ? (
                <div>{productError}</div>
            ) : (
                <Loader />
            )}
        </div>
    );
}
