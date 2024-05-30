import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage, Country, UpdateUserDataForm, TAddress } from '@/types/types';
import '../form.css';
import { useDispatch } from '@/services/store';
import { updateUserAnyData } from '@/services/userSlice';
import FormField from '@/components/formFields/formField';
import { responsesErrorsHandler } from '@/utils/utils';

type Props = {
    address: TAddress;
};

export default function ChangeUserAddressForm(props: Props) {
    const { address } = props;

    const [updateUserAddressError, setUpdateUserAddressError] = useState('');
    const [abilityChangeForm, setAbilityChangeForm] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isValid },
    } = useForm<UpdateUserDataForm>({ mode: 'all' });

    const dispatch = useDispatch();

    const submit: SubmitHandler<UpdateUserDataForm> = async (data: UpdateUserDataForm) => {
        setUpdateUserAddressError('');
        try {
            await dispatch(updateUserAnyData(data)).unwrap();
            reset();
        } catch (error) {
            responsesErrorsHandler(error, setUpdateUserAddressError);
        }
    };

    const handleProtectUpdateFormAbility = (abilityChange: boolean) => {
        setAbilityChangeForm(abilityChange);
    };

    const ONLY_LETTER_REGEX: RegExp = /^[A-Za-z]+$/;
    const AU_GE_ZIP_REGEX: RegExp = /^\d{4}$/;
    const BU_RU_ZIP_REGEX: RegExp = /^\d{6}$/;

    enum AddressTypes {
        shippingAddress,
        billingAddress,
    }

    type AddressTypeItem = keyof typeof AddressTypes;

    const matchCountry = (postalCode: string, addressType: AddressTypeItem) => {
        const country = watch(`${addressType}.country`);
        if ((country === Country.AUSTRIA || country === Country.GEORGIA) && !AU_GE_ZIP_REGEX.test(postalCode)) {
            return ErrorMessage.POSTAL_CODE_ERROR;
        }
        if ((country === Country.RUSSIA || country === Country.BELARUS) && !BU_RU_ZIP_REGEX.test(postalCode)) {
            return ErrorMessage.POSTAL_CODE_ERROR;
        }
        return true;
    };

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
            validate: (value: string) => matchCountry(value, 'shippingAddress'),
        },
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
                validationRules={validationRules.address}
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
                validationRules={validationRules.city}
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
                validationRules={validationRules.сountry}
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
                validationRules={validationRules.postalCode}
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
