import { useSelector } from 'react-redux';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ErrorMessage, UpdateUserProfileDataForm } from '@/types/types';
import '../form.css';
import { useDispatch } from '@/services/store';
import { updateUserProfileData, getUserSelector } from '@/services/userSlice';
import FormField from '@/components/formFields/formField';
import { responsesErrorsHandler, ageRestrictionCheck } from '@/utils/utils';

export default function ChangeUserDataForm() {
    const [abilityChangeForm, setAbilityChangeForm] = useState(true);

    const handleProtectUpdateFormAbility = (abilityChange: boolean) => {
        setAbilityChangeForm(abilityChange);
    };

    const { user } = useSelector(getUserSelector);
    const [updateUserDataError, setUpdateUserDataError] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<UpdateUserProfileDataForm>({ mode: 'all' });

    const dispatch = useDispatch();

    const submit: SubmitHandler<UpdateUserProfileDataForm> = async (data: UpdateUserProfileDataForm) => {
        const requestData = {
            id: user?.id,
            version: user?.version,
            data,
        };
        setUpdateUserDataError('');
        try {
            await dispatch(updateUserProfileData(requestData)).unwrap();
        } catch (error) {
            reset();
            responsesErrorsHandler(error, setUpdateUserDataError);
        }
    };

    const EMAIL_REGEXP: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const ONLY_LETTER_REGEX: RegExp = /^[A-Za-z]+$/;

    const validationRules = {
        email: {
            required: ErrorMessage.REQUIRED_FIELD,
            pattern: { value: EMAIL_REGEXP, message: ErrorMessage.EMAIL_ERROR },
        },
        names: {
            required: ErrorMessage.REQUIRED_FIELD,
            pattern: { value: ONLY_LETTER_REGEX, message: ErrorMessage.ERROR_REGEX },
            minLength: { value: 1, message: ErrorMessage.ERROR_LENGTH },
        },
        dateBirth: {
            required: ErrorMessage.REQUIRED_FIELD,
            validate: (value: Date) => ageRestrictionCheck(value),
        },
    };

    return (
        <form className="change-user-data-form" onSubmit={handleSubmit(submit)}>
            <FormField
                label="E-mail:"
                id="email-input"
                name="email"
                placeholder="Enter your e-mail"
                defaultValue={`${abilityChangeForm === true ? user?.email : ''}`}
                readOnly={abilityChangeForm}
                register={register}
                errors={errors.email}
                validationRules={validationRules.email}
            />
            <FormField
                label="First name:"
                id="firstName-input"
                name="firstName"
                placeholder="Enter your First Name"
                defaultValue={user?.firstName}
                readOnly={abilityChangeForm}
                register={register}
                errors={errors.firstName}
                validationRules={validationRules.names}
            />
            <FormField
                label="Last name:"
                id="lastName-input"
                name="lastName"
                placeholder="Enter your Last Name"
                defaultValue={user?.lastName}
                readOnly={abilityChangeForm}
                register={register}
                errors={errors.lastName}
                validationRules={validationRules.names}
            />
            <FormField
                label="Date of birth:"
                type="date"
                addWrapperClasses={['stretched']}
                id="age-input"
                name="dateOfBirth"
                defaultValue={user?.dateOfBirth}
                readOnly={abilityChangeForm}
                placeholder="Enter your Date of birth"
                register={register}
                errors={errors.dateOfBirth}
                validationRules={validationRules.dateBirth}
            />
            <div className="buttons-wrapper">
                {abilityChangeForm && (
                    <button
                        className="change-user-btn"
                        type="button"
                        onClick={() => handleProtectUpdateFormAbility(false)}
                    >
                        Edit
                    </button>
                )}
                {!abilityChangeForm && (
                    <button
                        className="change-user-btn"
                        type="button"
                        onClick={() => {
                            handleProtectUpdateFormAbility(true);
                            reset();
                        }}
                    >
                        Cancel
                    </button>
                )}
                <button
                    className={`change-user-btn ${isValid && !abilityChangeForm ? '' : 'disable'} `}
                    type="submit"
                    onClick={() => {
                        handleProtectUpdateFormAbility(true);
                    }}
                >
                    Update
                </button>
            </div>
            <span className="error-message stretched">{updateUserDataError}</span>
        </form>
    );
}
