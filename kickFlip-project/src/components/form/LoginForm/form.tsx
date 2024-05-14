import React, { useEffect, useState } from 'react';
import '../form.css';

interface FormState {
    email: string;
    password: string;
}

function LoginForm(): JSX.Element {
    const [formData, setFormData] = useState<FormState>({
        email: '',
        password: '',
    });
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (passwordValid && emailValid) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [passwordValid, emailValid]);

    const checkEmailValidaty = (value: string) => {
        const EMAIL_REGEXP = /^\S+@\S+\.\S+$/;
        const errorMessage: string = 'Please enter valid e-mail address';

        if (!EMAIL_REGEXP.test(value)) {
            setEmailValid(false);
            setEmailError(errorMessage);
        } else {
            setEmailValid(true);
            setEmailError('');
        }
    };

    const checkPasswordValidaty = (value: string) => {
        const PASSWORD_REGEX: RegExp = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/;
        let errorMessage: string = '';
        if (value.length < 8) {
            errorMessage = 'Password must be at least 8 characters long';
            setPasswordValid(false);
        } else if (!PASSWORD_REGEX.test(value)) {
            errorMessage =
                'Password must contain at least one uppercase letter, one lowercase letter, and one digit. Please use only Latin characters';
            setPasswordValid(false);
        } else if (value.trim() !== value) {
            errorMessage = 'Password must not contain leading or trailing whitespace';
            setPasswordValid(false);
        } else {
            errorMessage = '';
            setPasswordValid(true);
        }

        setPasswordError(errorMessage);
    };

    const resetForm = () => {
        setFormData({
            email: '',
            password: '',
        });
        setEmailValid(false);
        setPasswordValid(false);
        setPasswordVisible(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        if (name === 'email') {
            checkEmailValidaty(value);
        }
        if (name === 'password') {
            checkPasswordValidaty(value);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        resetForm();
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const currentInput = e.target;
        const errorMessage: string = 'Required field';
        if (!currentInput.value) {
            switch (currentInput.name) {
                case 'email':
                    setEmailError(errorMessage);
                    break;
                case 'password':
                    setPasswordError(errorMessage);
                    break;
                default:
                    setPasswordError('');
                    setEmailError('');
            }
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <form onSubmit={handleSubmit} className="login-form" noValidate>
            <h1 className="form-title">Login</h1>
            <div className="input-wrapper">
                <label className="form-label" htmlFor="email-input">
                    E-mail:
                </label>
                <input
                    className="form-input"
                    type="text"
                    name="email"
                    placeholder="Type your e-mail"
                    spellCheck="false"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="email-input"
                />
                <span className="error-message">{emailValid ? '' : emailError}</span>
            </div>
            <div className="input-wrapper">
                <label className="form-label" htmlFor="password-input">
                    Password:
                    <i
                        className={`fas ${passwordVisible ? 'fa-eye' : 'fa-eye-slash'}`}
                        onClick={togglePasswordVisibility}
                        onKeyDown={togglePasswordVisibility}
                        role="button"
                        tabIndex={0}
                        aria-label="toggle"
                    />
                </label>
                <input
                    className="form-input"
                    type={passwordVisible ? 'text' : 'password'}
                    name="password"
                    placeholder="Type your password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="password-input"
                />
                <span className="error-message">{passwordValid ? '' : passwordError}</span>
            </div>
            <button className={`submit-btn ${formValid ? '' : 'disable'}`} type="submit">
                Log In
            </button>
        </form>
    );
}

export default LoginForm;
