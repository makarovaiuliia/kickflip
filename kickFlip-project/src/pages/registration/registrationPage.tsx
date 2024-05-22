import RegistrationForm from '@/components/form/registrationForm/regForm';
import AuthRedirectPromptData from '@/data/authRedirectPromptData';
import './regPage.css';
import AuthRedirectPrompt from '@/components/authRedirectPrompt/authRedirectPrompt';

export default function RegistrationPage() {
    return (
        <div className="registration-wrapper">
            <div className="reg-form-wrapper ">
                <h1 className="form-title">Registration</h1>
                <RegistrationForm />
            </div>
            <AuthRedirectPrompt
                question={AuthRedirectPromptData[1].question}
                button={AuthRedirectPromptData[1].button}
                link={AuthRedirectPromptData[1].link}
            />
        </div>
    );
}
