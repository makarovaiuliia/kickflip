import { TransformParams } from '@/types/types';

export default [
    {
        title: 'color',
        filterParam: 'variants.attributes.color',
        options: ['Red', 'Pink', 'White', 'Blue', 'Black', 'Brown', 'Green', 'Grey', 'Yellow', 'Violet'],
    },
    {
        title: 'size',
        filterParam: 'variants.attributes.color',
        options: ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    },
    {
        title: 'price',
        filterParam: 'variants.price.centAmount:range',
        options: ['0-50', '50-70', '70-90', '90+'],
    },
];

export const filterData: TransformParams = {
    filter: {
        color: ['Red', 'Pink', 'White', 'Blue', 'Black', 'Brown', 'Green', 'Grey', 'Yellow', 'Violet'],
        size: ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
        price: ['0-50', '50-70', '70-90', '90-200'],
    },
    sort: '',
};
