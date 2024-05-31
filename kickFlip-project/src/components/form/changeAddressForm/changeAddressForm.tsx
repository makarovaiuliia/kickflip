import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ErrorMessage, Country, UpdateUserAddressForm, TAddress } from '@/types/types';
import '../form.css';
import { useDispatch } from '@/services/store';
import { updateUserAddress, getUserSelector } from '@/services/userSlice';
import FormField from '@/components/formFields/formField';
import { responsesErrorsHandler } from '@/utils/utils';

enum AddressTypes {
    shippingAddress,
    billingAddress,
}

type AddressTypeItem = keyof typeof AddressTypes;

type Props = {
    address: TAddress;
    addressBillingShipping: AddressTypeItem;
};

export default function ChangeUserAddressForm(props: Props) {
    const { address, addressBillingShipping } = props;
    const addressCountryDefault = address.country;
    const { user } = useSelector(getUserSelector);
    const isBilling = addressBillingShipping === 'billingAddress';

    const [updateUserAddressError, setRegistrationError] = useState('');
    const [abilityChangeForm, setAbilityChangeForm] = useState(true);

    const handleProtectUpdateFormAbility = (abilityChange: boolean) => {
        setAbilityChangeForm(abilityChange);
    };

    const {
        register,
        handleSubmit,
        reset,
        watch,
        trigger,
        formState: { errors, isValid },
    } = useForm<UpdateUserAddressForm>({ mode: 'all' });

    const dispatch = useDispatch();

    const submit: SubmitHandler<UpdateUserAddressForm> = async (data: UpdateUserAddressForm) => {
        const requestData = {
            id: user?.id,
            version: user?.version,
            addressId: address.id,
            data,
        };
        setRegistrationError('');
        try {
            await dispatch(updateUserAddress(requestData)).unwrap();
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

    const validationRules = {
        address: {
            required: ErrorMessage.REQUIRED_FIELD,
            minLength: { value: 1, message: ErrorMessage.ERROR_LENGTH },
        },
        city: {
            required: ErrorMessage.REQUIRED_FIELD,
            pattern: { value: ONLY_LETTER_REGEX, message: ErrorMessage.ERROR_REGEX },
            minLength: { value: 1, message: ErrorMessage.ERROR_LENGTH },
        },
        сountry: {
            required: true,
        },
        postalCode: {
            required: ErrorMessage.REQUIRED_FIELD,
            validate: (value: string) => matchCountry(value, addressBillingShipping),
        },
        postalCodeShipping: {
            required: ErrorMessage.REQUIRED_FIELD,
            validate: (value: string) => matchCountry(value, 'shippingAddress'),
        },
        postalCodeBilling: {
            required: ErrorMessage.REQUIRED_FIELD,
            validate: (value: string) => matchCountry(value, 'billingAddress'),
        },
    };

    return (
        <form
            className={`change-user-address-form ${!abilityChangeForm ? 'edit' : ''}`}
            onSubmit={handleSubmit(submit)}
        >
            {!isBilling && (
                <>
                    <FormField
                        label="Shipping Address"
                        addWrapperClasses={['stretched']}
                        id="address-input"
                        name="shippingAddress.streetName"
                        placeholder="First line of address"
                        register={register}
                        errors={errors.shippingAddress?.streetName}
                        validationRules={validationRules.address}
                        defaultValue={address.streetName}
                        readOnly={abilityChangeForm}
                    />
                    <FormField
                        addWrapperClasses={['stretched']}
                        name="shippingAddress.streetNumber"
                        placeholder="Second line of address"
                        register={register}
                        defaultValue={address.streetNumber}
                        readOnly={abilityChangeForm}
                    />
                    <FormField
                        label="City"
                        id="city-input"
                        name="shippingAddress.city"
                        placeholder="Your city"
                        register={register}
                        errors={errors.shippingAddress?.city}
                        validationRules={validationRules.city}
                        defaultValue={address.city}
                        readOnly={abilityChangeForm}
                    />
                    <FormField
                        fieldTag="select"
                        label="Country"
                        selectOptions={[
                            {
                                value: '',
                                text: 'Select your country...',
                                defaultValue: addressCountryDefault,
                                props: [{ key: 'hidden', value: true }],
                            },
                            { value: 'AU', text: 'Austria' },
                            { value: 'BU', text: 'Belarus' },
                            { value: 'GE', text: 'Georgia' },
                            { value: 'RU', text: 'Russia' },
                        ]}
                        id="country-input"
                        name="shippingAddress.country"
                        register={register}
                        errors={errors.shippingAddress?.country}
                        validationRules={validationRules.сountry}
                        defaultValue={addressCountryDefault}
                    />
                    <FormField
                        label="Postal Code"
                        addWrapperClasses={['stretched']}
                        id="zip-input"
                        name="shippingAddress.postalCode"
                        placeholder="Enter postal code"
                        register={register}
                        errors={errors.shippingAddress?.postalCode}
                        validationRules={validationRules.postalCodeShipping}
                        defaultValue={address.postalCode}
                        readOnly={abilityChangeForm}
                    />
                </>
            )}
            {isBilling && (
                <>
                    <FormField
                        label="Billing Address"
                        addWrapperClasses={['stretched']}
                        id="address-input-billing"
                        name="billingAddress.streetName"
                        placeholder="First line of address"
                        register={register}
                        errors={errors.billingAddress?.streetName}
                        validationRules={validationRules.address}
                        defaultValue={address.streetName}
                        readOnly={abilityChangeForm}
                    />
                    <FormField
                        addWrapperClasses={['stretched']}
                        name="billingAddress.streetNumber"
                        placeholder="Second line of address"
                        register={register}
                        defaultValue={address.streetNumber}
                        readOnly={abilityChangeForm}
                    />
                    <FormField
                        label="City"
                        id="city-input-billing"
                        name="billingAddress.city"
                        placeholder="Your city"
                        register={register}
                        errors={errors.billingAddress?.city}
                        validationRules={validationRules.city}
                        defaultValue={address.city}
                        readOnly={abilityChangeForm}
                    />
                    <FormField
                        fieldTag="select"
                        label="Country"
                        selectOptions={[
                            {
                                value: '',
                                defaultValue: addressCountryDefault,
                                text: 'Select your country...',
                                props: [{ key: 'hidden', value: true }],
                            },
                            { value: 'AU', text: 'Austria' },
                            { value: 'BU', text: 'Belarus' },
                            { value: 'GE', text: 'Georgia' },
                            { value: 'RU', text: 'Russia' },
                        ]}
                        id="country-input-billing"
                        name="billingAddress.country"
                        register={register}
                        errors={errors.billingAddress?.country}
                        validationRules={validationRules.сountry}
                        defaultValue={addressCountryDefault}
                    />
                    <FormField
                        label="Postal Code"
                        addWrapperClasses={['stretched']}
                        id="zip-input-billing"
                        name="billingAddress.postalCode"
                        placeholder="Enter postal code"
                        register={register}
                        errors={errors.billingAddress?.postalCode}
                        validationRules={validationRules.postalCodeBilling}
                        defaultValue={address.postalCode}
                        readOnly={abilityChangeForm}
                    />
                </>
            )}
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
                        onClick={() => handleProtectUpdateFormAbility(true)}
                    >
                        Cancel
                    </button>
                )}
                <button className={`change-user-btn ${isValid && !abilityChangeForm ? '' : 'disable'}`} type="submit">
                    Update
                </button>
                <button className="change-user-btn" type="button">
                    Delete
                </button>
            </div>

            <span className="error-message stretched">{updateUserAddressError}</span>
        </form>
    );
}
