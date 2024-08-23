import { AuthRedirectPromptDataType } from '@/types/types';

const AuthRedirectPromptData: Array<AuthRedirectPromptDataType> = [
    {
        question: 'New to Kickflip? ',
        button: 'Create an account',
        link: '/registration',
    },
    {
        question: 'Already have an account? ',
        button: 'Log in',
        link: '/login',
    },
];

export default AuthRedirectPromptData;
