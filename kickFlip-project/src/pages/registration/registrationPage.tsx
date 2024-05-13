import RegistrationForm from '../../components/form/registrationForm/regForm';
import './regPage.css';

export default function RegistrationPage() {
    return (
        <div className="regPage-wrapper">
            <h1 className="form-title">Registration</h1>
            <RegistrationForm />
        </div>
    );
}
