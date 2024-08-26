/* eslint-disable import/no-absolute-path */
import youtube from '/youtube.svg';
import insta from '/insta.svg';
import tiktok from '/tiktok.svg';
/* eslint-enable import/no-absolute-path */

type TSocialData = {
    link: string;
    image: string;
    title: string;
};
const socialsData: TSocialData[] = [
    {
        image: youtube,
        title: 'YouTube',
        link: 'https://www.youtube.com/',
    },
    {
        image: insta,
        title: 'Instagram',
        link: 'https://www.instagram.com/',
    },
    {
        image: tiktok,
        title: 'Tiktok',
        link: 'https://www.tiktok.com/',
    },
];

export default socialsData;
