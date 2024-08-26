import './placeOrder.css';

/* eslint-disable import/no-absolute-path */
import checkmark from '/checkmark.svg';
/* eslint-enable import/no-absolute-path */

export default function PlaceOrder() {
    return (
        <div className="place-order_wrapper">
            <img src={checkmark} alt="checkmark" className="place-order_checkmark" />
            <h2>Your order is placed successfully!</h2>
        </div>
    );
}
