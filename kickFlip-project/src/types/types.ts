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
}

export enum SearchQuery {
    color = 'variants.attributes.color:',
    size = 'variants.attributes.size:',
    price = 'variants.price.centAmount:range ',
    search = 'text.en-US',
    discount = 'variants.prices.discounted:',
}

export type ProductTypeReference = {
    id: string;
    typeId: string;
};

export type Refference = {
    id: string;
    typeId: string;
};
export type KeyRefference = {
    key: string;
    typeId: string;
};

export type DiscountOnTotalPrice = {
    discountedAmount: PriceValue;
    includedDiscounts: DiscountedLineItemPortion[];
    discountedNetAmount: PriceValue;
    discountedGrossAmount: PriceValue;
};

export type DiscountedLineItemPortion = {
    discount: Refference;
    discountedAmount: PriceValue;
};

export type DiscountedLineItemPrice = {
    value: PriceValue;
    includedDiscounts: DiscountedLineItemPortion[];
};

export type DiscountedLineItemPriceForQuantity = {
    quantity: number;
    discountedPrice: DiscountedLineItemPrice;
};

export type TaxPortion = {
    name: string;
    rate: number;
    amount: PriceValue;
};

export type TaxedItemPrice = {
    totalNet: PriceValue;
    totalGross: PriceValue;
    taxPortions: TaxPortion[];
    totalTax?: PriceValue;
};
export type SubRate = {
    name: string;
    amount: number;
};

export type TaxRate = {
    id?: string;
    key?: string;
    name: string;
    amount: number;
    includedInPrice: boolean;
    country: string;
    state?: string;
    subRates?: SubRate[];
};

export type MethodTaxedPrice = {
    shippingMethodKey: string;
    taxedPrice: TaxedItemPrice;
};
export type MethodTaxRate = {
    shippingMethodKey: string;
    taxRate: TaxRate;
};

export type ItemState = {
    quantity: number;
    state: Refference;
};

export type ItemShippingTarget = {
    addressKey: string;
    quantity: number;
    shippingMethodKey: string;
};
export type ItemShippingDetails = {
    targets: ItemShippingTarget[];
    valid: boolean;
};

export type TypeResourceIdentifier = {
    id: string;
    key: string;
    typeId: string;
};

export type CustomFieldsDraft = {
    type: TypeResourceIdentifier;
};

export interface LineItem {
    id: string;
    version: number;
    key?: string;
    productId: string;
    productKey?: string;
    name: Text;
    productSlug?: Text;
    productType: ProductTypeReference;
    variant: Product;
    price: Price;
    quantity: number;
    totalPrice: PriceValue;
    discountedPricePerQuantity: DiscountedLineItemPriceForQuantity[];
    taxedPrice?: TaxedItemPrice;
    taxedPricePortions?: MethodTaxedPrice[];
    state: ItemState[];
    taxRate?: TaxRate;
    perMethodTaxRate: MethodTaxRate[];
    supplyChannel?: Refference;
    distributionChannel?: Refference;
    priceMode: string;
    lineItemMode: string;
    inventoryMode?: string;
    shippingDetails?: ItemShippingDetails;
    addedAt?: Date;
    custom?: CustomFieldsDraft;
    lastModifiedAt?: Date;
}

export interface CustomLineItem {
    id: string;
    key?: string;
    name: Text;
    money: PriceValue;
    taxedPrice?: TaxedItemPrice;
    taxedPricePortions: MethodTaxedPrice[];
    totalPrice: PriceValue;
    slug: string;
    taxCategory: Refference;
    taxRate: TaxRate;
    perMethodTaxRate: MethodTaxRate[];
    discountedPricePerQuantity: DiscountedLineItemPriceForQuantity[];
    shippingDetails?: ItemShippingDetails;
    priceMode: string;
    custom?: CustomFieldsDraft;
}

type CartValueTier = {
    type: string;
    minimumCentAmount: number;
    price: Pick<PriceValue, 'centAmount' | 'currencyCode'>;
    isMatching?: boolean;
};

type CartClassificationTier = {
    type: string;
    value: string;
    price: Pick<PriceValue, 'centAmount' | 'currencyCode'>;
    isMatching?: boolean;
};

type CartScoreTier = {
    type: string;
    score: number;
    price?: Pick<PriceValue, 'centAmount' | 'currencyCode'>;
    priceFunction?: {
        currencyCode: string;
        function: string;
    };
    isMatching?: boolean;
};

export type ShippingRatePriceTier = CartValueTier | CartClassificationTier | CartScoreTier;

export type ShippingRate = {
    price: PriceValue;
    freeAbove?: PriceValue;
    isMatching?: boolean;
    tiers: ShippingRatePriceTier[];
};

type DeliveryItem = {
    id: string;
    quantity: number;
};

type Parcel = {
    id: string;
    key?: string;
    measurements?: number;
    trackingData?: string | boolean;
    items?: DeliveryItem[];
    custom?: CustomFieldsDraft;
    createdAt: Date;
};
export type Delivery = {
    id: string;
    key?: string;
    items: DeliveryItem[];
    parcels: Parcel[];
    address?: TAddress;
    custom?: CustomFieldsDraft;
    createdAt: Date;
};

export type ShippingInfo = {
    shippingMethodName: string;
    price: PriceValue;
    shippingRate: ShippingRate;
    taxedPrice?: TaxedItemPrice;
    taxRate?: TaxRate;
    taxCategory?: Refference;
    shippingMethod?: Refference;
    deliveries?: Delivery[];
    discountedPrice?: DiscountedLineItemPrice;
    shippingMethodState: string;
};

export type Shipping = {
    shippingKey: string;
    shippingInfo: ShippingInfo;
    shippingAddress: TAddress;
};

export type DiscountCodeInfo = {
    discountCode: Refference;
    state: string;
};

// export type DirectDiscount = {
//     id: string;
//     value:
//     target?: LineItem| CustomLineItem |ShippingInfo| PriceValue
// }

type PaymentInfo = {
    payments: Refference[];
};

export interface Cart {
    id: string;
    version: number;
    key?: string;
    customerId?: string;
    customerEmail?: string;
    customerGroup?: Refference;
    anonymousId?: string;
    businessUnit?: KeyRefference;
    store?: KeyRefference;
    lineItems: LineItem[];
    customLineItems: CustomLineItem[];
    totalLineItemQuantity?: number;
    totalPrice: PriceValue;
    taxedPrice?: TaxedItemPrice;
    taxedShippingPrice?: TaxedItemPrice;
    discountOnTotalPrice?: DiscountOnTotalPrice;
    taxMode: string;
    taxRoundingMode: string;
    taxCalculationMode: string;
    inventoryMode: string;
    cartState: string;
    billingAddress?: TAddress;
    shippingAddress?: TAddress;
    shippingMode: string;
    shippingKey?: string;
    shippingInfo?: ShippingInfo;
    shipping: Shipping[];
    itemShippingAddresses: TAddress[];
    discountCodes: DiscountCodeInfo;
    directDiscounts: DirectDiscount[];
    refusedGifts: Refference;
    paymentInfo?: PaymentInfo;
    country?: string;
    locale?: string;
    origin: string;
    deleteDaysAfterLastModification?: number;
    custom?: CustomFieldsDraft;
    createdAt: Date;
    lastModifiedAt: Date;
}
