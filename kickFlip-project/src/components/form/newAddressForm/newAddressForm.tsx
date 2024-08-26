import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { ErrorMessage, Country, AddNewAddressForm } from '@/types/types';
import '../form.css';
import { useDispatch } from '@/services/store';
import { addNewUserAddress, getUserSelector } from '@/services/userSlice';
import FormField from '@/components/formFields/formField';
import { responsesErrorsHandler } from '@/utils/utils';

export default function NewAddressForm() {
    const { user } = useSelector(getUserSelector);
    const [registrationError, setRegistrationError] = useState('');
    const [abilityCreateNewAddress, setAbilityCreateNewAddress] = useState(true);

    const handleCreateNewAddress = (abilityChange: boolean) => {
        setAbilityCreateNewAddress(abilityChange);
    };

    const {
        register,
        handleSubmit,
        reset,
        watch,
        trigger,
        formState: { errors, isValid },
    } = useForm<AddNewAddressForm>({ mode: 'all' });

    const dispatch = useDispatch();

    const submit: SubmitHandler<AddNewAddressForm> = async (data: AddNewAddressForm) => {
        const requestData = {
            id: user?.id,
            addresses: user?.addresses,
            version: user?.version,
            data,
        };
        setRegistrationError('');
        try {
            await dispatch(addNewUserAddress(requestData)).unwrap();
            reset();
        } catch (error) {
            responsesErrorsHandler(error, setRegistrationError);
        }
    };

    const ONLY_LETTER_REGEX: RegExp = /^[A-Za-z]+$/;
    const AU_GE_ZIP_REGEX: RegExp = /^\d{4}$/;
    const BU_RU_ZIP_REGEX: RegExp = /^\d{6}$/;

    const matchCountry = (postalCode: string, addressType: 'newAddress') => {
        const country = watch(`${addressType}.country`);
        if ((country === Country.AUSTRIA || country === Country.GEORGIA) && !AU_GE_ZIP_REGEX.test(postalCode)) {
            return ErrorMessage.POSTAL_CODE_ERROR;
        }
        if ((country === Country.RUSSIA || country === Country.BELARUS) && !BU_RU_ZIP_REGEX.test(postalCode)) {
            return ErrorMessage.POSTAL_CODE_ERROR;
        }
        return true;
    };

    const watchShippingCountry = watch('newAddress.country');
    const watchBillingCountry = watch('newAddress.country');

    useEffect(() => {
        if (watchShippingCountry) {
            trigger('newAddress.postalCode');
        }
    }, [watchShippingCountry, trigger]);

    useEffect(() => {
        if (watchBillingCountry) {
            trigger('newAddress.postalCode');
        }
    }, [watchBillingCountry, trigger]);

    useEffect(() => {
        if (watchBillingCountry) {
            trigger('newAddress.postalCode');
        }
    }, [watchBillingCountry, trigger]);
    return (
        <>
            <form
                className={`new-user-address-form ${abilityCreateNewAddress ? 'hide' : ''}`}
                onSubmit={handleSubmit(submit)}
            >
                <FormField
                    label="Address:"
                    addWrapperClasses={['stretched']}
                    id="new-address-input"
                    name="newAddress.streetName"
                    placeholder="First line of address"
                    register={register}
                    errors={errors.newAddress?.streetName}
                    validationRules={{
                        required: ErrorMessage.REQUIRED_FIELD,
                        minLength: { value: 1, message: ErrorMessage.ERROR_LENGTH },
                    }}
                />
                <FormField
                    addWrapperClasses={['stretched']}
                    name="newAddress.streetNumber"
                    placeholder="Second line of address"
                    register={register}
                />
                <FormField
                    label="City:"
                    id="new-city-input"
                    name="newAddress.city"
                    placeholder="Your city"
                    register={register}
                    errors={errors.newAddress?.city}
                    validationRules={{
                        required: ErrorMessage.REQUIRED_FIELD,
                        pattern: { value: ONLY_LETTER_REGEX, message: ErrorMessage.ERROR_REGEX },
                        minLength: { value: 1, message: ErrorMessage.ERROR_LENGTH },
                    }}
                />
                <FormField
                    fieldTag="select"
                    label="Country:"
                    selectOptions={[
                        { value: '', text: 'Select your country...', props: [{ key: 'hidden', value: true }] },
                        { value: 'AU', text: 'Austria' },
                        { value: 'BU', text: 'Belarus' },
                        { value: 'GE', text: 'Georgia' },
                        { value: 'RU', text: 'Russia' },
                    ]}
                    id="new-country-input"
                    name="newAddress.country"
                    register={register}
                    errors={errors.newAddress?.country}
                    validationRules={{
                        required: true,
                    }}
                />
                <FormField
                    label="Postal Code:"
                    addWrapperClasses={['stretched']}
                    id="new-zip-input"
                    name="newAddress.postalCode"
                    placeholder="Enter postal code"
                    register={register}
                    errors={errors.newAddress?.postalCode}
                    validationRules={{
                        required: ErrorMessage.REQUIRED_FIELD,
                        validate: (value) => matchCountry(value, 'newAddress'),
                    }}
                />
                <div className="checkboxes-wrapper">
                    <div className="checkbox-wrapper">
                        <input type="checkbox" {...register('addToShipping')} />
                        <span>Shipping address</span>
                    </div>
                    <div className="checkbox-wrapper">
                        <input type="checkbox" {...register('isDefaultShippingAddress')} />
                        <span>Make this shipping address default</span>
                    </div>
                </div>
                <div className="checkboxes-wrapper">
                    <div className="checkbox-wrapper">
                        <input type="checkbox" {...register('addToBilling')} />
                        <span>Billing address</span>
                    </div>
                    <div className="checkbox-wrapper">
                        <input type="checkbox" {...register('isDefaultBillingAddress')} />
                        <span>Make this billing address default</span>
                    </div>
                </div>

                <button className={`change-user-btn ${isValid ? '' : 'disable'}`} type="submit">
                    Save
                </button>

                <span className="error-message stretched">{registrationError}</span>
            </form>
            {abilityCreateNewAddress && (
                <button className="change-user-btn" type="button" onClick={() => handleCreateNewAddress(false)}>
                    Add Address
                </button>
            )}
            {!abilityCreateNewAddress && (
                <button className="change-user-btn" type="button" onClick={() => handleCreateNewAddress(true)}>
                    Cancel
                </button>
            )}
        </>
    );
}
