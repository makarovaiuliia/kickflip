import { ProductResponse } from '@/types/types';

export const mockData: ProductResponse = {
    id: 'f849a0fb-8f0a-45cc-8d96-d9e213185e1b',
    masterData: {
        current: {
            name: {
                'en-US': 'Nike Air Max 1',
            },
            description: {
                'en-US':
                    'A timeless classic since its debut in 1987, featuring visible Air Max units for cushioning and durability.',
            },
            categories: [
                {
                    typeId: 'category',
                    id: 'b6070342-a6eb-461a-9e71-e839b37c776a',
                },
            ],
            slug: {
                'en-US': 'nike-air-max',
            },
            masterVariant: {
                id: 1,
                sku: 'kf-air-max-red-9',
                key: 'variant-key-air-max-red-9',
                prices: [
                    {
                        id: 'f8f81238-3315-436e-b8b1-066fb1255c3e',
                        value: {
                            type: 'centPrecision',
                            currencyCode: 'USD',
                            centAmount: 14000,
                            fractionDigits: 2,
                        },
                        key: 'price-key-air-max-red-9',
                    },
                ],
                images: [
                    {
                        url: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/87799fb3-b02a-4b2a-a89b-530ba79db252/air-max-1-mens-shoes-2C5sX2.png',
                        dimensions: {
                            w: 1728,
                            h: 2160,
                        },
                    },
                    {
                        url: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/45393111-5915-4b67-a199-fecbca198755/air-max-1-mens-shoes-2C5sX2.png',
                        dimensions: {
                            w: 1728,
                            h: 2160,
                        },
                    },
                    {
                        url: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7c78d170-7069-436d-bdee-d9680c65ff2a/air-max-1-mens-shoes-2C5sX2.png',
                        dimensions: {
                            w: 1728,
                            h: 2160,
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
                        value: 9,
                    },
                ],
            },
            variants: [
                {
                    id: 2,
                    sku: 'kf-air-max-red-10',
                    key: 'variant-key-air-max-red-10',
                    prices: [
                        {
                            id: 'b6229f3d-c888-4c3c-b4d8-cec90adc4b65',
                            value: {
                                type: 'centPrecision',
                                currencyCode: 'USD',
                                centAmount: 14000,
                                fractionDigits: 2,
                            },
                            key: 'price-key-air-max-red-10',
                        },
                    ],
                    images: [],
                    attributes: [
                        {
                            name: 'color',
                            value: 'red',
                        },
                        {
                            name: 'size',
                            value: 10,
                        },
                    ],
                },
                {
                    id: 3,
                    sku: 'kf-air-max-red-11',
                    key: 'variant-key-air-max-red-11',
                    prices: [
                        {
                            id: '98c4f439-88ee-460b-a303-b964d30242b3',
                            value: {
                                type: 'centPrecision',
                                currencyCode: 'USD',
                                centAmount: 14000,
                                fractionDigits: 2,
                            },
                            key: 'price-key-air-max-red-11',
                        },
                    ],
                    images: [],
                    attributes: [
                        {
                            name: 'color',
                            value: 'red',
                        },
                        {
                            name: 'size',
                            value: 11,
                        },
                    ],
                },
                {
                    id: 4,
                    sku: 'kf-air-max-blue-9',
                    key: 'variant-key-air-max-blue-9',
                    prices: [
                        {
                            id: '295b8912-1ead-41c9-86c4-7e2ffa0bba5b',
                            value: {
                                type: 'centPrecision',
                                currencyCode: 'USD',
                                centAmount: 14000,
                                fractionDigits: 2,
                            },
                            key: 'price-key-air-max-blue-9',
                        },
                    ],
                    images: [
                        {
                            url: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7335efc7-663a-4deb-9168-f049dcdc400f/air-max-1-mens-shoes-2C5sX2.png',
                            dimensions: {
                                w: 1728,
                                h: 2160,
                            },
                        },
                        {
                            url: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4b275c60-5b04-4b9a-adac-30f927bd7c79/air-max-1-mens-shoes-2C5sX2.png',
                            dimensions: {
                                w: 1728,
                                h: 2160,
                            },
                        },
                        {
                            url: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/67c4d7fe-db2d-486f-b4b2-b078655863b6/air-max-1-mens-shoes-2C5sX2.png',
                            dimensions: {
                                w: 1728,
                                h: 2160,
                            },
                        },
                    ],
                    attributes: [
                        {
                            name: 'color',
                            value: 'blue',
                        },
                        {
                            name: 'size',
                            value: 9,
                        },
                    ],
                },
                {
                    id: 5,
                    sku: 'kf-air-max-blue-10',
                    key: 'variant-key-air-max-blue-10',
                    prices: [
                        {
                            id: 'e5d267e6-a044-414b-a59e-ad2ae0a7b040',
                            value: {
                                type: 'centPrecision',
                                currencyCode: 'USD',
                                centAmount: 14000,
                                fractionDigits: 2,
                            },
                            key: 'price-key-air-max-blue-10',
                        },
                    ],
                    images: [],
                    attributes: [
                        {
                            name: 'color',
                            value: 'blue',
                        },
                        {
                            name: 'size',
                            value: 10,
                        },
                    ],
                },
                {
                    id: 6,
                    sku: 'kf-air-max-blue-11',
                    key: 'variant-key-air-max-blue-11',
                    prices: [
                        {
                            id: '7fa9850d-0f07-43b9-9d30-7a140ec27481',
                            value: {
                                type: 'centPrecision',
                                currencyCode: 'USD',
                                centAmount: 14000,
                                fractionDigits: 2,
                            },
                            key: 'price-key-air-max-blue-11',
                        },
                    ],
                    images: [],
                    attributes: [
                        {
                            name: 'color',
                            value: 'blue',
                        },
                        {
                            name: 'size',
                            value: 11,
                        },
                    ],
                },
                {
                    id: 7,
                    sku: 'kf-air-max-black-9',
                    key: 'variant-key-air-max-black-9',
                    prices: [
                        {
                            id: 'a533b5d8-3d74-41c7-954a-39d5021521f4',
                            value: {
                                type: 'centPrecision',
                                currencyCode: 'USD',
                                centAmount: 14000,
                                fractionDigits: 2,
                            },
                            key: 'price-key-air-max-black-9',
                        },
                    ],
                    images: [
                        {
                            url: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c5ff2a6b-579f-4271-85ea-0cd5131691fa/air-max-1-mens-shoes-2C5sX2.png',
                            dimensions: {
                                w: 1728,
                                h: 2160,
                            },
                        },
                        {
                            url: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9349ca81-0fa2-47e8-865c-a30f6304adb3/air-max-1-mens-shoes-2C5sX2.png',
                            dimensions: {
                                w: 1728,
                                h: 2160,
                            },
                        },
                        {
                            url: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/bf81620c-6453-4833-9bdf-01dfa8a20654/air-max-1-mens-shoes-2C5sX2.png',
                            dimensions: {
                                w: 1728,
                                h: 2160,
                            },
                        },
                    ],
                    attributes: [
                        {
                            name: 'color',
                            value: 'black',
                        },
                        {
                            name: 'size',
                            value: 9,
                        },
                    ],
                },
                {
                    id: 8,
                    sku: 'kf-air-max-black-10',
                    key: 'variant-key-air-max-black-10',
                    prices: [
                        {
                            id: 'a47970df-bef0-4b06-8374-616c3311bef7',
                            value: {
                                type: 'centPrecision',
                                currencyCode: 'USD',
                                centAmount: 14000,
                                fractionDigits: 2,
                            },
                            key: 'price-key-air-max-black-10',
                        },
                    ],
                    images: [],
                    attributes: [
                        {
                            name: 'color',
                            value: 'black',
                        },
                        {
                            name: 'size',
                            value: 10,
                        },
                    ],
                },
                {
                    id: 9,
                    sku: 'kf-air-max-black-11',
                    key: 'variant-key-air-max-black-11',
                    prices: [
                        {
                            id: 'ced54d60-cfee-4db3-a686-35432e1be081',
                            value: {
                                type: 'centPrecision',
                                currencyCode: 'USD',
                                centAmount: 14000,
                                fractionDigits: 2,
                            },
                            key: 'price-key-air-max-black-11',
                        },
                    ],
                    images: [],
                    attributes: [
                        {
                            name: 'color',
                            value: 'black',
                        },
                        {
                            name: 'size',
                            value: 11,
                        },
                    ],
                },
            ],
        },
    },
    key: 'air-max',
};

export default mockData;
