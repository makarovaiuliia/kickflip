import './profileAccount.css';
import ChangeUserDataForm from '../form/changeUserDataForm/chageUserDataForm';

export default function ProfileAccount(): JSX.Element {
    return (
        <>
            <h2 className="form-subtitle">Account details</h2>
            <ChangeUserDataForm />
        </>
    );
}
