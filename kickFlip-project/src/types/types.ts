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
    UpdatedProfilePassword = 'Your password has been successfully updated',
    UpdatedProfileData = 'Your data have been successfully updated',
    UpdatedProfileAddress = 'Your address have been successfully updated',
    DeletedProfileAddress = 'Your address have been successfully deleted',
    AddedProfileAddress = 'Your address have been successfully added',
}

export enum DefaultCartItem {
    ShippingCost = '30',
    ItemDescription = 'Awesome sneakers',
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

export interface AddNewAddressForm {
    newAddress: CustomerAddress;
    isDefaultAddress: boolean;
    isDefaultShippingAddress: boolean;
    isDefaultBillingAddress: boolean;
    addToBillingShipping?: string;
    addToBilling?: boolean;
    addToShipping?: boolean;
}

export interface AddNewAddressFormRequest {
    id?: string;
    version?: number;
    adresses?: TAddress[];
    addressId?: string;
    data?: AddNewAddressForm;
}

export interface UpdateUserAddressForm {
    shippingAddress: CustomerAddress;
    isDefaultShippingAddress: boolean;
    isDefaultBillingAddress: boolean;
    billingAddress: CustomerAddress;
    isShippingAddress: boolean;
    isBillingAddress: boolean;
}

export interface UpdateUserAddressFormRequest {
    id?: string;
    version?: number;
    addressId?: string;
    data?: UpdateUserAddressForm;
    defaultCheckedBilling?: boolean;
    defaultcheckedBillingDefault?: boolean;
    defaultCheckedShipping?: boolean;
    defaultCheckedShippingDefault?: boolean;
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

export interface UpdateAddressAction {
    version: number;
    actions: Array<UpdateAddressActionsRequest>;
}

export interface UpdateAddressActionsRequest {
    action: string;
    addressId?: string;
    address?: CustomerAddress;
}

export interface NewAddressAction {
    version: number;
    actions: Array<NewAddressActionsRequest>;
}

export interface NewAddressActionsRequest {
    action: string;
    addressId: string;
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

export type FilterOptions = 'color' | 'size' | 'price' | 'discount';

export interface TransformParams {
    filter: Record<FilterOptions, string[]>;
    sort: string;
    search: string;
    category: string;
}

export enum SearchQueryVariants {
    color = 'variants.attributes.color:',
    size = 'variants.attributes.size:',
    price = 'variants.price.centAmount:range ',
    search = 'text.en-US',
    discount = 'variants.prices.discounted:',
    category = 'filter=categories.id:',
}

export type ProductTypeReference = {
    id: string;
    typeId: string;
};

export interface LineItem {
    id: string;
    key?: string;
    productId: string;
    productKey?: string;
    name: Text;
    variant: Product;
    price: Price;
    quantity: number;
    totalPrice: PriceValue;
}

export interface DiscountCodeInfo {
    discountCode: ProductTypeReference;
    state: string;
}

export interface CartResponse {
    id: string;
    version: number;
    key?: string;
    customerId?: string;
    anonymousId?: string;
    lineItems: LineItem[];
    totalLineItemQuantity?: number;
    totalPrice: PriceValue;
    cartState: string;
    discountCodes: DiscountCodeInfo[];
}

export interface AddItemToCartBody {
    version: number;
    actions: AddItemToCartAction[];
}

export interface AddItemToCartAction {
    action: string;
    productId: string;
    variantId: number;
}

export type UpdateAction = {
    action: string;
    lineItemId: string;
    quantity: number;
};
export type ChangeLineItem = {
    version: number;
    actions: UpdateAction[];
};
