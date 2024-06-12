import './benefits.css';

/* eslint-disable import/no-absolute-path */
import car from '/car.svg';
import cash from '/cash.svg';
import bag from '/bag.svg';
import help from '/help.svg';
/* eslint-enable import/no-absolute-path */

export default function Benefits(): JSX.Element {
    return (
        <section className="section section-benefits">
            <div className="content benefits">
                <div className="section_text-container">
                    <h3 className="section_subtitle">We’re a bit different</h3>
                    <h2 className="section_title">Understand the Kickflip</h2>
                </div>

                <ul className="section_list benefits_list">
                    <li className="benefits_list-item">
                        <img src={car} alt="car icon" className="benefits_image" />
                        <h4 className="benefits_list-item-title">Speedy delivery</h4>
                        <p className="benefits_list-item-text">Next day latest delivery in Vienna</p>
                    </li>
                    <li className="benefits_list-item">
                        <img src={cash} alt="money icon" className="benefits_image" />
                        <h4 className="benefits_list-item-title">Best price guarantee</h4>
                        <p className="benefits_list-item-text">Find better, get paid the difference</p>
                    </li>
                    <li className="benefits_list-item">
                        <img src={help} alt="support icon" className="benefits_image" />
                        <h4 className="benefits_list-item-title">24 hours support</h4>
                        <p className="benefits_list-item-text">Got a problem? We’re here for ya</p>
                    </li>
                    <li className="benefits_list-item">
                        <img src={bag} alt="cart icon" className="benefits_image" />
                        <h4 className="benefits_list-item-title">Over 10,000 products</h4>
                        <p className="benefits_list-item-text">The best shopping availability</p>
                    </li>
                </ul>
            </div>
        </section>
    );
}
