import { SyntheticEvent, useCallback, useState } from 'react';
import './mailingForm.css';

export default function MailingForm(): JSX.Element {
    const [signedUp, setSignedUp] = useState<boolean>(false);

    const handleSubmit = useCallback(
        (event: SyntheticEvent) => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            setSignedUp(true);
            form.reset();
            // makes an illusion of sending form to the server.
            setTimeout(() => {
                setSignedUp(false);
            }, 2000);
        },
        [setSignedUp]
    );
    return (
        <form className="mailing-form" onSubmit={handleSubmit}>
            <input className="mailing-form_input" placeholder="Enter your e-mail" />
            <button type="submit" className="mailing-form_button">
                {signedUp ? 'Yeey!' : 'Sign Up'}
            </button>
        </form>
    );
}
