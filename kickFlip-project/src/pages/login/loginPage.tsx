import { Link } from 'react-router-dom';
import LoginForm from '@/components/form/LoginForm/loginForm';
import './loginPage.css';

export default function LoginPage() {
    return (
        <>
            <LoginForm />
            <div className="login-question">
                <p className="login-question-text">New to Kickplip?</p>
            </div>
            <Link className="login-register-button" to="/registration">
                CREATE YOUR ACCOUNT
            </Link>
        </>
    );
}
