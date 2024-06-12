import {
    CategoriesResponse,
    CustomerAddress,
    Product,
    ServerResponse,
    SignUpDataForm,
    SignUpDataRequest,
    Variants,
    ErrorMessage,
    PriceValue,
    Attributes,
} from '@/types/types';

import { setCookie } from './cookie';
import categoryImageData from '@/data/categoryData';

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

export const processVariants = (masterVariant: Product, variants: Product[]): Variants => {
    const colorImagesMap: { [key: string]: string[] } = {};

    const processVariant = (variant: Product) => {
        const colorAttr = variant.attributes.find((attr) => attr.name === 'color');
        if (colorAttr) {
            const color = colorAttr.value;
            if (!colorImagesMap[color]) {
                colorImagesMap[color] = [];
            }

            if (variant.images.length) {
                variant.images.forEach((image) => {
                    colorImagesMap[color].push(image.url);
                });
            }
        }
    };

    processVariant(masterVariant);
    variants.forEach(processVariant);

    return colorImagesMap;
};

export const getProductsSizes = (masterVariant: Product, variants: Product[]) => {
    const sizes: Set<number> = new Set();

    const getVariantsSizes = (variant: Product) => {
        const sizeAttribute = variant.attributes.find((attr) => attr.name === 'size');
        if (sizeAttribute && typeof sizeAttribute.value === 'number') sizes.add(sizeAttribute.value);
    };

    getVariantsSizes(masterVariant);
    variants.forEach(getVariantsSizes);
    return sizes;
};

export const getAdditionalSize = (sizes: number[]) => {
    const enlargedSizes = [...sizes];
    if (sizes.length < 10) {
        const additionalCount = 10 - sizes.length;
        let lastSize = sizes[sizes.length - 1];

        for (let i = 0; i < additionalCount; i += 1) {
            lastSize += 0.5;
            enlargedSizes.push(lastSize);
        }
    }

    return enlargedSizes;
};

export const getImageFromEachColor = (data: Variants): string[][] => {
    const imageGroups: string[][] = [];

    Object.values(data).forEach((images) => {
        imageGroups.push(images);
    });

    return imageGroups;
};

export const ageRestrictionCheck = (birthDay: Date) => {
    const birthDate = new Date(birthDay);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    return age >= 13 ? true : ErrorMessage.TOO_YOUNG_ERROR;
};

export interface Category {
    imageUrl: string;
    url: string;
    sectionName: string;
    id: string;
}

export interface CategoryData {
    [key: string]: Category;
}

export const transformCategoryData = (responseData: ServerResponse<CategoriesResponse>): CategoryData => {
    const categoryData: CategoryData = {};
    responseData.results.forEach((category) => {
        categoryData[category.key] = {
            url: `${category.slug['en-US']}`,
            sectionName: category.name['en-US'],
            id: category.id,
            imageUrl: categoryImageData[category.key],
        };
    });
    return categoryData;
};

export const setBodyoverflowStyle = (shoulBeHide: boolean) => {
    let overflowStyle: string;
    if (shoulBeHide) {
        overflowStyle = 'hidden';
    } else {
        overflowStyle = '';
    }
    document.body.style.overflow = overflowStyle;
};

export const transformPriceRange = (priceRange: string): string => {
    const [min, max] = priceRange
        .replace('$', '')
        .trim()
        .split('-')
        .map((value) => parseInt(value, 10) * 100);

    return `(${min} to ${max})`;
};

export const findVariantId = (
    masterVariant: Product,
    variants: Product[],
    selectedSize: string,
    SelectedColor: string
): number => {
    const sizeAttribute = masterVariant.attributes.find((attr) => attr.name === 'size')?.value;
    const colorAttribute = masterVariant.attributes.find((attr) => attr.name === 'color')?.value;
    if (sizeAttribute === parseInt(selectedSize, 10) && colorAttribute === SelectedColor) {
        return masterVariant.id;
    }

    const variant = variants.filter((product) => {
        const sizeAttributeVariant = product.attributes.find((attr) => attr.name === 'size')?.value;
        const colorAttributeVariant = product.attributes.find((attr) => attr.name === 'color')?.value;
        if (sizeAttributeVariant && colorAttributeVariant) {
            return sizeAttributeVariant === parseInt(selectedSize, 10) && colorAttributeVariant === SelectedColor;
        }
        return false;
    });

    return variant[0].id;
};

export const getFormatPrice = (price: PriceValue): string => {
    return `${price.centAmount / 10 ** price.fractionDigits}`;
};

export const findAttr = (attr: string, array: Attributes[]) => {
    return array.find((item) => item.name === attr);
};
