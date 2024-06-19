import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { ErrorMessage, UpdatePasswordForm } from '@/types/types';
import { useDispatch } from '@/services/store';
import { updateUserPassword, getUserSelector, loginUser, getUser } from '@/services/userSlice';
import FormField from '@/components/formFields/formField';
import { responsesErrorsHandler } from '@/utils/utils';

import '../form.css';

export default function ChangePasswordForm() {
    const { user } = useSelector(getUserSelector);
    const [updatePasswordError, setUpdatePasswordError] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<UpdatePasswordForm>({ mode: 'all' });

    const dispatch = useDispatch();

    const submit: SubmitHandler<UpdatePasswordForm> = async (data: UpdatePasswordForm) => {
        const requestData = {
            id: user?.id,
            version: user?.version,
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
        };
        const requestLogInData = {
            email: user!.email!,
            password: data.newPassword,
        };
        setUpdatePasswordError('');
        try {
            await dispatch(updateUserPassword(requestData)).unwrap();
            reset();
            await dispatch(loginUser(requestLogInData)).unwrap();
            await dispatch(getUser());
        } catch (error) {
            responsesErrorsHandler(error, setUpdatePasswordError);
        }
    };

    const PASSWORD_REGEX: RegExp = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/;

    return (
        <form className="change-password-form" onSubmit={handleSubmit(submit)}>
            <FormField
                type="password"
                label="Current Password:"
                id="current-password-input"
                name="currentPassword"
                placeholder="Enter your current password"
                register={register}
                errors={errors.currentPassword}
            />
            <FormField
                type="password"
                label="New Password:"
                id="new-password-input"
                name="newPassword"
                placeholder="Enter your new password"
                register={register}
                errors={errors.newPassword}
                validationRules={{
                    required: ErrorMessage.REQUIRED_FIELD,
                    pattern: { value: PASSWORD_REGEX, message: ErrorMessage.PASSWORD_ERROR_REGEX },
                    minLength: { value: 8, message: ErrorMessage.PASSWORD_ERROR_LENGTH },
                }}
            />
            <div className="input-wrapper">
                <button className={`change-user-btn ${isValid ? '' : 'disable'}`} type="submit">
                    Update
                </button>
            </div>
            <span className="error-message stretched">{updatePasswordError}</span>
        </form>
    );
}
