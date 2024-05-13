import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage, Country } from '../../../types/type';
import '../form.css';

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

    const isAbove = (birthDay: Date) => {
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
            <div className="input-wrapper">
                <label className="form-label" htmlFor="email-input">
                    E-mail
                </label>
                <input
                    className="form-input"
                    placeholder="Enter your e-mail"
                    spellCheck="false"
                    id="email-input"
                    {...register('email', {
                        required: ErrorMessage.REQUIRED_FIELD,
                        pattern: { value: EMAIL_REGEXP, message: ErrorMessage.EMAIL_ERROR },
                    })}
                />
                <span className="error-message">{!errors.email ? '' : errors.email.message}</span>
            </div>
            <div className="input-wrapper">
                <label className="form-label" htmlFor="password-input">
                    Password
                </label>
                <input
                    className="form-input"
                    placeholder="Enter your password"
                    type="password"
                    id="password-input"
                    {...register('password', {
                        required: ErrorMessage.REQUIRED_FIELD,
                        pattern: { value: PASSWORD_REGEX, message: ErrorMessage.PASSWORD_ERROR_REGEX },
                        minLength: { value: 8, message: ErrorMessage.PASSWORD_ERROR_LENGTH },
                    })}
                />
                <span className="error-message">{!errors.password ? '' : errors.password.message}</span>
            </div>
            <div className="input-wrapper">
                <label className="form-label" htmlFor="firstName-input">
                    First Name
                </label>
                <input
                    className="form-input"
                    placeholder="Enter your First Name"
                    id="firstName-input"
                    {...register('firstName', {
                        required: ErrorMessage.REQUIRED_FIELD,
                        pattern: { value: ONLY_LETTER_REGEX, message: ErrorMessage.ERROR_REGEX },
                        minLength: { value: 1, message: ErrorMessage.ERROR_LENGTH },
                    })}
                />
                <span className="error-message">{!errors.firstName ? '' : errors.firstName.message}</span>
            </div>
            <div className="input-wrapper">
                <label className="form-label" htmlFor="lastName-input">
                    Last Name
                </label>
                <input
                    className="form-input"
                    placeholder="Enter your First Name"
                    id="lastName-input"
                    {...register('lastName', {
                        required: ErrorMessage.REQUIRED_FIELD,
                        pattern: { value: ONLY_LETTER_REGEX, message: ErrorMessage.ERROR_REGEX },
                        minLength: { value: 1, message: ErrorMessage.ERROR_LENGTH },
                    })}
                />
                <span className="error-message">{!errors.lastName ? '' : errors.lastName.message}</span>
            </div>
            <div className="input-wrapper stretched">
                <label className="form-label" htmlFor="age-input">
                    Date of birth
                </label>
                <input
                    className="form-input"
                    type="date"
                    placeholder="Enter your Date of birth"
                    id="age-input"
                    {...register('dateOfBirth', {
                        required: ErrorMessage.REQUIRED_FIELD,
                        validate: (value) => isAbove(value),
                    })}
                />
                <span className="error-message">{!errors.dateOfBirth ? '' : errors.dateOfBirth.message}</span>
            </div>
            <div className="input-wrapper stretched">
                <label className="form-label" htmlFor="adress-input">
                    Your Address
                </label>
                <input
                    className="form-input"
                    placeholder="First line of address"
                    id="adress-input"
                    {...register('address.streetName', {
                        required: ErrorMessage.REQUIRED_FIELD,
                        minLength: { value: 1, message: ErrorMessage.ERROR_LENGTH },
                    })}
                />
                <span className="error-message">
                    {!errors.address ? '' : errors.address.streetName ? errors.address.streetName.message : ''}
                </span>
            </div>
            <div className="input-wrapper stretched">
                <input
                    className="form-input"
                    placeholder="Second line of address"
                    {...register('address.streetNumber')}
                />
            </div>
            <div className="input-wrapper">
                <label className="form-label" htmlFor="city-input">
                    City
                </label>
                <input
                    className="form-input"
                    placeholder="Your city"
                    id="city-input"
                    {...register('address.city', {
                        required: ErrorMessage.REQUIRED_FIELD,
                        pattern: { value: ONLY_LETTER_REGEX, message: ErrorMessage.ERROR_REGEX },
                        minLength: { value: 1, message: ErrorMessage.ERROR_LENGTH },
                    })}
                />
                <span className="error-message">
                    {!errors.address ? '' : errors.address.city ? errors.address.city.message : ''}
                </span>
            </div>
            <div className="input-wrapper">
                <label className="form-label" htmlFor="country-input">
                    Country
                </label>
                <select id="country-input" className="form-input" {...register('address.country', { required: true })}>
                    <option value="" hidden>
                        Select your country...
                    </option>
                    <option value="AU">Austria</option>
                    <option value="BU">Belarus</option>
                    <option value="GE">Georgia</option>
                    <option value="RU">Russia</option>
                </select>
                <span className="error-message">
                    {!errors.address ? '' : errors.address.country ? errors.address.country.message : ''}
                </span>
            </div>
            <div className="input-wrapper stretched">
                <label className="form-label" htmlFor="zip-input">
                    Postal Code
                </label>
                <input
                    className="form-input"
                    placeholder="Enter postal code"
                    id="zip-input"
                    {...register('address.postalCode', {
                        required: ErrorMessage.REQUIRED_FIELD,
                        validate: (value) => matchCountry(value),
                    })}
                />
                <span className="error-message">
                    {!errors.address ? '' : errors.address.postalCode ? errors.address.postalCode.message : ''}
                </span>
            </div>
            <button className={`submit-btn ${isValid ? '' : 'disable'} stretched`} type="submit">
                Send Form
            </button>
        </form>
    );
}
