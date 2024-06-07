import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from '@/services/store';
import { getAnonymousToken, getUser } from '@/services/userSlice';
import { getCookie } from '@/utils/cookie';

import HomePage from '@/pages/home/homePage';
import LoginPage from '@/pages/login/loginPage';
import RegistrationPage from '@/pages/registration/registrationPage';
import NotFoundPage from '@/pages/notFoundPage/notFoundPage';
import ProductsPage from '@/pages/products/productsPage';
import CartPage from '@/pages/cart/cartPage';

import BasicLayoutPage from '../layout/basicLayout';
import ProfilePage from '@/pages/profilePage/profilePage';
import ProtectedRoute from '@/utils/protectedRoute';
import { getCategories } from '@/services/sneakersSlice';

import ProfileAccount from '../profileAccount/profileAccount';
import ProfileAddress from '../profileAddress/profileAddress';
import ProfileOrders from '../profileOrders/profileOrders';
import ProfilePassword from '../profilePassword/profilePassword';
import ProductPage from '@/pages/product/productPage';
import Loader from '../loader/loader';

function App() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getCookie('accessToken');
                if (token) {
                    try {
                        await dispatch(getUser()).unwrap();
                    } catch (error) {
                        await dispatch(getAnonymousToken()).unwrap();
                    }
                } else {
                    await dispatch(getAnonymousToken()).unwrap();
                }
                await dispatch(getCategories()).unwrap();
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

    if (loading) {
        return <Loader />;
    }

    return (
        <Routes>
            <Route path="/" element={<BasicLayoutPage />}>
                <Route index element={<HomePage />} />
                <Route path="/:section" element={<ProductsPage />} />
                <Route path="/:section/:category/:id/:slug" element={<ProductPage />} />
                <Route path="/:section/:category" element={<ProductsPage />} />
                <Route
                    path="profile/*"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                >
                    <Route path="account" element={<ProfileAccount />} />
                    <Route path="orders" element={<ProfileOrders />} />
                    <Route path="address" element={<ProfileAddress />} />
                    <Route path="password" element={<ProfilePassword />} />
                </Route>
                <Route
                    path="login"
                    element={
                        <ProtectedRoute onlyUnAuth>
                            <LoginPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="registration"
                    element={
                        <ProtectedRoute onlyUnAuth>
                            <RegistrationPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="cart" element={<CartPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

export default App;
