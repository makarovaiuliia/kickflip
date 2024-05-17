import { Outlet } from 'react-router-dom';

import Footer from '../footer/footer';
import Header from '../header/header';

import './basicLayout.css';

function BasicLayout() {
    return (
        <>
            <Header />
            <main className="main">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default BasicLayout;
