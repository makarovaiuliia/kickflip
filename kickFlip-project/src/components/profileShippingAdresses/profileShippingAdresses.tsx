import { useSelector } from 'react-redux';
import { getUserSelector } from '@/services/userSlice';
import ChangeUserAddressForm from '../form/changeAddressForm/changeAddressForm';

export default function ProfileShippingAddresses(): JSX.Element {
    const { user } = useSelector(getUserSelector);

    const shippingAddressIds = user?.shippingAddressIds;
    const shippingAddresses = user?.addresses?.filter((item) => (item.id ? shippingAddressIds?.includes(item.id) : ''));

    return (
        <div className="form-addresses-wrapper">
            <h3 className="form-heading form-heading-address">Shiping addresses</h3>
            {shippingAddresses?.map((address) => (
                <ChangeUserAddressForm addressBillingShipping="shippingAddress" address={address} key={address.id} />
            ))}
        </div>
    );
}
