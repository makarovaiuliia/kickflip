import React, { useState } from 'react';
import './form.css';

interface FormState {
    name: string;
    email: string;
}

function MyForm(): JSX.Element {
    const [formData, setFormData] = useState<FormState>({
        name: '',
        email: '',
    });
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setFormData({
            name: '',
            email: '',
        });
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h1 className="form-title">Login</h1>
            <div className="input-wrapper">
                <label className="form-label" htmlFor="email-input">
                    E-mail:
                </label>
                <input
                    className="form-input"
                    type="email"
                    name="name"
                    placeholder="Type your e-mail"
                    value={formData.name}
                    onChange={handleChange}
                    id="email-input"
                />
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
                    name="email"
                    placeholder="Type your password"
                    value={formData.email}
                    onChange={handleChange}
                    id="password-input"
                />
            </div>
            <button className="submit-btn" type="submit">
                Log In
            </button>
        </form>
    );
}

export default MyForm;
