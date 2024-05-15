import { Routes, Route } from 'react-router-dom';

import HomePage from '../../pages/home/homePage';
import LoginPage from '../../pages/login/loginPage';
import RegistrationPage from '../../pages/registration/registrationPage';
import NotFoundPage from '../../pages/notfoundpage/notfoundPage';
import ProductsPage from '@/pages/products/productsPage';
import CartPage from '../../pages/cart/cartPage';

import Page from '../../pages/page';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Page />}>
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
