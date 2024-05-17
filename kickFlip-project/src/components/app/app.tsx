import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from '@/services/store';
import { getAnonymousToken, getUser } from '@/services/userSlice';
import { getCookie } from '@/utils/cookie';

import HomePage from '../../pages/home/homePage';
import LoginPage from '../../pages/login/loginPage';
import RegistrationPage from '../../pages/registration/registrationPage';
import NotFoundPage from '../../pages/notfoundpage/notfoundPage';
import ProductsPage from '@/pages/products/productsPage';
import CartPage from '../../pages/cart/cartPage';

import BasicLayoutPage from '../layout/basicLayout';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = getCookie('accessToken');
        if (token) {
            dispatch(getUser())
                .unwrap()
                .catch(() => {
                    dispatch(getAnonymousToken());
                });
        } else {
            dispatch(getAnonymousToken());
        }
    }, [dispatch]);

    return (
        <Routes>
            <Route path="/" element={<BasicLayoutPage />}>
                <Route index element={<HomePage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="registration" element={<RegistrationPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

export default App;
