import { Link, Outlet } from 'react-router-dom';

import Footer from '../components/footer/footer';

import './page.css';

function Page() {
    return (
        <>
            <header className="header">
                <div className="header-wrapper">
                    <div className="logo">
                        <Link className="logo-link" to="/">
                            <svg
                                width="141"
                                height="18"
                                viewBox="0 0 141 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5.232 17H0.72V0.92H5.232V6.896H8.472L12.384 0.92H17.784L12.216 8.816L17.664 17H12.264L8.52 11.288H5.232V17ZM25.5467 17H21.0347V0.92H25.5467V17ZM38.3878 17.24C32.7958 17.24 29.5078 13.976 29.5078 8.96C29.5078 3.944 32.7958 0.68 38.3878 0.68C43.7878 0.68 47.0278 3.248 47.0278 7.544V7.952H41.9878V7.544C41.9878 5.72 41.1238 5 38.4598 5C35.1958 5 34.3078 5.768 34.3078 8.96C34.3078 12.152 35.1958 12.92 38.4598 12.92C41.1238 12.92 41.9878 12.2 41.9878 10.376V9.968H47.0278V10.376C47.0278 14.672 43.7878 17.24 38.3878 17.24ZM55.4886 17H50.9766V0.92H55.4886V6.896H58.7286L62.6406 0.92H68.0406L62.4726 8.816L67.9206 17H62.5206L58.7766 11.288H55.4886V17ZM75.8033 17H71.2913V0.92H85.6673V4.976H75.8033V7.376H85.3073V11.408H75.8033V17ZM103.414 17H89.6138V0.92H94.1258V12.944H103.414V17ZM111.886 17H107.374V0.92H111.886V17ZM120.599 17H116.087V0.92H124.991C128.807 0.92 131.207 3.104 131.207 6.92C131.207 10.736 128.807 12.944 124.991 12.944H120.599V17ZM124.487 4.976H120.599V8.888H124.487C126.071 8.888 126.719 8.576 126.719 6.92C126.719 5.288 126.071 4.976 124.487 4.976Z"
                                    fill="#18313F"
                                />
                                <path d="M140.781 17H134.925V12.392H140.781V17Z" fill="#FF6546" />
                            </svg>
                        </Link>
                    </div>
                    <nav className="categories-nav">
                        <div className="categories-nav-list">
                            <Link className="categories-nav-link" to="/">
                                Home
                            </Link>
                            <Link className="categories-nav-link" to="/products">
                                Products
                            </Link>
                        </div>
                    </nav>
                    <nav className="services-nav">
                        <div className="services-nav-list">
                            <Link className="services-nav-link" to="/login">
                                Log in
                            </Link>
                            <Link className="services-nav-link" to="/cart">
                                Cart
                            </Link>
                        </div>
                    </nav>
                </div>
            </header>
            <main className="main">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default Page;
