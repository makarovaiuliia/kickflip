import { useSelector } from 'react-redux';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ErrorMessage, SignUpDataForm } from '@/types/types';
import '../form.css';
import { useDispatch } from '@/services/store';
import { signUpUser, getUserSelector } from '@/services/userSlice';
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
    } = useForm<SignUpDataForm>({ mode: 'all' });

    const dispatch = useDispatch();

    const submit: SubmitHandler<SignUpDataForm> = async (data: SignUpDataForm) => {
        setUpdateUserDataError('');
        try {
            await dispatch(signUpUser(data)).unwrap();
            reset();
        } catch (error) {
            responsesErrorsHandler(error, setUpdateUserDataError);
        }
    };

    const ONLY_LETTER_REGEX: RegExp = /^[A-Za-z]+$/;

    return (
        <form className="change-user-data-form" onSubmit={handleSubmit(submit)}>
            <FormField
                label="E-mail:"
                id="email-input"
                name="email"
                placeholder="Enter your e-mail"
                defaultValue={user?.email}
                readOnly={abilityChangeForm}
                register={register}
                errors={errors.email}
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
                validationRules={{
                    required: ErrorMessage.REQUIRED_FIELD,
                    pattern: { value: ONLY_LETTER_REGEX, message: ErrorMessage.ERROR_REGEX },
                    minLength: { value: 1, message: ErrorMessage.ERROR_LENGTH },
                }}
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
                validationRules={{
                    required: ErrorMessage.REQUIRED_FIELD,
                    pattern: { value: ONLY_LETTER_REGEX, message: ErrorMessage.ERROR_REGEX },
                    minLength: { value: 1, message: ErrorMessage.ERROR_LENGTH },
                }}
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
                validationRules={{
                    required: ErrorMessage.REQUIRED_FIELD,
                    validate: (value) => ageRestrictionCheck(value),
                }}
            />
            <div className="buttons-wrapper">
                <button className="change-user-btn" type="button" onClick={() => handleProtectUpdateFormAbility(false)}>
                    Edit
                </button>
                <button className={`change-user-btn ${isValid ? '' : 'disable'} `} type="submit">
                    Update
                </button>
            </div>
            <span className="error-message stretched">{updateUserDataError}</span>
        </form>
    );
}
