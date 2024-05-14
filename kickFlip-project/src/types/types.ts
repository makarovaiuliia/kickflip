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

// export type TUser = {
//     email: string;
//     password: string;
//     firstName: string;
//     lastName: string;
//     addresses: TAddress[];
// };

export type TAddress = {
    country: string; // CountryCode representing the name of the country.
    title?: string; // Title of the contact, e.g., 'Dr.'
    salutation?: string; // Salutation of the contact, e.g., 'Mr.' or 'Ms.'
    firstName?: string; // Given name (first name) of the contact.
    lastName?: string; // Family name (last name) of the contact.
    streetName?: string; // Name of the street.
    streetNumber?: string; // Street number.
    additionalStreetInfo?: string; // Further information on the street address.
    postalCode?: string; // Postal code.
    city?: string; // Name of the city.
    region?: string; // Name of the region.
    state?: string; // Name of the state, e.g., Colorado.
    company?: string; // Name of the company.
    department?: string; // Name of the department.
    building?: string; // Number or name of the building.
    apartment?: string; // Number or name of the apartment.
    pOBox?: string; // Post office box number.
    phone?: string; // Phone number of the contact.
    mobile?: string; // Mobile phone number of the contact.
    email?: string; // Email address of the contact.
    fax?: string; // Fax number of the contact.
    additionalAddressInfo?: string; // Additional information for the address.
};

// // Constraints for 'key' property
// const keyConstraints = {
//     minLength: 2,
//     maxLength: 256,
//     pattern: /^[A-Za-z0-9_-]+$/,
// };
