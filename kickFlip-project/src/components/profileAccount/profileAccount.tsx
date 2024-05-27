import './profileAccount.css';
import { useSelector } from 'react-redux';
import ChangeUserDataForm from '../form/changeUserDataForm/chageUserDataForm';
import { getUserSelector } from '@/services/userSlice';

export default function ProfileAccount(): JSX.Element {
    const { user } = useSelector(getUserSelector);

    console.log(user);
    console.log('//--//--//--//');

    return (
        <>
            <h2 className="form-subtitle">Account details</h2>
            <ChangeUserDataForm />
        </>
    );
}
