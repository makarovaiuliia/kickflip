import { Link } from 'react-router-dom';
import { AuthRedirectPromptDataType } from '@/types/types';
import './authRedirectPrompt.css';

export default function AuthRedirectPrompt({ question, button, link }: AuthRedirectPromptDataType) {
    return (
        <div className="auth-redirect-prompt">
            <p>
                {question}
                <Link className="auth-redirect-prompt-link" to={link}>
                    {button}
                </Link>
            </p>
        </div>
    );
}
