// import RegistrationPage from '@/pages/registration/registrationPage';

import { Routes, Route } from 'react-router-dom';

// import Header from '../header/header';
import HomePage from '../../pages/home/homePage';
import LoginPage from '../../pages/login/loginPage';
import RegistrationPage from '../../pages/registration/registrationPage';
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
            </Route>
        </Routes>
    );
}

export default App;
