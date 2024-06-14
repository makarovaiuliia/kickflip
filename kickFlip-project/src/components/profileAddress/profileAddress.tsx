import './profileAddress.css';
import ProfileAddresses from '@/components/profileAddresses/profileAddresses';
import NewAddressForm from '../form/newAddressForm/newAddressForm';

export default function ProfileAddress(): JSX.Element {
    return (
        <>
            <h2 className="form-subtitle">Change address</h2>
            <ProfileAddresses />
            <NewAddressForm />
        </>
    );
}
