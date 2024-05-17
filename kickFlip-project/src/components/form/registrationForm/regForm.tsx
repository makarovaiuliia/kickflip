import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { ErrorMessage, Country, SignUpDataForm } from '@/types/types';
import '../form.css';
import { useDispatch } from '@/services/store';
import { signUpUser } from '@/services/userSlice';
import FormField from '@/components/formFields/formField';
import { responsesErrorsHandler } from '@/utils/utils';

export default function RegistrationForm() {
    const [registrationError, setRegistrationError] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isValid },
    } = useForm<SignUpDataForm>({ mode: 'all' });

    const dispatch = useDispatch();

    const useShippingAsBilling = watch('useShippingAsBilling');
    const useBillingAsShipping = watch('useBillingAsShipping');

    const submit: SubmitHandler<SignUpDataForm> = async (data: SignUpDataForm) => {
        setRegistrationError('');
        try {
            await dispatch(signUpUser(data)).unwrap();
            reset();
        } catch (error) {
            responsesErrorsHandler(error, setRegistrationError);
        }
    };

    const EMAIL_REGEXP: RegExp = /^\S+@\S+\.\S+$/;
    const PASSWORD_REGEX: RegExp = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/;
    const ONLY_LETTER_REGEX: RegExp = /[A-Za-z]+$/;
    const AU_GE_ZIP_REGEX: RegExp = /^\d{4}$/;
    const BU_RU_ZIP_REGEX: RegExp = /^\d{6}$/;

    const ageRestrictionCheck = (birthDay: Date) => {
        const birthDate = new Date(birthDay);

        const currentDate = new Date();

        const age = currentDate.getFullYear() - birthDate.getFullYear();

        return age >= 13 ? true : ErrorMessage.TOO_YOUNG_ERROR;
    };

    const matchCountry = (postalCode: string, addressType: 'shippingAddress' | 'billingAddress') => {
        const country = watch(`${addressType}.country`);
        if ((country === Country.AUSTRIA || country === Country.GEORGIA) && !AU_GE_ZIP_REGEX.test(postalCode)) {
            return ErrorMessage.POSTAL_CODE_ERROR;
        }
        if ((country === Country.RUSSIA || country === Country.BELARUS) && !BU_RU_ZIP_REGEX.test(postalCode)) {
            return ErrorMessage.POSTAL_CODE_ERROR;
        }
        return true;
    };

    return (
        <form className="reg-form" onSubmit={handleSubmit(submit)}>
            <FormField
                label="E-mail"
                id="email-input"
                name="email"
                placeholder="Enter your e-mail"
                register={register}
                errors={errors.email}
                validationRules={{
                    required: ErrorMessage.REQUIRED_FIELD,
                    pattern: { value: EMAIL_REGEXP, message: ErrorMessage.EMAIL_ERROR },
                }}
            />
            <FormField
                type="password"
                label="Password"
                id="password-input"
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
            <FormField
                label="First Name"
                id="firstName-input"
                name="firstName"
                placeholder="Enter your First Name"
                register={register}
                errors={errors.firstName}
                validationRules={{
                    required: ErrorMessage.REQUIRED_FIELD,
                    pattern: { value: ONLY_LETTER_REGEX, message: ErrorMessage.ERROR_REGEX },
                    minLength: { value: 1, message: ErrorMessage.ERROR_LENGTH },
                }}
            />
            <FormField
                label="Last Name"
                id="lastName-input"
                name="lastName"
                placeholder="Enter your Last Name"
                register={register}
                errors={errors.lastName}
                validationRules={{
                    required: ErrorMessage.REQUIRED_FIELD,
                    pattern: { value: ONLY_LETTER_REGEX, message: ErrorMessage.ERROR_REGEX },
                    minLength: { value: 1, message: ErrorMessage.ERROR_LENGTH },
                }}
            />
            <FormField
                label="Date of birth"
                type="date"
                addWrapperClasses={['stretched']}
                id="age-input"
                name="dateOfBirth"
                placeholder="Enter your Date of birth"
                register={register}
                errors={errors.dateOfBirth}
                validationRules={{
                    required: ErrorMessage.REQUIRED_FIELD,
                    validate: (value) => ageRestrictionCheck(value),
                }}
            />
            {!useBillingAsShipping && (
                <>
                    <FormField
                        label="Shipping Address"
                        addWrapperClasses={['stretched']}
                        id="address-input"
                        name="shippingAddress.streetName"
                        placeholder="First line of address"
                        register={register}
                        errors={errors.shippingAddress?.streetName}
                        validationRules={{
                            required: ErrorMessage.REQUIRED_FIELD,
                            minLength: { value: 1, message: ErrorMessage.ERROR_LENGTH },
                        }}
                    />
                    <FormField
                        addWrapperClasses={['stretched']}
                        name="shippingAddress.streetNumber"
                        placeholder="Second line of address"
                        register={register}
                    />
                    <FormField
                        label="City"
                        id="city-input"
                        name="shippingAddress.city"
                        placeholder="Your city"
                        register={register}
                        errors={errors.shippingAddress?.city}
                        validationRules={{
                            required: ErrorMessage.REQUIRED_FIELD,
                            pattern: { value: ONLY_LETTER_REGEX, message: ErrorMessage.ERROR_REGEX },
                            minLength: { value: 1, message: ErrorMessage.ERROR_LENGTH },
                        }}
                    />
                    <FormField
                        fieldTag="select"
                        label="Country"
                        selectOptions={[
                            { value: '', text: 'Select your country...', props: [{ key: 'hidden', value: true }] },
                            { value: 'AU', text: 'Austria' },
                            { value: 'BU', text: 'Belarus' },
                            { value: 'GE', text: 'Georgia' },
                            { value: 'RU', text: 'Russia' },
                        ]}
                        id="country-input"
                        name="shippingAddress.country"
                        register={register}
                        errors={errors.shippingAddress?.country}
                        validationRules={{
                            required: true,
                        }}
                    />
                    <FormField
                        label="Postal Code"
                        addWrapperClasses={['stretched']}
                        id="zip-input"
                        name="shippingAddress.postalCode"
                        placeholder="Enter postal code"
                        register={register}
                        errors={errors.shippingAddress?.postalCode}
                        validationRules={{
                            required: ErrorMessage.REQUIRED_FIELD,
                            validate: (value) => matchCountry(value, 'shippingAddress'),
                        }}
                    />
                    <div className="checkbox-wrapper">
                        <input type="checkbox" {...register('isDefaultShippingAddress')} />
                        <span>Make this address default</span>
                    </div>
                    <div className="checkbox-wrapper">
                        <input type="checkbox" {...register('useShippingAsBilling')} />
                        <span>Also use as billing address</span>
                    </div>
                </>
            )}
            {!useShippingAsBilling && (
                <>
                    <FormField
                        label="Billing Address"
                        addWrapperClasses={['stretched']}
                        id="address-input-billing"
                        name="billingAddress.streetName"
                        placeholder="First line of address"
                        register={register}
                        errors={errors.billingAddress?.streetName}
                        validationRules={{
                            required: ErrorMessage.REQUIRED_FIELD,
                            minLength: { value: 1, message: ErrorMessage.ERROR_LENGTH },
                        }}
                    />
                    <FormField
                        addWrapperClasses={['stretched']}
                        name="billingAddress.streetNumber"
                        placeholder="Second line of address"
                        register={register}
                    />
                    <FormField
                        label="City"
                        id="city-input-billing"
                        name="billingAddress.city"
                        placeholder="Your city"
                        register={register}
                        errors={errors.billingAddress?.city}
                        validationRules={{
                            required: ErrorMessage.REQUIRED_FIELD,
                            pattern: { value: ONLY_LETTER_REGEX, message: ErrorMessage.ERROR_REGEX },
                            minLength: { value: 1, message: ErrorMessage.ERROR_LENGTH },
                        }}
                    />
                    <FormField
                        fieldTag="select"
                        label="Country"
                        selectOptions={[
                            { value: '', text: 'Select your country...', props: [{ key: 'hidden', value: true }] },
                            { value: 'AU', text: 'Austria' },
                            { value: 'BU', text: 'Belarus' },
                            { value: 'GE', text: 'Georgia' },
                            { value: 'RU', text: 'Russia' },
                        ]}
                        id="country-input-billing"
                        name="billingAddress.country"
                        register={register}
                        errors={errors.billingAddress?.country}
                        validationRules={{
                            required: true,
                        }}
                    />
                    <FormField
                        label="Postal Code"
                        addWrapperClasses={['stretched']}
                        id="zip-input-billing"
                        name="billingAddress.postalCode"
                        placeholder="Enter postal code"
                        register={register}
                        errors={errors.billingAddress?.postalCode}
                        validationRules={{
                            required: ErrorMessage.REQUIRED_FIELD,
                            validate: (value) => matchCountry(value, 'billingAddress'),
                        }}
                    />
                    <div className="checkbox-wrapper">
                        <input type="checkbox" {...register('isDefaultBillingAddress')} />
                        <span>Make this address default</span>
                    </div>
                    <div className="checkbox-wrapper">
                        <input type="checkbox" {...register('useBillingAsShipping')} />
                        <span>Also use as shipping address</span>
                    </div>
                </>
            )}
            <button className={`submit-btn ${isValid ? '' : 'disable'} stretched`} type="submit">
                Send Form
            </button>

            <span className="error-message stretched">{registrationError}</span>
        </form>
    );
}
