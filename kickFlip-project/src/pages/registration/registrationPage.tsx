import { Link } from 'react-router-dom';

import RegistrationForm from '@/components/form/registrationForm/regForm';
import './regPage.css';

export default function RegistrationPage() {
    return (
        <>
            <div className="reg-page-wrapper ">
                <h1 className="form-title">Registration</h1>
                <RegistrationForm />
            </div>
            <div className="reg-page-question">
                <p className="reg-page-question-text">Have an account in Kickflip?</p>
            </div>
            <Link className="reg-page-login-button" to="/login">
                LOGIN WITH YOUR ACCOUNT
            </Link>
        </>
    );
}
