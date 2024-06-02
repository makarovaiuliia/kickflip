import './profileAddress.css';
import ProfileShippingAddresses from '../profileShippingAdresses/profileShippingAdresses';
import NewAddressForm from '../form/newAddressForm/newAddressForm';

export default function ProfileAddress(): JSX.Element {
    return (
        <>
            <h2 className="form-subtitle">Change address</h2>
            <ProfileShippingAddresses />
            <NewAddressForm />
        </>
    );
}
