import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage, Country, SignUpDataForm, TAddress } from '@/types/types';
import '../form.css';
import { useDispatch } from '@/services/store';
import { signUpUser } from '@/services/userSlice';
import FormField from '@/components/formFields/formField';
import { responsesErrorsHandler } from '@/utils/utils';

type Props = {
    address: TAddress;
};

export default function ChangeUserAddressForm(props: Props) {
    const { address } = props;

    const [registrationError, setRegistrationError] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        watch,
        trigger,
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

    const ONLY_LETTER_REGEX: RegExp = /^[A-Za-z]+$/;
    const AU_GE_ZIP_REGEX: RegExp = /^\d{4}$/;
    const BU_RU_ZIP_REGEX: RegExp = /^\d{6}$/;

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

    const watchShippingCountry = watch('shippingAddress.country');
    const watchBillingCountry = watch('billingAddress.country');

    useEffect(() => {
        if (watchShippingCountry) {
            trigger('shippingAddress.postalCode');
        }
    }, [watchShippingCountry, trigger]);

    useEffect(() => {
        if (watchBillingCountry) {
            trigger('billingAddress.postalCode');
        }
    }, [watchBillingCountry, trigger]);

    useEffect(() => {
        if (watchBillingCountry) {
            trigger('billingAddress.postalCode');
        }
    }, [watchBillingCountry, trigger]);

    const [abilityChangeForm, setAbilityChangeForm] = useState(true);

    const handleProtectUpdateFormAbility = (abilityChange: boolean) => {
        setAbilityChangeForm(abilityChange);
    };

    return (
        <form className="change-user-address-form" onSubmit={handleSubmit(submit)}>
            <FormField
                label="Address"
                addWrapperClasses={['stretched']}
                id="address-input"
                name="shippingAddress.streetName"
                placeholder="First line of address"
                defaultValue={address.streetName}
                register={register}
                readOnly={abilityChangeForm}
                errors={errors.shippingAddress?.streetName}
                validationRules={{
                    required: ErrorMessage.REQUIRED_FIELD,
                    minLength: { value: 1, message: ErrorMessage.ERROR_LENGTH },
                }}
            />
            <FormField
                addWrapperClasses={['stretched']}
                name="shippingAddress.streetNumber"
                defaultValue={address.streetNumber}
                placeholder="Second line of address"
                readOnly={abilityChangeForm}
                register={register}
            />
            <FormField
                label="City"
                id="city-input"
                name="shippingAddress.city"
                defaultValue={address.city}
                placeholder="Your city"
                register={register}
                readOnly={abilityChangeForm}
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
                readOnly={abilityChangeForm}
                selectOptions={[
                    { value: '', text: 'Select your country...', props: [{ key: 'hidden', value: true }] },
                    { value: 'AU', text: 'Austria', selected: address.country === 'AU' },
                    { value: 'BU', text: 'Belarus', selected: address.country === 'BU' },
                    { value: 'GE', text: 'Georgia', selected: address.country === 'GE' },
                    { value: 'RU', text: 'Russia', selected: address.country === 'RU' },
                ]}
                id="country-input"
                defaultValue={address.country}
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
                defaultValue={address.postalCode}
                placeholder="Enter postal code"
                readOnly={abilityChangeForm}
                register={register}
                errors={errors.shippingAddress?.postalCode}
                validationRules={{
                    required: ErrorMessage.REQUIRED_FIELD,
                    validate: (value) => matchCountry(value, 'shippingAddress'),
                }}
            />
            <div className="buttons-wrapper">
                <button className="change-user-btn" type="button" onClick={() => handleProtectUpdateFormAbility(false)}>
                    Edit
                </button>
                <button className={`change-user-btn ${isValid ? '' : 'disable'}`} type="submit">
                    Update
                </button>
                <button className="change-user-btn" type="button">
                    Delete
                </button>
            </div>

            <span className="error-message stretched">{registrationError}</span>
        </form>
    );
}
