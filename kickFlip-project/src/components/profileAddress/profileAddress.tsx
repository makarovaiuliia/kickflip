import { useSelector } from 'react-redux';
import { getUserSelector } from '@/services/userSlice';

import './profileAddress.css';
import ProfileShippingAddresses from '../profileShippingAdresses/profileShippingAdresses';
import ProfileBillingAddresses from '../profileBillingAdresses/profileBillingAddresses';

export default function ProfileAddress(): JSX.Element {
    const { user } = useSelector(getUserSelector);
    console.log(user);

    return (
        <>
            <h2 className="form-subtitle">Change address</h2>
            <ProfileBillingAddresses />
            <ProfileShippingAddresses />
        </>
    );
}
