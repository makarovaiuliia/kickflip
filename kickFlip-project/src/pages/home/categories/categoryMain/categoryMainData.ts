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
        link: '/products/men',
        title: 'Men',
    },
    {
        image: women,
        link: '/products/women',
        title: 'Women',
    },
    {
        image: kids,
        link: '/products/kids',
        title: 'Kids',
    },
    {
        image: outlet,
        link: '/products/outlet',
        title: 'Outlet',
    },
];

export default data;
