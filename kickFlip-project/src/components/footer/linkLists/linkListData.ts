export interface LinkData {
    title: string;
    link: string;
}

export const catalog: LinkData[] = [
    { title: 'Mens', link: '/catalog/products/men' },
    { title: 'Women', link: '/catalog/products/women' },
    { title: 'Kids', link: '/catalog/products/kids' },
];

export const discount: LinkData[] = [
    { title: 'Outlet', link: '/catalog/outlet' },
    { title: 'Outlet Men', link: '/catalog/outlet/men' },
    { title: 'Outlet Women', link: '/catalog/outlet/women' },
    { title: 'Outlet Kids', link: '/catalog/outlet/kids' },
];

export const company: LinkData[] = [{ title: 'About Us', link: '/about-us' }];
