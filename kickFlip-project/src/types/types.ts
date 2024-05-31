export enum ErrorMessage {
    REQUIRED_FIELD = 'Required field',
    EMAIL_ERROR = 'Please enter valid e-mail address',
    PASSWORD_ERROR_LENGTH = 'Password must be at least 8 characters long',
    PASSWORD_ERROR_REGEX = 'Password must contain at least one uppercase letter, one lowercase letter, and one digit. Please use only Latin characters',
    PASSWORD_ERROR_SPACE = 'Password must not contain leading or trailing whitespace',
    ERROR_REGEX = 'Field  must not contain special characters or numbers',
    ERROR_LENGTH = 'Field  must  contain at least one character',
    TOO_YOUNG_ERROR = 'You must be at least 13 years old',
    POSTAL_CODE_ERROR = 'Postal code must follow the format for the country  ',
}

export enum Country {
    AUSTRIA = 'AU',
    BELARUS = 'BU',
    GEORGIA = 'GE',
    RUSSIA = 'RU',
}

export enum StateMessage {
    Registered = 'You have been successfully registered',
    UpdatedProfileData = 'Your data have been successfully updated',
    UpdatedProfileAddress = 'Your address have been successfully updated',
}
export type TUser = {
    email?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    addresses?: Array<TAddress>;
    billingAddressIds?: Array<string>;
    shippingAddressIds?: Array<string>;
    password?: string;
    id?: string;
    version?: number;
    defaultBillingAddressId?: string;
    defaultShippingAddressId?: string;
};

export type TAddress = {
    country: string;
    id?: string;
    title?: string;
    salutation?: string;
    firstName?: string;
    lastName?: string;
    streetName?: string;
    streetNumber?: string;
    additionalStreetInfo?: string;
    postalCode?: string;
    city?: string;
    region?: string;
    state?: string;
    company?: string;
    department?: string;
    building?: string;
    apartment?: string;
    pOBox?: string;
    phone?: string;
    mobile?: string;
    email?: string;
    fax?: string;
    additionalAddressInfo?: string;
};

export type AuthRedirectPromptDataType = {
    question: string;
    button: string;
    link: string;
};

export type CustomerAddress = {
    key: string;
    streetName: string;
    streetNumber: string;
    city: string;
    postalCode: string;
    country: string;
};

export interface SignUpData {
    email: string;
    password: string;
    lastName: string;
    firstName: string;
    dateOfBirth: Date;
}

export interface SignUpDataForm extends SignUpData {
    shippingAddress: CustomerAddress;
    isDefaultShippingAddress: boolean;
    isDefaultBillingAddress: boolean;
    billingAddress: CustomerAddress;
    useBillingAsShipping: boolean;
    useShippingAsBilling: boolean;
}

export interface UpdateUserAddressForm {
    shippingAddress: CustomerAddress;
    isDefaultShippingAddress: boolean;
    isDefaultBillingAddress: boolean;
    billingAddress: CustomerAddress;
    useBillingAsShipping: boolean;
    useShippingAsBilling: boolean;
}

export interface UpdateUserAddressFormRequest {
    id?: string;
    version?: number;
    addressId?: string;
    data?: UpdateUserAddressForm;
}

export interface UpdatePasswordForm {
    currentPassword: string;
    newPassword: string;
}

export interface UpdateUserProfileDataFormRequest {
    id?: string;
    version?: number;
    data?: UpdateUserProfileDataForm;
}

export interface UpdateUserProfileDataForm {
    email?: string;
    lastName?: string;
    firstName?: string;
    dateOfBirth?: Date;
}

export interface SignUpDataRequest extends SignUpData {
    defaultShippingAddress?: number;
    defaultBillingAddress?: number;
    addresses: CustomerAddress[];
    billingAddresses: number[];
    shippingAddresses: number[];
}

export interface LogInData {
    email: string;
    password: string;
}

export interface ProductResponse {
    id: string;
    key: string;
    masterData: {
        current: ProductData;
    };
}

export interface ProductData {
    name: ProductText;
    description: ProductText;
    categories: Category[];
    slug: ProductText;
    masterVariant: Product;
    variants: Product[];
}

export interface Product {
    id: number;
    sku: string;
    key: string;
    prices: Price[];
    images: Image[];
    attributes: Attributes[];
}

export interface ProductText {
    'en-US': string;
}

export interface Category {
    typeId: string;
    id: string;
}

export interface Price {
    id: string;
    value: PriceValue;
    key: string;
}

export interface PriceValue {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
}

export interface Image {
    url: string;
    dimensions: {
        w: number;
        h: number;
    };
}

export interface Attributes {
    name: string;
    value: string | number;
}
