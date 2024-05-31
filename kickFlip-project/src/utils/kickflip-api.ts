import {
    LogInData,
    SignUpDataForm,
    SignUpDataRequest,
    TAddress,
    UpdatePasswordForm,
    // UpdateUserProfileDataForm,
    UpdateUserProfileDataFormRequest,
    UpdateUserAddressForm,
} from '@/types/types';
import { getCookie } from './cookie';
import { createBasicAuthToken, saveTokens, transformData } from './utils';

const authUrl = import.meta.env.VITE_CTP_AUTH_URL;
const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
const URL = import.meta.env.VITE_CTP_API_URL;
const basicToken = createBasicAuthToken(import.meta.env.VITE_CTP_CLIENT_ID, import.meta.env.VITE_CTP_CLIENT_SECRET);

const checkResponse = <T>(res: Response): Promise<T> =>
    res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

type TRefreshResponse = {
    refreshToken: string;
    accessToken: string;
};

export const refreshToken = (): Promise<TRefreshResponse> =>
    fetch(`${authUrl}/oauth/token?grant_type=refresh_token&refresh_token=${sessionStorage.getItem('refreshToken')}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })
        .then((res) => checkResponse<TRefreshResponse>(res))
        .then((refreshData) => {
            if (!refreshData) {
                return Promise.reject(refreshData);
            }
            saveTokens(refreshData.accessToken, refreshData.refreshToken);
            return refreshData;
        });

export const fetchWithRefresh = async <T>(url: RequestInfo, options: RequestInit) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse<T>(res);
    } catch (err) {
        if ((err as { message: string }).message === 'invalid_grant') {
            const refreshData = await refreshToken();
            const updatedOptions = { ...options };
            if (updatedOptions.headers) {
                (updatedOptions.headers as { [key: string]: string }).authorization =
                    `Bearer ${refreshData.accessToken}`;
            }
            const res = await fetch(url, options);
            return await checkResponse<T>(res);
        }
        return Promise.reject(err);
    }
};

type TAuthResponse = {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
    refresh_token: string;
};

export const loginUserApi = (data: LogInData): Promise<TAuthResponse> =>
    fetch(
        `${authUrl}/oauth/${projectKey}/customers/token?grant_type=password&username=${data.email}&password=${data.password}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Basic ${basicToken}`,
            },
        }
    )
        .then((res) => checkResponse<TAuthResponse>(res))
        .then((result) => {
            if (result) return result;
            return Promise.reject(result);
        });

export const getAnonymousTokenApi = (): Promise<TAuthResponse> => {
    return fetch(`${authUrl}/oauth/${projectKey}/anonymous/token?grant_type=client_credentials`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Basic ${basicToken}`,
        },
    })
        .then((res) => checkResponse<TAuthResponse>(res))
        .then((result) => {
            if (result) return result;
            return Promise.reject(result);
        });
};

export type TUserResponse = {
    customer: TCustomerResponse;
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

export type TCustomerResponse = {
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

export const signUpUserApi = (data: SignUpDataForm) => {
    const signUpData: SignUpDataRequest = transformData(data);

    return fetch(`${URL}/${projectKey}/me/signup`, {
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

export const updateUserPasswordApi = (data: UpdatePasswordForm) => {
    return fetch(`${URL}/${projectKey}/customers/password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${getCookie('accessToken')}`,
        },
        body: JSON.stringify(data),
    })
        .then((res) => checkResponse<TUserResponse>(res))
        .then((result) => {
            if (result) return result;
            return Promise.reject(result);
        });
};

export const updateUserProfileDataApi = (data: UpdateUserProfileDataFormRequest) => {
    const dataRequest = {
        version: data.version,
        actions: [
            {
                action: 'changeEmail',
                email: data.data?.email,
            },
            {
                action: 'setFirstName',
                firstName: data.data?.firstName,
            },
            {
                action: 'setLastName',
                lastName: data.data?.lastName,
            },
            {
                action: 'setDateOfBirth',
                dateOfBirth: data.data?.dateOfBirth,
            },
        ],
    };
    return fetch(`${URL}/${projectKey}/customers/${data.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${getCookie('accessToken')}`,
        },
        body: JSON.stringify(dataRequest),
    })
        .then((res) => checkResponse<TUserResponse>(res))
        .then((result) => {
            if (result) return result;
            return Promise.reject(result);
        });
};

export const updateUserAddressApi = (data: UpdateUserAddressForm) => {
    return fetch(`${URL}/${projectKey}/customers/${data}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${getCookie('accessToken')}`,
        },
        body: JSON.stringify(data),
    })
        .then((res) => checkResponse<TUserResponse>(res))
        .then((result) => {
            if (result) return result;
            return Promise.reject(result);
        });
};

export const getUserApi = () =>
    fetchWithRefresh<TUserResponse>(`${URL}/${projectKey}/me`, {
        headers: {
            authorization: `Bearer ${getCookie('accessToken')}`,
        } as HeadersInit,
    });
