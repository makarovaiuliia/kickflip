import './profileAccount.css';
import ChangeUserDataForm from '../form/changeUserDataForm/changeUserDataForm';

export default function ProfileAccount(): JSX.Element {
    return (
        <>
            <h2 className="form-subtitle">Account details</h2>
            <ChangeUserDataForm />
        </>
    );
}
