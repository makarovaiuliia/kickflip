import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { CartResponse } from '@/types/types';
import { responsesErrorsHandler } from '@/utils/utils';
import { getCartById } from '@/utils/kickflip-api';
import Loader from '@/components/loader/loader';
import Cart from '@/components/cart/cart';
import { getCartId } from '@/services/cartSlice';
import EmptyCart from '@/components/emptyCart/emptyCart';

export default function CartPage(): JSX.Element {
    const [cartData, setCartData] = useState<CartResponse | null>();
    const [cartError, setCartError] = useState('');
    const [isCartEmpty, setCartIsEmpty] = useState(true);
    const [loading, setLoading] = useState(true);

    const id: string = useSelector(getCartId);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                if (id) {
                    const data = await getCartById(id);
                    setCartData(data);
                    setCartIsEmpty(!data.lineItems.length);
                }
            } catch (error) {
                if (error) {
                    responsesErrorsHandler(error, setCartError);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [id]);
    return (
        <div className="main-wrapper cart-page-wrapper">
            {loading ? (
                <Loader />
            ) : cartError ? (
                <div>{cartError}</div>
            ) : cartData ? (
                isCartEmpty ? (
                    <EmptyCart />
                ) : (
                    <Cart cartData={cartData} setCartData={setCartData} setIsEmpty={setCartIsEmpty} />
                )
            ) : (
                <Loader />
            )}
        </div>
    );
}
