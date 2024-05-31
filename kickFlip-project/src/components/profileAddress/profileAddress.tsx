import './profileAddress.css';
import ProfileShippingAddresses from '../profileShippingAdresses/profileShippingAdresses';
import ProfileBillingAddresses from '../profileBillingAdresses/profileBillingAddresses';

export default function ProfileAddress(): JSX.Element {
    return (
        <>
            <h2 className="form-subtitle">Change address</h2>
            <ProfileBillingAddresses />
            <ProfileShippingAddresses />
        </>
    );
}
