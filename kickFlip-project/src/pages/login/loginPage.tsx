import LoginForm from '@/components/form/LoginForm/loginForm';
import AuthRedirectPromptData from '@/data/authRedirectPromptData';
import './loginPage.css';
import AuthRedirectPrompt from '@/components/authRedirectPrompt/authRedirectPrompt';

export default function LoginPage() {
    return (
        <div className="main-wrapper login-wrapper">
            <LoginForm />
            <AuthRedirectPrompt
                question={AuthRedirectPromptData[0].question}
                button={AuthRedirectPromptData[0].button}
                link={AuthRedirectPromptData[0].link}
            />
        </div>
    );
}
