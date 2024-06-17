import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '@/utils/kickflip-api';
import { responsesErrorsHandler } from '@/utils/utils';
import { ProductResponse } from '@/types/types';
import Product from '@/components/product/product';
import Loader from '@/components/loader/loader';
import BreadCrumbs, { CrumbType } from '@/components/breadCrumbs/breadCrumbs';
import { clearErrorMessage, getCartError, getCartItems } from '@/services/cartSlice';
import { useDispatch } from '@/services/store';

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

    const cartErr = useSelector(getCartError);
    const cartErrMessage = cartErr === 'Failed to fetch' ? 'Internet is disconected' : cartErr;
    const [showMessage, setShowMessage] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (cartErrMessage) {
            setShowMessage(true);
            timer = setTimeout(() => {
                setShowMessage(false);
                setTimeout(() => {
                    dispatch(clearErrorMessage());
                }, 1000);
            }, 5000);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [cartErrMessage, dispatch]);

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
            <p className={`successful-update-message ${showMessage ? 'show' : 'hide'}`}>{cartErrMessage}</p>
        </div>
    );
}
