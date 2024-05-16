import { CustomerAddress, SignUpDataForm, SignUpDataRequest } from '@/types/types';

export default function getCustomerId(scopeString: string): string | undefined {
    const match = scopeString.match(/customer_id:([a-f0-9-]+)/);
    return match ? match[1] : undefined;
}

export const transformData = (data: SignUpDataForm): SignUpDataRequest => {
    const addresses: CustomerAddress[] = [];
    let defaultShippingAddress: number | undefined;
    let defaultBillingAddress: number | undefined;

    if (data.useBillingAsShipping) {
        addresses.push(data.billingAddress);
        if (data.isDefaultBillingAddress) {
            defaultBillingAddress = 0;
        }
    } else if (data.useShippingAsBilling) {
        addresses.push(data.shippingAddress);
        if (data.isDefaultShippingAddress) {
            defaultShippingAddress = 0;
        }
    } else {
        addresses.push(data.shippingAddress, data.billingAddress);
        if (data.isDefaultShippingAddress) {
            defaultShippingAddress = 0;
        }
        if (data.isDefaultBillingAddress) {
            defaultBillingAddress = 1;
        }
    }

    return {
        email: data.email,
        password: data.password,
        lastName: data.lastName,
        firstName: data.firstName,
        dateOfBirth: data.dateOfBirth,
        addresses,
        ...(defaultShippingAddress !== undefined && { defaultShippingAddress }),
        ...(defaultBillingAddress !== undefined && { defaultBillingAddress }),
    };
};
