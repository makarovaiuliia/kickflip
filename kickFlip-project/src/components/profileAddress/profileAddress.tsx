import { useSelector } from 'react-redux';
import { getUserSelector } from '@/services/userSlice';
import ChangeUserAddressForm from '../form/changeAddressForm/changeAddressForm';
import './profileAddress.css';

export default function ProfileAddress(): JSX.Element {
    const { user } = useSelector(getUserSelector);

    const billingAddressIds = user?.billingAddressIds;
    const shippingAddressIds = user?.shippingAddressIds;

    const formHeadings = {
        billing: 'Billing addresses',
        shipping: 'Shiping addresses',
    };

    const billingAddresses = user?.addresses?.filter((item) => billingAddressIds?.includes(item.id as string));
    const shippingAddresses = user?.addresses?.filter((item) => shippingAddressIds?.includes(item.id as string));

    return (
        <>
            <h2 className="form-subtitle">Change address</h2>
            <div className="form-addresses-wrapper">
                <h3 className="form-heading">{formHeadings.billing}</h3>
                {billingAddresses?.map((address) => <ChangeUserAddressForm address={address} key={address.id} />)}
            </div>
            <div className="form-addresses-wrapper">
                <h3 className="form-heading">{formHeadings.shipping}</h3>
                {shippingAddresses?.map((address) => <ChangeUserAddressForm address={address} key={address.id} />)}
            </div>
        </>
    );
}
