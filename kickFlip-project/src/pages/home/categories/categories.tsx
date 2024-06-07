import { Link } from 'react-router-dom';
import './categories.css';

/* eslint-disable import/no-absolute-path */
import outlet from '/airJordan.png';
import kids from '/flexRunner.png';
import women from '/pegasus.png';
import men from '/genome.png';
/* eslint-enable import/no-absolute-path */

export default function Categories(): JSX.Element {
    return (
        <section className="section section-categories">
            <div className="content categories-main">
                <div className="section_text-container">
                    <h3 className="section_subtitle">Get fresh today</h3>
                    <h2 className="section_title">What’s on the menu?</h2>
                </div>

                <ul className="section_list categories-main_list">
                    <li className="category-main_list-item">
                        <img src={men} alt="men kick" className="category-main_image" />
                        <Link to="/product/men">
                            <h4 className="category-main_list-item-title">Men</h4>
                        </Link>
                    </li>
                    <li className="category-main_list-item">
                        <img src={women} alt="women kick" className="category-main_image" />
                        <Link to="/product/women">
                            <h4 className="category-main_list-item-title">Women</h4>
                        </Link>
                    </li>
                    <li className="category-main_list-item">
                        <img src={kids} alt="kids kick" className="category-main_image" />
                        <Link to="/product/kids">
                            <h4 className="category-main_list-item-title">Kids</h4>
                        </Link>
                    </li>
                    <li className="category-main_list-item">
                        <img src={outlet} alt="outlet kick" className="category-main_image" />
                        <Link to="/outlet">
                            <h4 className="category-main_list-item-title">Outlet</h4>
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
    );
}
