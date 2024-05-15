import { LogInData, SignUpDataForm, SignUpDataRequest, TAddress } from '@/types/types';
import { getCookie } from './cookie';

const AuthURL = 'https://auth.europe-west1.gcp.commercetools.com';
const URL = 'https://api.europe-west1.gcp.commercetools.com';
const projectKey = 'kick-flip_webstore-warriors';

const checkResponse = <T>(res: Response): Promise<T> =>
    res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

type TAuthResponse = {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
    refresh_token: string;
};

export const loginUserApi = (data: LogInData) =>
    fetch(
        `${AuthURL}/oauth/${projectKey}/customers/token?grant_type=password&username=${data.email}&password=${data.password}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Basic ${getCookie('accessToken')}`,
            },
        }
    )
        .then((res) => checkResponse<TAuthResponse>(res))
        .then((result) => {
            if (result) return result;
            return Promise.reject(result);
        });

export const getAnonymousTokenApi = () => {
    fetch(`${AuthURL}/oauth/${projectKey}/anonymous/token?grant_type=client_credentials`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Basic bUFNUXlzbVU4eTVyMy1qS0Q5Qm9JamJFOjZKZnFmYjVHR0pYZzZtd2QxNjUxZ2QwdEJYVHRITFE0',
        },
    })
        .then((res) => checkResponse<TAuthResponse>(res))
        .then((result) => {
            if (result) return result;
            return Promise.reject(result);
        });
};

export type TUserResponse = {
    id: string;
    version: number;
    versionModifiedAt: string;
    lastMessageSequenceNumber: number;
    createdAt: string;
    lastModifiedAt: string;
    lastModifiedBy: {
        clientId: string;
        isPlatformClient: boolean;
    };
    createdBy: {
        clientId: string;
        isPlatformClient: boolean;
    };
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    addresses: Array<TAddress>;
    shippingAddressIds: Array<string>;
    billingAddressIds: Array<string>;
    isEmailVerified: boolean;
    stores: Array<string>;
    authenticationMode: string;
};

export const getUserByIDApi = (userID: string) => {
    fetch(`${URL}/${projectKey}/customers/${userID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${getCookie('accessToken')}`,
        },
    })
        .then((res) => checkResponse<TUserResponse>(res))
        .then((result) => {
            if (result) return result;
            return Promise.reject(result);
        });
};

export const signUpUserApi = (data: SignUpDataForm) => {
    const { isDefaultAddress, ...rest } = data;
    const defaultAddress = isDefaultAddress ? data.addresses[0] : undefined;

    const signUpData: SignUpDataRequest = {
        ...rest,
        defaultBillingAddress: defaultAddress,
        defaultShippingAddress: defaultAddress,
    };

    fetch(`${URL}/${projectKey}/me/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${getCookie('accessToken')}`,
        },
        body: JSON.stringify(signUpData),
    })
        .then((res) => checkResponse<TUserResponse>(res))
        .then((result) => {
            if (result) return result;
            return Promise.reject(result);
        });
};
