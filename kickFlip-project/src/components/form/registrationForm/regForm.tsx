import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage, Country } from '@/types/types';
import '../form.css';
import FormField from '@/components/formFields/formField';

type CustomerAddress = { streetName: string; streetNumber: string; city: string; postalCode: string; country: string };

interface RegistrationFormState {
    email: string;
    password: string;
    lastName: string;
    firstName: string;
    dateOfBirth: Date;
    address: CustomerAddress;
}

export default function RegistrationForm() {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isValid },
    } = useForm<RegistrationFormState>({ mode: 'all' });

    const submit: SubmitHandler<RegistrationFormState> = () => {
        reset();
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

    const matchCountry = (postalCode: string) => {
        const country = watch('address.country');
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
                placeholder="Enter your Date of birthe"
                register={register}
                errors={errors.dateOfBirth}
                validationRules={{
                    required: ErrorMessage.REQUIRED_FIELD,
                    validate: (value) => ageRestrictionCheck(value),
                }}
            />
            <FormField
                label="Your Address"
                addWrapperClasses={['stretched']}
                id="adress-input"
                name="address.streetName"
                placeholder="First line of address"
                register={register}
                errors={errors.address?.streetName}
                validationRules={{
                    required: ErrorMessage.REQUIRED_FIELD,
                    minLength: { value: 1, message: ErrorMessage.ERROR_LENGTH },
                }}
            />
            <FormField
                addWrapperClasses={['stretched']}
                name="address.streetNumber"
                placeholder="Second line of address"
                register={register}
            />
            <FormField
                label="City"
                id="city-input"
                name="address.city"
                placeholder="Your city"
                register={register}
                errors={errors.address?.city}
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
                name="address.country"
                register={register}
                errors={errors.address?.country}
                validationRules={{
                    required: true,
                }}
            />

            <FormField
                label="Postal Code"
                addWrapperClasses={['stretched']}
                id="zip-input"
                name="address.postalCode"
                placeholder="Enter postal code"
                register={register}
                errors={errors.address?.postalCode}
                validationRules={{
                    required: ErrorMessage.REQUIRED_FIELD,
                    validate: (value) => matchCountry(value),
                }}
            />
            <button className={`submit-btn ${isValid ? '' : 'disable'} stretched`} type="submit">
                Send Form
            </button>
        </form>
    );
}
