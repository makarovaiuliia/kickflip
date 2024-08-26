import { Link } from 'react-router-dom';
import MailingForm from './mailingForm/mailingForm';
import './mailingList.css';
import MailingPerks from './mailingPerks/mailingPerks';

/* eslint-disable import/no-absolute-path */
import logo from '/logoWhite.svg';
/* eslint-enable import/no-absolute-path */

export default function MailingList(): JSX.Element {
    return (
        <div className="mailing-list">
            <Link to="/">
                <img src={logo} alt="Kickflip" className="mailing-list_logo" />
            </Link>
            <div className="mailing-list_container">
                <p className="mailing-list_title">Join the Kickflip mailing list today</p>
                <div className="mailing-list_form">
                    <div className="mailing-perks_container">
                        <MailingPerks>Exclusive drops</MailingPerks>
                        <MailingPerks>Monthly discounts</MailingPerks>
                        <MailingPerks>Event invites</MailingPerks>
                    </div>
                    <MailingForm />
                </div>
            </div>
        </div>
    );
}
