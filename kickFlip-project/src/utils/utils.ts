import { CustomerAddress, Product, ProductResponse, SignUpDataForm, SignUpDataRequest } from '@/types/types';
import { setCookie } from './cookie';

export const transformData = (data: SignUpDataForm): SignUpDataRequest => {
    const addresses: CustomerAddress[] = [];
    let defaultShippingAddress: number | undefined;
    let defaultBillingAddress: number | undefined;
    const billingAddresses: number[] = [];
    const shippingAddresses: number[] = [];

    if (data.useBillingAsShipping) {
        addresses.push(data.billingAddress);
        if (data.isDefaultBillingAddress) {
            defaultBillingAddress = 0;
        }
        billingAddresses.push(0);
        shippingAddresses.push(0);
    } else if (data.useShippingAsBilling) {
        addresses.push(data.shippingAddress);
        if (data.isDefaultShippingAddress) {
            defaultShippingAddress = 0;
        }
        billingAddresses.push(0);
        shippingAddresses.push(0);
    } else {
        addresses.push(data.shippingAddress, data.billingAddress);
        if (data.isDefaultShippingAddress) {
            defaultShippingAddress = 0;
        }
        if (data.isDefaultBillingAddress) {
            defaultBillingAddress = 1;
        }
        billingAddresses.push(1);
        shippingAddresses.push(0);
    }

    return {
        email: data.email,
        password: data.password,
        lastName: data.lastName,
        firstName: data.firstName,
        dateOfBirth: data.dateOfBirth,
        addresses,
        shippingAddresses,
        billingAddresses,
        ...(defaultShippingAddress !== undefined && { defaultShippingAddress }),
        ...(defaultBillingAddress !== undefined && { defaultBillingAddress }),
    };
};

export const saveTokens = (accessToken: string, refreshToken: string): void => {
    setCookie('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
};

export const responsesErrorsHandler = (error: unknown, handler: React.Dispatch<React.SetStateAction<string>>) => {
    if (error) {
        if (typeof error === 'object' && 'message' in error) {
            if (typeof error.message === 'string') handler(error.message);
        }
    }
};

export const createBasicAuthToken = (clientId: string, clientSecret: string): string => {
    const token = `${clientId}:${clientSecret}`;
    return btoa(token);
};

export const getImageFromEachColor = (data: ProductResponse) => {
    const colorImagesMap: { [key: string]: string[] } = {};
    const imagePairs: string[][] = [];

    const processVariant = (variant: Product) => {
        const colorAttr = variant.attributes.find((attr) => attr.name === 'color');
        if (colorAttr) {
            const color = colorAttr.value;
            if (!colorImagesMap[color]) {
                colorImagesMap[color] = [];
            }
            variant.images.forEach((image) => {
                if (colorImagesMap[color].length < 2) {
                    colorImagesMap[color].push(image.url);
                }
            });
        }
    };

    const { masterVariant } = data.masterData.current;
    processVariant(masterVariant);

    data.masterData.current.variants.forEach((variant) => {
        processVariant(variant);
    });

    Object.values(colorImagesMap).forEach((images) => {
        if (images.length === 2) {
            imagePairs.push(images);
        }
    });

    return imagePairs;
};
