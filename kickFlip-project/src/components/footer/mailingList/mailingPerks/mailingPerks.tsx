import './mailingPerks.css';

/* eslint-disable import/no-absolute-path */
import checkmark from '/checkmark.svg';
/* eslint-enable import/no-absolute-path */

interface MailingPerksProps {
    children: string;
}

export default function MailingPerks({ children }: MailingPerksProps): JSX.Element {
    return (
        <div className="mailing-perks">
            <img src={checkmark} className="mailing-perks_image" alt="checkmark" />
            <p className="mailing-perks_text">{children}</p>
        </div>
    );
}
