import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ErrorMessage, SignUpDataForm } from '@/types/types';
import { useDispatch } from '@/services/store';
import { signUpUser } from '@/services/userSlice';
import FormField from '@/components/formFields/formField';
import { responsesErrorsHandler } from '@/utils/utils';

import '../form.css';

export default function ChangePasswordForm() {
    const [registrationError, setRegistrationError] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<SignUpDataForm>({ mode: 'all' });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit: SubmitHandler<SignUpDataForm> = async (data: SignUpDataForm) => {
        setRegistrationError('');
        try {
            await dispatch(signUpUser(data)).unwrap();
            navigate('/');
            reset();
        } catch (error) {
            responsesErrorsHandler(error, setRegistrationError);
        }
    };

    const PASSWORD_REGEX: RegExp = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/;

    return (
        <form className="change-password-form" onSubmit={handleSubmit(submit)}>
            <FormField
                type="password"
                label="New Password:"
                id="new-password-input"
                name="password"
                placeholder="Enter your password"
                register={register}
                errors={errors.password}
                validationRules={{
                    required: ErrorMessage.REQUIRED_FIELD,
                    pattern: { value: PASSWORD_REGEX, message: ErrorMessage.PASSWORD_ERROR_REGEX },
                    minLength: { value: 8, message: ErrorMessage.PASSWORD_ERROR_LENGTH },
                }}
            />
            <div className="input-wrapper">
                <button className={`change-user-btn ${isValid ? '' : 'disable'}`} type="submit">
                    Save
                </button>
            </div>

            <span className="error-message stretched">{registrationError}</span>
        </form>
    );
}
