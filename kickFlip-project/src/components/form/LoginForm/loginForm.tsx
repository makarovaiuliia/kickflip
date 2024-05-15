import React, { useEffect, useState } from 'react';
import { ErrorMessage, LogInData } from '@/types/types';
import '../form.css';
import { useDispatch } from '@/services/store';
import { getUserByID, loginUser } from '@/services/userSlice';
import getCustomerId from '@/utils/utils';

function LoginForm(): JSX.Element {
    const [formData, setFormData] = useState<LogInData>({
        email: '',
        password: '',
    });
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formValid, setFormValid] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (passwordValid && emailValid) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [passwordValid, emailValid]);

    const checkEmailValidity = (value: string) => {
        const EMAIL_REGEXP = /^\S+@\S+\.\S+$/;
        const errorMessage: string = ErrorMessage.EMAIL_ERROR;

        if (!EMAIL_REGEXP.test(value)) {
            setEmailValid(false);
            setEmailError(errorMessage);
        } else {
            setEmailValid(true);
            setEmailError('');
        }
    };

    const checkPasswordValidity = (value: string) => {
        const PASSWORD_REGEX: RegExp = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/;
        let errorMessage: string = '';
        if (value.length < 8) {
            errorMessage = ErrorMessage.PASSWORD_ERROR_LENGTH;
            setPasswordValid(false);
        } else if (!PASSWORD_REGEX.test(value)) {
            errorMessage = ErrorMessage.PASSWORD_ERROR_REGEX;
            setPasswordValid(false);
        } else if (value.trim() !== value) {
            errorMessage = ErrorMessage.PASSWORD_ERROR_SPACE;
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
            checkEmailValidity(value);
        }
        if (name === 'password') {
            checkPasswordValidity(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await dispatch(loginUser(formData)).unwrap();
            const userID = getCustomerId(response.scope);

            if (userID) {
                await dispatch(getUserByID(userID));
            }

            // TODO: добавить навигацию navigate('/'), когда появится роутинг
        } catch (error) {
            // console.error(error);
        }

        resetForm();
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const currentInput = e.target;
        const errorMessage: string = ErrorMessage.REQUIRED_FIELD;
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
