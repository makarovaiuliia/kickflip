import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, getCartById } from '@/utils/kickflip-api';
import { responsesErrorsHandler } from '@/utils/utils';
import { ProductResponse, CartResponse } from '@/types/types';
import Product from '@/components/product/product';
import Loader from '@/components/loader/loader';
import BreadCrumbs, { CrumbType } from '@/components/breadCrumbs/breadCrumbs';
import { getCartId } from '@/services/cartSlice';
// import { getAllSneakers } from '@/services/sneakersSlice';

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

    const [cartData, setCartData] = useState<CartResponse | null>();
    const [cartError, setCartError] = useState('');

    const idCart: string = useSelector(getCartId);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                if (idCart) {
                    const data = await getCartById(idCart);
                    setCartData(data);
                }
            } catch (error) {
                if (error) {
                    responsesErrorsHandler(error, setCartError);
                }
            }
        };

        fetchCartItems();
    }, [cartError, idCart]);

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
                    <Product productData={productData} cartData={cartData!} setCartData={setCartData} />
                </>
            ) : productError ? (
                <>
                    <div>{productError}</div>
                    <div>{cartError}</div>
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
}
