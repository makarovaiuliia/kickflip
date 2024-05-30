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

export interface ProductResponse {
    id: string;
    key: string;
    masterData: {
        current: ProductData;
    };
}

export interface ProductData {
    name: Text;
    description: Text;
    categories: CategoryInfo[];
    slug: Text;
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

export interface Text {
    'en-US': string;
}

export interface CategoryInfo {
    typeId: string;
    id: string;
}

export interface Price {
    id: string;
    value: PriceValue;
    key: string;
    discounted: {
        value: PriceValue;
    };
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

export interface ServerResponse<T> {
    limit: number;
    offset: number;
    count: number;
    total: number;
    results: T[];
}

export interface DiscountResponse {
    id: string;
    value: DiscountValue;
    predicate: string;
    name: Text;
    description: Text;
    active: boolean;
}

interface DiscountValue {
    type: string;
    permyriad: number;
}

export interface CategoriesResponse {
    id: string;
    key: string;
    name: Text;
    slug: Text;
    description: Text;
}

export type Variants = {
    [key: string]: string[];
};

export interface ProductProjected {
    id: string;
    key: string;
    name: Text;
    description: Text;
    categories: CategoryInfo[];
    slug: Text;
    masterVariant: Product;
    variants: Product[];
}

export type FilterOptions = 'color' | 'size' | 'price';

export interface TransformParams {
    filter: Record<FilterOptions, string[]>;
    sort: string;
}

export enum SearchQuery {
    color = 'variants.attributes.color:',
    size = 'variants.attributes.size:',
    price = 'variants.price.centAmount:range ',
}
