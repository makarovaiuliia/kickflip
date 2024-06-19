import { useSelector } from 'react-redux';
import { getUserSelector } from '@/services/userSlice';
import ChangeUserAddressForm from '../form/changeAddressForm/changeAddressForm';

export default function ProfileAddresses(): JSX.Element {
    const { user } = useSelector(getUserSelector);

    const defaultAddresses = user?.addresses?.filter((item) =>
        item.id ? item.id === user.defaultBillingAddressId || item.id === user.defaultShippingAddressId : ''
    );

    const elseAddresses = user?.addresses?.filter((item) =>
        item.id ? item.id !== user.defaultBillingAddressId && item.id !== user.defaultShippingAddressId : ''
    );
    const addresses = defaultAddresses!.concat(elseAddresses!);

    return (
        <div className="form-addresses-wrapper">
            {addresses?.map((address) => (
                <ChangeUserAddressForm addressBillingShipping="billingAddress" address={address} key={address.id} />
            ))}
        </div>
    );
}
