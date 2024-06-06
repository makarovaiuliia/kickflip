import { SyntheticEvent, useState } from 'react';
import './mailingForm.css';

export default function MailingForm(): JSX.Element {
    const [signedUp, setSignedUp] = useState<boolean>(false);
    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        setSignedUp(true);
        setTimeout(() => {
            setSignedUp(false);
        }, 2000);
    };
    return (
        <form className="mailing-form" onSubmit={handleSubmit}>
            <input className="mailing-form_input" placeholder="Enter your e-mail" />
            <button type="submit" className="mailing-form_button">
                {signedUp ? 'Yeey!' : 'Sign Up'}
            </button>
        </form>
    );
}
