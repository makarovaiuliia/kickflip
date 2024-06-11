import { CartResponse } from '@/types/types';

const mockCart: CartResponse = {
    id: 'cart-id-123',
    version: 1,
    key: 'cart-key-123',
    version: 1,
    customerId: 'customer-id-456',
    anonymousId: 'anonymous-id-789',
    lineItems: [
        {
            id: 'line-item-id-1',
            key: 'line-item-key-1',
            productId: 'product-id-1',
            productKey: 'product-key-1',
            name: {
                'en-US': 'Product Name 1',
            },
            variant: {
                id: 1,
                sku: 'sku-1',
                key: 'variant-key-1',
                prices: [
                    {
                        id: 'price-id-1',
                        value: {
                            type: 'centPrecision',
                            currencyCode: 'USD',
                            centAmount: 1000,
                            fractionDigits: 2,
                        },
                        key: 'price-key-1',
                        discounted: {
                            value: {
                                type: 'centPrecision',
                                currencyCode: 'USD',
                                centAmount: 900,
                                fractionDigits: 2,
                            },
                        },
                    },
                ],
                images: [
                    {
                        url: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4187a54a-21f0-46a6-a7ea-fdc2bbcfbbca/air-max-sc-womens-shoes-CwMCK7.png',
                        dimensions: {
                            w: 640,
                            h: 480,
                        },
                    },
                ],
                attributes: [
                    {
                        name: 'color',
                        value: 'red',
                    },
                    {
                        name: 'size',
                        value: 'M',
                    },
                    {
                        name: 'shortDescription',
                        value: "Women's lifestyle shoes",
                    },
                ],
            },
            price: {
                id: 'price-id-1',
                value: {
                    type: 'centPrecision',
                    currencyCode: 'USD',
                    centAmount: 1000,
                    fractionDigits: 2,
                },
                key: 'price-key-1',
                discounted: {
                    value: {
                        type: 'centPrecision',
                        currencyCode: 'USD',
                        centAmount: 900,
                        fractionDigits: 2,
                    },
                },
            },
            quantity: 2,
            totalPrice: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: 2000,
                fractionDigits: 2,
            },
        },
        {
            id: 'line-item-id-2',
            key: 'line-item-key-2',
            productId: 'product-id-2',
            productKey: 'product-key-2',
            name: {
                'en-US': 'Product Name 2',
            },
            variant: {
                id: 2,
                sku: 'sku-2',
                key: 'variant-key-2',
                prices: [
                    {
                        id: 'price-id-2',
                        value: {
                            type: 'centPrecision',
                            currencyCode: 'USD',
                            centAmount: 1500,
                            fractionDigits: 2,
                        },
                        key: 'price-key-2',
                        discounted: {
                            value: {
                                type: 'centPrecision',
                                currencyCode: 'USD',
                                centAmount: 1400,
                                fractionDigits: 2,
                            },
                        },
                    },
                ],
                images: [
                    {
                        url: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4187a54a-21f0-46a6-a7ea-fdc2bbcfbbca/air-max-sc-womens-shoes-CwMCK7.png',
                        dimensions: {
                            w: 640,
                            h: 480,
                        },
                    },
                ],
                attributes: [
                    {
                        name: 'material',
                        value: 'cotton',
                    },
                    {
                        name: 'pattern',
                        value: 'striped',
                    },
                    {
                        name: 'shortDescription',
                        value: "Women's lifestyle shoes",
                    },
                ],
            },
            price: {
                id: 'price-id-2',
                value: {
                    type: 'centPrecision',
                    currencyCode: 'USD',
                    centAmount: 1500,
                    fractionDigits: 2,
                },
                key: 'price-key-2',
                discounted: {
                    value: {
                        type: 'centPrecision',
                        currencyCode: 'USD',
                        centAmount: 1400,
                        fractionDigits: 2,
                    },
                },
            },
            quantity: 1,
            totalPrice: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: 1500,
                fractionDigits: 2,
            },
        },
        {
            id: 'line-item-id-1',
            key: 'line-item-key-1',
            productId: 'product-id-1',
            productKey: 'product-key-1',
            name: {
                'en-US': 'Product Name 2',
            },
            variant: {
                id: 1,
                sku: 'sku-1',
                key: 'variant-key-1',
                prices: [
                    {
                        id: 'price-id-1',
                        value: {
                            type: 'centPrecision',
                            currencyCode: 'USD',
                            centAmount: 1000,
                            fractionDigits: 2,
                        },
                        key: 'price-key-1',
                        discounted: {
                            value: {
                                type: 'centPrecision',
                                currencyCode: 'USD',
                                centAmount: 900,
                                fractionDigits: 2,
                            },
                        },
                    },
                ],
                images: [
                    {
                        url: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4187a54a-21f0-46a6-a7ea-fdc2bbcfbbca/air-max-sc-womens-shoes-CwMCK7.png',
                        dimensions: {
                            w: 640,
                            h: 480,
                        },
                    },
                ],
                attributes: [
                    {
                        name: 'color',
                        value: 'red',
                    },
                    {
                        name: 'size',
                        value: 'M',
                    },
                ],
            },
            price: {
                id: 'price-id-1',
                value: {
                    type: 'centPrecision',
                    currencyCode: 'USD',
                    centAmount: 1000,
                    fractionDigits: 2,
                },
                key: 'price-key-1',
                discounted: {
                    value: {
                        type: 'centPrecision',
                        currencyCode: 'USD',
                        centAmount: 900,
                        fractionDigits: 2,
                    },
                },
            },
            quantity: 2,
            totalPrice: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: 2000,
                fractionDigits: 2,
            },
        },
        {
            id: 'line-item-id-2',
            key: 'line-item-key-2',
            productId: 'product-id-2',
            productKey: 'product-key-2',
            name: {
                'en-US': 'Product Name 3',
            },
            variant: {
                id: 2,
                sku: 'sku-2',
                key: 'variant-key-2',
                prices: [
                    {
                        id: 'price-id-2',
                        value: {
                            type: 'centPrecision',
                            currencyCode: 'USD',
                            centAmount: 1500,
                            fractionDigits: 2,
                        },
                        key: 'price-key-2',
                        discounted: {
                            value: {
                                type: 'centPrecision',
                                currencyCode: 'USD',
                                centAmount: 1400,
                                fractionDigits: 2,
                            },
                        },
                    },
                ],
                images: [
                    {
                        url: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4187a54a-21f0-46a6-a7ea-fdc2bbcfbbca/air-max-sc-womens-shoes-CwMCK7.png',
                        dimensions: {
                            w: 640,
                            h: 480,
                        },
                    },
                ],
                attributes: [
                    {
                        name: 'material',
                        value: 'cotton',
                    },
                    {
                        name: 'pattern',
                        value: 'striped',
                    },
                ],
            },
            price: {
                id: 'price-id-2',
                value: {
                    type: 'centPrecision',
                    currencyCode: 'USD',
                    centAmount: 1500,
                    fractionDigits: 2,
                },
                key: 'price-key-2',
                discounted: {
                    value: {
                        type: 'centPrecision',
                        currencyCode: 'USD',
                        centAmount: 1400,
                        fractionDigits: 2,
                    },
                },
            },
            quantity: 1,
            totalPrice: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: 1500,
                fractionDigits: 2,
            },
        },
    ],
    totalLineItemQuantity: 3,
    totalPrice: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 3500,
        fractionDigits: 2,
    },
    cartState: 'Active',
    discountCodes: [
        {
            discountCode: {
                id: 'discount-code-id-1',
                typeId: 'discount-code',
            },
            state: 'Applied',
        },
    ],
};

export default mockCart;
