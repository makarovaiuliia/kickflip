import { useSelector } from 'react-redux';
import { getUserSelector } from '@/services/userSlice';
import ChangeUserAddressForm from '../form/changeAddressForm/changeAddressForm';

export default function ProfileBillingAddresses(): JSX.Element {
    const { user } = useSelector(getUserSelector);

    const billingAddressIds = user?.billingAddressIds;
    const billingAddresses = user?.addresses?.filter((item) => (item.id ? billingAddressIds?.includes(item.id) : ''));

    return (
        <div className="form-addresses-wrapper">
            <h3 className="form-heading">Billing addresses</h3>
            {billingAddresses?.map((address) => <ChangeUserAddressForm address={address} key={address.id} />)}
        </div>
    );
}
