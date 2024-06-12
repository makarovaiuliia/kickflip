import { useEffect, useState } from 'react';
import { CartResponse } from '@/types/types';
import { responsesErrorsHandler } from '@/utils/utils';
import { getCartbyId } from '@/utils/kickflip-api';
import Loader from '@/components/loader/loader';
import mockCart from './mockCartData';
import Cart from '@/components/cart/cart';

export default function CartPage(): JSX.Element {
    const [cartData, setCartData] = useState<CartResponse | null>(mockCart);
    const [cartError, setCartError] = useState('');

    const id: string = '';

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                if (id) {
                    const data = await getCartbyId(id);
                    setCartData(data);
                }
            } catch (error) {
                if (error) {
                    responsesErrorsHandler(error, setCartError);
                }
            }
        };

        fetchCartItems();
    }, [id]);
    return (
        <div className="main-wrapper cart-page-wrapper">
            {cartData ? (
                <Cart cartData={cartData} setCartData={setCartData} />
            ) : cartError ? (
                <div>{cartError}</div>
            ) : (
                <Loader />
            )}
        </div>
    );
}
