import { ICategoryMainData } from './categoryMain';

/* eslint-disable import/no-absolute-path */
import outlet from '/airJordan.webp';
import kids from '/flexRunner.webp';
import women from '/pegasus.webp';
import men from '/genome.webp';
/* eslint-enable import/no-absolute-path */

const data: ICategoryMainData[] = [
    {
        image: men,
        link: '/catalog/products/men',
        title: 'Men',
    },
    {
        image: women,
        link: '/catalog/products/women',
        title: 'Women',
    },
    {
        image: kids,
        link: '/catalog/products/kids',
        title: 'Kids',
    },
    {
        image: outlet,
        link: '/catalog/products/outlet',
        title: 'Outlet',
    },
];

export default data;
