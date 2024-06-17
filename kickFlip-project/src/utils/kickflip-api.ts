import {
    CategoriesResponse,
    FilterOptions,
    LogInData,
    ProductProjected,
    ProductResponse,
    SearchQuery,
    ServerResponse,
    SignUpDataForm,
    SignUpDataRequest,
    TAddress,
    TransformParams,
    UpdatePasswordForm,
    UpdateUserProfileDataFormRequest,
    UpdateUserAddressFormRequest,
    AddNewAddressFormRequest,
    NewAddressAction,
    UpdateAddressAction,
} from '@/types/types';
import { getCookie } from './cookie';
import { createBasicAuthToken, saveTokens, transformData, transformPriceRange } from './utils';

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
        if ((err as { message: string }).message === 'invalid_token') {
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

export const loginUserApi = (data: LogInData): Promise<TAuthResponse> => {
    const loginBody = {
        username: data.email,
        password: data.password,
        grant_type: 'password',
    };

    return fetch(`${authUrl}/oauth/${projectKey}/customers/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${basicToken}`,
        },
        body: new URLSearchParams(Object.entries(loginBody)).toString(),
    })
        .then((res) => checkResponse<TAuthResponse>(res))
        .then((result) => {
            if (result) return result;
            return Promise.reject(result);
        });
};

export const getAnonymousTokenApi = (): Promise<TAuthResponse> => {
    const body = {
        grant_type: 'client_credentials',
    };

    return fetch(`${authUrl}/oauth/${projectKey}/anonymous/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${basicToken}`,
        },
        body: new URLSearchParams(Object.entries(body)).toString(),
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

export const updateUserAddressApi = (data: UpdateUserAddressFormRequest) => {
    const dataRequest: UpdateAddressAction = {
        version: data.version!,
        actions: [],
    };
    if (data.data?.billingAddress) {
        dataRequest.actions.push({
            action: 'changeAddress',
            addressId: data.addressId,
            address: data.data?.billingAddress,
        });
    } else if (data.data?.shippingAddress) {
        dataRequest.actions.push({
            action: 'changeAddress',
            addressId: data.addressId,
            address: data.data?.shippingAddress,
        });
    }
    if (data.defaultCheckedBilling !== data.data?.isBillingAddress) {
        if (data.data?.isBillingAddress === true) {
            dataRequest.actions.push({
                action: 'addBillingAddressId',
                addressId: data.addressId,
            });
        } else {
            dataRequest.actions.push({
                action: 'removeBillingAddressId',
                addressId: data.addressId,
            });
        }
    }
    if (data.defaultcheckedBillingDefault !== data.data?.isDefaultBillingAddress) {
        if (data.data?.isDefaultBillingAddress === true) {
            dataRequest.actions.push({
                action: 'setDefaultBillingAddress',
                addressId: data.addressId,
            });
        }
    }
    if (data.defaultCheckedShipping !== data.data?.isShippingAddress) {
        if (data.data?.isShippingAddress === true) {
            dataRequest.actions.push({
                action: 'addShippingAddressId',
                addressId: data.addressId,
            });
        } else {
            dataRequest.actions.push({
                action: 'removeShippingAddressId',
                addressId: data.addressId,
            });
        }
    }
    if (data.defaultcheckedBillingDefault !== data.data?.isDefaultShippingAddress) {
        if (data.data?.isDefaultShippingAddress === true) {
            dataRequest.actions.push({
                action: 'setDefaultShippingAddress',
                addressId: data.addressId,
            });
        }
    }
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

export const deleteUserAddressApi = (data: UpdateUserAddressFormRequest) => {
    const dataRequest = {
        version: data.version,
        actions: [
            {
                action: 'removeAddress',
                addressId: data.addressId,
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

export const addNewUserAddressApi = (data: AddNewAddressFormRequest) => {
    const dataRequest = {
        version: data.version,
        actions: [
            {
                action: 'addAddress',
                address: data.data?.newAddress,
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
        .then((res) => {
            const targetAdress = res.addresses[res.addresses.length - 1];
            const dataRequestN: NewAddressAction = {
                version: data.version! + 1,
                actions: [],
            };
            if (data.data?.addToShipping === true && data.data.isDefaultShippingAddress === false) {
                dataRequestN.actions.push({
                    action: 'addShippingAddressId',
                    addressId: targetAdress.id!,
                });
            } else if (data.data?.addToShipping === true && data.data.isDefaultShippingAddress === true) {
                dataRequestN.actions.push({
                    action: 'setDefaultShippingAddress',
                    addressId: targetAdress.id!,
                });
                dataRequestN.actions.push({
                    action: 'addShippingAddressId',
                    addressId: targetAdress.id!,
                });
            }
            if (data.data?.addToBilling === true && data.data.isDefaultBillingAddress === false) {
                dataRequestN.actions.push({
                    action: 'addBillingAddressId',
                    addressId: targetAdress.id!,
                });
            } else if (data.data?.addToBilling === true && data.data.isDefaultBillingAddress === true) {
                dataRequestN.actions.push({
                    action: 'setDefaultBillingAddress',
                    addressId: targetAdress.id!,
                });
                dataRequestN.actions.push({
                    action: 'addBillingAddressId',
                    addressId: targetAdress.id!,
                });
            }
            return fetch(`${URL}/${projectKey}/customers/${data.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: `Bearer ${getCookie('accessToken')}`,
                },
                body: JSON.stringify(dataRequestN),
            });
        })
        .then((resul) => checkResponse<TUserResponse>(resul))
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

export const getProductsFilteredApi = (options?: TransformParams) => {
    let query = '';

    if (options) {
        if (options.filter) {
            const filters = Object.keys(options.filter)
                .filter((key): key is FilterOptions => {
                    const filterKey = key as FilterOptions;
                    return options.filter[filterKey].length > 0;
                })
                .map((key) => {
                    const filterKey = key as FilterOptions;
                    const values = options.filter[filterKey]
                        .map((value) => {
                            if (filterKey === 'price') {
                                const adaptedValue = transformPriceRange(value);
                                return `${adaptedValue.toLowerCase()}`;
                            }
                            if (filterKey === 'discount') {
                                return 'exists';
                            }
                            return `"${value.toLowerCase()}"`;
                        })
                        .join(',');
                    return `${SearchQuery[filterKey]}${values}`;
                })
                .join('&filter=');

            if (filters.length > 0) {
                query += `filter=${filters}`;
            }
        }

        if (options.sort) {
            query += query ? `&sort=${options.sort}` : `sort=${options.sort}`;
        }

        if (options.search) {
            query += query
                ? `&${SearchQuery.search}=${options.search}&fuzzy=true`
                : `${SearchQuery.search}=${options.search}&fuzzy=true`;
        }
    }

    const fetchUrl = `${URL}/${projectKey}/product-projections/search?${query}&limit=500`;

    return fetch(fetchUrl, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
            'Content-Type': 'application/json',
        },
    })
        .then((res) => checkResponse<ServerResponse<ProductProjected>>(res))
        .then((result) => {
            if (result) return result;
            return Promise.reject(result);
        });
};

export const getCategoriesApi = () => {
    return fetch(`${URL}/${projectKey}/categories`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
        },
    })
        .then((res) => checkResponse<ServerResponse<CategoriesResponse>>(res))
        .then((result) => {
            if (result) return result;
            return Promise.reject(result);
        });
};

export const getProductById = async (id: string) => {
    const response = await fetch(`${URL}/${projectKey}/products/${id}`, {
        headers: {
            authorization: `Bearer ${getCookie('accessToken')}`,
        },
    });

    const data = checkResponse<ProductResponse>(response);
    return data;
};
