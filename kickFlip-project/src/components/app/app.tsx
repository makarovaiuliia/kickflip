import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
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
import ProfilePage from '@/pages/profilePage';
import ProtectedRoute from '@/utils/protectedRoute';
import Card from '@/components/card/card';
import { mockData } from '../card/mockData';

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
                <Route path="product" element={<Card productInfo={mockData} />} />
                {/* TODO: Вставить сюда элемент, который является страницей продукта */}
                {/* <Route path="products/:id" element={} /> */}
                <Route
                    path="profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
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
