import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { CartResponse } from '@/types/types';
import { responsesErrorsHandler } from '@/utils/utils';
import { getCartbyId } from '@/utils/kickflip-api';
import Loader from '@/components/loader/loader';
import Cart from '@/components/cart/cart';
import { getCartId } from '@/services/cartSlice';

export default function CartPage(): JSX.Element {
    const [cartData, setCartData] = useState<CartResponse | null>();
    const [cartError, setCartError] = useState('');

    const id: string = useSelector(getCartId);

    useEffect(() => {
        const fetchProduct = async () => {
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

        fetchProduct();
    }, [id]);
    return (
        <div className="main-wrapper cart-page-wrapper">
            {cartData ? <Cart cartData={cartData} /> : cartError ? <div>{cartError}</div> : <Loader />}
        </div>
    );
}
