export interface LinkData {
    title: string;
    link: string;
}

export const catalog: LinkData[] = [
    { title: 'Mens', link: '/products/men' },
    { title: 'Women', link: '/products/women' },
    { title: 'Kids', link: '/products/kids' },
];

export const discount: LinkData[] = [
    { title: 'Outlet', link: '/outlet' },
    { title: 'Outlet Men', link: '/outlet/men' },
    { title: 'Outlet Women', link: '/outlet/women' },
    { title: 'Outlet Kids', link: '/outlet/kids' },
];

export const company: LinkData[] = [
    { title: 'About Us', link: '/about-us' },
    { title: 'About Shop', link: '/about-company' },
];
