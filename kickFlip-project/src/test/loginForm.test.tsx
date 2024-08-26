import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from '../components/form/LoginForm/loginForm';

describe('LoginForm component', () => {
    it('displays error message when entering incorrect email', () => {
        const { getByLabelText, getByText } = render(<LoginForm />);
        const emailInput = getByLabelText('E-mail:');

        fireEvent.change(emailInput, { target: { value: 'invalidEmail' } });
        fireEvent.change(emailInput, { target: { value: 'invalidEmail@' } });
        fireEvent.change(emailInput, { target: { value: 'invalidEmail@example' } });
        fireEvent.change(emailInput, { target: { value: 'invalidEmail@example.com ' } });
        fireEvent.change(emailInput, { target: { value: ' invalidEmail@example.com' } });

        expect(getByText('Please enter valid e-mail address')).toBeInTheDocument();
    });

    it('displays error message when entering short password', () => {
        const { getByLabelText, getByText } = render(<LoginForm />);
        const passwordInput = getByLabelText('Password:');

        fireEvent.change(passwordInput, { target: { value: 'short' } });

        expect(getByText('Password must be at least 8 characters long')).toBeInTheDocument();
    });

    it('displays error message when entering incorrect password', () => {
        const { getByLabelText, getByText } = render(<LoginForm />);
        const passwordInput = getByLabelText('Password:');

        fireEvent.change(passwordInput, { target: { value: 'notShort' } });
        fireEvent.change(passwordInput, { target: { value: 'withoutUppercase' } });
        fireEvent.change(passwordInput, { target: { value: 'withOutnumber' } });
        fireEvent.change(passwordInput, { target: { value: '4444444!' } });

        expect(
            getByText(
                'Password must contain at least one uppercase letter, one lowercase letter, and one digit. Please use only Latin characters'
            )
        ).toBeInTheDocument();
    });

    it('removes error message when entering correct data', () => {
        const { getByLabelText, queryByText } = render(<LoginForm />);
        const emailInput = getByLabelText('E-mail:');

        fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });

        expect(queryByText('Please enter valid e-mail address')).toBeNull();
    });

    it('disables login button when form has invalid data', () => {
        const { getByLabelText, getByText } = render(<LoginForm />);
        const emailInput = getByLabelText('E-mail:');
        const passwordInput = getByLabelText('Password:');
        const loginButton = getByText('Log In');

        fireEvent.change(emailInput, { target: { value: 'invalidEmail' } });
        fireEvent.change(passwordInput, { target: { value: 'short' } });

        expect(loginButton).toHaveClass('disable');
    });

    it('toggles password visibility when eye icon is clicked', () => {
        const { getByLabelText } = render(<LoginForm />);
        const passwordInput = getByLabelText('Password:');
        const eyeIcon = document.querySelector('.fas');
        if (eyeIcon) {
            fireEvent.click(eyeIcon);

            expect(passwordInput).toHaveAttribute('type', 'text');

            fireEvent.click(eyeIcon);

            expect(passwordInput).toHaveAttribute('type', 'password');
        }
    });
});
