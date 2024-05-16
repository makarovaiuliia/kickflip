import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { ErrorMessage, Country, SignUpDataForm } from '@/types/types';
import '../form.css';
import { useDispatch } from '@/services/store';
import { signUpUser } from '@/services/userSlice';

export default function RegistrationForm() {
    const [useShippingAsBilling, setUseShippingAsBilling] = useState(false);
    const [useBillingAsShipping, setUseBillingAsShipping] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isValid },
    } = useForm<SignUpDataForm>({ mode: 'all' });

    const dispatch = useDispatch();

    const submit: SubmitHandler<SignUpDataForm> = (data: SignUpDataForm) => {
        dispatch(signUpUser(data));
        setUseBillingAsShipping(false);
        setUseShippingAsBilling(false);
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

    const handleShippingAsBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUseShippingAsBilling(e.target.checked);
    };

    const handleBillingAsShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUseBillingAsShipping(e.target.checked);
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
                    placeholder="Enter your Last Name"
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
                        validate: (value) => ageRestrictionCheck(value),
                    })}
                />
                <span className="error-message">{!errors.dateOfBirth ? '' : errors.dateOfBirth.message}</span>
            </div>
            {!useBillingAsShipping && (
                <>
                    <div className="input-wrapper stretched">
                        <label className="form-label" htmlFor="address-input">
                            Shipping Address
                        </label>
                        <input
                            className="form-input"
                            placeholder="First line of address"
                            id="address-input"
                            {...register('shippingAddress.streetName', {
                                required: ErrorMessage.REQUIRED_FIELD,
                                minLength: { value: 1, message: ErrorMessage.ERROR_LENGTH },
                            })}
                        />
                        {errors.shippingAddress?.streetName && (
                            <span className="error-message">{errors.shippingAddress.streetName.message}</span>
                        )}
                    </div>
                    <div className="input-wrapper stretched">
                        <input
                            className="form-input"
                            placeholder="Second line of address"
                            {...register('shippingAddress.streetNumber')}
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
                            {...register('billingAddress.city', {
                                required: ErrorMessage.REQUIRED_FIELD,
                                pattern: { value: ONLY_LETTER_REGEX, message: ErrorMessage.ERROR_REGEX },
                                minLength: { value: 1, message: ErrorMessage.ERROR_LENGTH },
                            })}
                        />
                        {errors.shippingAddress?.city && (
                            <span className="error-message">{errors.shippingAddress.city.message}</span>
                        )}
                    </div>
                    <div className="input-wrapper">
                        <label className="form-label" htmlFor="country-input">
                            Country
                        </label>
                        <select
                            id="country-input"
                            className="form-input"
                            {...register('shippingAddress.country', { required: true })}
                        >
                            <option value="" hidden>
                                Select your country...
                            </option>
                            <option value="AU">Austria</option>
                            <option value="BU">Belarus</option>
                            <option value="GE">Georgia</option>
                            <option value="RU">Russia</option>
                        </select>
                        {errors.shippingAddress?.country && (
                            <span className="error-message">{errors.shippingAddress.country.message}</span>
                        )}
                    </div>
                    <div className="input-wrapper stretched">
                        <label className="form-label" htmlFor="zip-input">
                            Postal Code
                        </label>
                        <input
                            className="form-input"
                            placeholder="Enter postal code"
                            id="zip-input"
                            {...register('shippingAddress.postalCode', {
                                required: ErrorMessage.REQUIRED_FIELD,
                                validate: (value) => matchCountry(value, 'shippingAddress'),
                            })}
                        />
                        {errors.shippingAddress?.postalCode && (
                            <span className="error-message">{errors.shippingAddress.postalCode.message}</span>
                        )}
                    </div>
                    <div className="checkbox-wrapper">
                        <input type="checkbox" {...register('isDefaultShippingAddress')} />
                        <span>Make this address default</span>
                    </div>
                    <div className="checkbox-wrapper">
                        <input
                            type="checkbox"
                            {...register('useShippingAsBilling')}
                            onChange={handleShippingAsBillingChange}
                        />
                        <span>Also use as billing address</span>
                    </div>
                </>
            )}
            {!useShippingAsBilling && (
                <>
                    <div className="input-wrapper stretched">
                        <label className="form-label" htmlFor="address-input-billing">
                            Billing Address
                        </label>
                        <input
                            className="form-input"
                            placeholder="First line of address"
                            id="address-input-billing"
                            {...register('billingAddress.streetName', {
                                required: ErrorMessage.REQUIRED_FIELD,
                                minLength: { value: 1, message: ErrorMessage.ERROR_LENGTH },
                            })}
                        />
                        {errors.billingAddress?.streetName && (
                            <span className="error-message">{errors.billingAddress.streetName.message}</span>
                        )}
                    </div>
                    <div className="input-wrapper stretched">
                        <input
                            className="form-input"
                            placeholder="Second line of address"
                            {...register('billingAddress.streetNumber')}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label className="form-label" htmlFor="city-input-billing">
                            City
                        </label>
                        <input
                            className="form-input"
                            placeholder="Your city"
                            id="city-input-billing"
                            {...register('billingAddress.city', {
                                required: ErrorMessage.REQUIRED_FIELD,
                                pattern: { value: ONLY_LETTER_REGEX, message: ErrorMessage.ERROR_REGEX },
                                minLength: { value: 1, message: ErrorMessage.ERROR_LENGTH },
                            })}
                        />
                        {errors.billingAddress?.city && (
                            <span className="error-message">{errors.billingAddress.city.message}</span>
                        )}
                    </div>
                    <div className="input-wrapper">
                        <label className="form-label" htmlFor="country-input-billing">
                            Country
                        </label>
                        <select
                            id="country-input-billing"
                            className="form-input"
                            {...register('billingAddress.country', { required: true })}
                        >
                            <option value="" hidden>
                                Select your country...
                            </option>
                            <option value="AU">Austria</option>
                            <option value="BU">Belarus</option>
                            <option value="GE">Georgia</option>
                            <option value="RU">Russia</option>
                        </select>
                        {errors.billingAddress?.country && (
                            <span className="error-message">{errors.billingAddress.country.message}</span>
                        )}
                    </div>
                    <div className="input-wrapper stretched">
                        <label className="form-label" htmlFor="zip-input-billing">
                            Postal Code
                        </label>
                        <input
                            className="form-input"
                            placeholder="Enter postal code"
                            id="zip-input-billing"
                            {...register('billingAddress.postalCode', {
                                required: ErrorMessage.REQUIRED_FIELD,
                                validate: (value) => matchCountry(value, 'billingAddress'),
                            })}
                        />
                        {errors.billingAddress?.postalCode && (
                            <span className="error-message">{errors.billingAddress.postalCode.message}</span>
                        )}
                    </div>
                    <div className="checkbox-wrapper">
                        <input type="checkbox" {...register('isDefaultBillingAddress')} />
                        <span>Make this address default</span>
                    </div>
                    <div className="checkbox-wrapper">
                        <input
                            type="checkbox"
                            {...register('useBillingAsShipping')}
                            onChange={handleBillingAsShippingChange}
                        />
                        <span>Also use as shipping address</span>
                    </div>
                </>
            )}

            <button className={`submit-btn ${isValid ? '' : 'disable'} stretched`} type="submit">
                Send Form
            </button>
        </form>
    );
}
