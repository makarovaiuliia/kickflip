import { useState } from 'react';
import './profileAddress.css';
import ProfileAddresses from '../profileAdresses/profileAddresses';
import NewAddressForm from '../form/newAddressForm/newAddressForm';

export default function ProfileAddress(): JSX.Element {
    const [components, setComponents] = useState([] as Array<string>);

    const result = components.map((item, index) => {
        return <NewAddressForm key={`${`${item}-${index}`}`} />;
    });

    function addComponent() {
        setComponents([...components, 'newAddress']);
    }

    return (
        <>
            <h2 className="form-subtitle">Change address</h2>
            <ProfileAddresses />
            {result}
            <button className="change-user-btn" type="button" onClick={addComponent}>
                Add address
            </button>
        </>
    );
}
