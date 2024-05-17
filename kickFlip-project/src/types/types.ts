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

export type TUser = {
    email: string;
};

export type TAddress = {
    country: string;
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
