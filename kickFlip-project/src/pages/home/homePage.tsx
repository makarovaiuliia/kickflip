import { useDispatch, useSelector } from 'react-redux';
import './homePage.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { clearRegistrationMessage, getUserSelector } from '@/services/userSlice';

/* eslint-disable import/no-absolute-path */
import dior from '/dior.webp';
/* eslint-enable import/no-absolute-path */

import Benefits from './benefits/benefits';
import Categories from './categories/categories';
import Promocode from './promocode/promocode';
import data from './categories/categoryMain/categoryMainData';

export default function HomePage(): JSX.Element {
    const dispatch = useDispatch();
    const { registrationMessage } = useSelector(getUserSelector);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (registrationMessage) {
            setShowMessage(true);
            timer = setTimeout(() => {
                setShowMessage(false);
                setTimeout(() => {
                    dispatch(clearRegistrationMessage());
                }, 1000);
            }, 5000);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [registrationMessage, dispatch]);

    return (
        <div className="home-wrapper">
            <p className={`successful-message ${showMessage ? 'show' : 'hide'}`}>{registrationMessage}</p>
            <section className="section section-hero">
                <div className="content hero">
                    <div className="hero-info">
                        <h1 className="hero_title">Live life faster, with better kicks, from Kickflip.</h1>
                        <p className="hero_text">
                            Europe’s finest streetwear outlet. With exclusive kicks from the world’s top brands.
                        </p>
                        <div className="hero_link-container">
                            <Link to="/catalog/products" className="hero_link">
                                Shop now
                            </Link>
                            <Link to="/about-us" className="hero_link hero_link-light">
                                Learn more
                            </Link>
                        </div>
                    </div>
                    <img className="hero-image" src={dior} alt="kick" />
                </div>
            </section>
            <Benefits />
            <Categories categories={data} />
            <Promocode />
        </div>
    );
}
