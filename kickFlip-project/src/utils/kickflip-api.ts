import {
    CategoriesResponse,
    FilterOptions,
    LogInData,
    ProductProjected,
    ProductResponse,
    SearchQueryVariants,
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
    CartResponse,
    AddItemToCartAction,
    AddItemToCartBody,
    TUser,
    ChangeLineItem,
} from '@/types/types';
import { getCookie } from './cookie';
import { createBasicAuthToken, findAttr, saveTokens, transformData, transformPriceRange } from './utils';

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

interface LoginResponse {
    customer: TUser;
    cart?: CartResponse;
}

export const signInUserApi = (data: LogInData, cartId: string): Promise<LoginResponse> => {
    const loginBody = {
        email: data.email,
        password: data.password,
        anonymousCart: {
            id: cartId,
            typeId: 'cart',
        },
        activeCartSignInMode: 'MergeWithExistingCustomerCart',
    };

    return fetch(`${URL}/${projectKey}/me/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('accessToken')}`,
        },
        body: JSON.stringify(loginBody),
    })
        .then((res) => checkResponse<LoginResponse>(res))
        .then((result) => {
            if (result) return result;
            return Promise.reject(result);
        });
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

export const getAnonymousTokenApi = (id: string): Promise<TAuthResponse> => {
    const body = {
        grant_type: 'client_credentials',
        anonymous_id: id,
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

export const signUpUserApi = (data: SignUpDataForm, cartId: string) => {
    const signUpData: SignUpDataRequest = transformData(data);

    const body = {
        ...signUpData,
        anonymousCart: {
            id: cartId,
            typeId: 'cart',
        },
        activeCartSignInMode: 'MergeWithExistingCustomerCart',
    };

    return fetch(`${URL}/${projectKey}/me/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${getCookie('accessToken')}`,
        },
        body: JSON.stringify(body),
    })
        .then((res) => checkResponse<LoginResponse>(res))
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
    if (data.defaultCheckedBillingDefault !== data.data?.isDefaultBillingAddress) {
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
    if (data.defaultCheckedBillingDefault !== data.data?.isDefaultShippingAddress) {
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
            const targetAddress = res.addresses[res.addresses.length - 1];
            const dataRequestN: NewAddressAction = {
                version: data.version! + 1,
                actions: [],
            };
            if (data.data?.addToShipping === true && data.data.isDefaultShippingAddress === false) {
                dataRequestN.actions.push({
                    action: 'addShippingAddressId',
                    addressId: targetAddress.id!,
                });
            } else if (data.data?.addToShipping === true && data.data.isDefaultShippingAddress === true) {
                dataRequestN.actions.push({
                    action: 'setDefaultShippingAddress',
                    addressId: targetAddress.id!,
                });
                dataRequestN.actions.push({
                    action: 'addShippingAddressId',
                    addressId: targetAddress.id!,
                });
            }
            if (data.data?.addToBilling === true && data.data.isDefaultBillingAddress === false) {
                dataRequestN.actions.push({
                    action: 'addBillingAddressId',
                    addressId: targetAddress.id!,
                });
            } else if (data.data?.addToBilling === true && data.data.isDefaultBillingAddress === true) {
                dataRequestN.actions.push({
                    action: 'setDefaultBillingAddress',
                    addressId: targetAddress.id!,
                });
                dataRequestN.actions.push({
                    action: 'addBillingAddressId',
                    addressId: targetAddress.id!,
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
        .then((result) => checkResponse<TUserResponse>(result))
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

export const getProductsFilteredApi = (options: TransformParams, offset: number) => {
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
                    return `${SearchQueryVariants[filterKey]}${values}`;
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
                ? `&${SearchQueryVariants.search}=${options.search}&fuzzy=true`
                : `${SearchQueryVariants.search}=${options.search}&fuzzy=true`;
        }

        if (options.category) {
            query += query
                ? `&${SearchQueryVariants.category}"${options.category}"`
                : `${SearchQueryVariants.category}"${options.category}"`;
        }
    }

    const fetchUrl = `${URL}/${projectKey}/product-projections/search?${query}&limit=6&offset=${offset}`;

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

export const createCartApi = async () => {
    const response = await fetch(`${URL}/${projectKey}/me/carts`, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${getCookie('accessToken')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            currency: 'USD',
        }),
    });

    const data = checkResponse<CartResponse>(response);
    return data;
};

export const addToCartApi = async (cartId: string, item: AddItemToCartAction, version: number) => {
    const body: AddItemToCartBody = {
        version,
        actions: [item],
    };
    const response = await fetch(`${URL}/${projectKey}/me/carts/${cartId}`, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${getCookie('accessToken')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data = checkResponse<CartResponse>(response);
    return data;
};

export const getActiveCartApi = async () => {
    const response = await fetch(`${URL}/${projectKey}/me/active-cart`, {
        headers: {
            authorization: `Bearer ${getCookie('accessToken')}`,
            'Content-Type': 'application/json',
        },
    });

    const data = checkResponse<CartResponse>(response);
    return data;
};

export const getCartById = async (cartId: string) => {
    const response = await fetch(`${URL}/${projectKey}/me/carts/${cartId}`, {
        headers: {
            authorization: `Bearer ${getCookie('accessToken')}`,
        },
    });

    const data = checkResponse<CartResponse>(response);
    return data;
};

export const getProductImg = async (id: string, color: string) => {
    try {
        const response = await getProductById(id);

        const products = response.masterData.current;
        const variants = [...products.variants, products.masterVariant];
        const product = variants.find((variant) => {
            return findAttr('color', variant.attributes)?.value === color && variant.images.length !== 0;
        });

        const img = product?.images[0];
        return img;
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
        return undefined;
    }
};

export const updateCart = async (cartId: string, updateLineItemQuantity: ChangeLineItem) => {
    const response = await fetch(`${URL}/${projectKey}/me/carts/${cartId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getCookie('accessToken')}`,
        },
        body: JSON.stringify(updateLineItemQuantity),
    });

    const data = checkResponse<CartResponse>(response);
    return data;
};

export const deleteCartApi = async (cartId: string, cartVersion: number) => {
    const response = await fetch(`${URL}/${projectKey}/me/carts/${cartId}?version=${cartVersion}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${getCookie('accessToken')}`,
        },
    });
    const data = checkResponse<CartResponse>(response);
    return data;
};
