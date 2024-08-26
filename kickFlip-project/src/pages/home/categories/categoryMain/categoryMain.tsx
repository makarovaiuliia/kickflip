import { Link } from 'react-router-dom';

export interface ICategoryMainData {
    image: string;
    title: string;
    link: string;
}

interface CategoryMainProps {
    categoryData: ICategoryMainData;
}

export default function CategoryMain({ categoryData }: CategoryMainProps): JSX.Element {
    const { link, image, title } = categoryData;
    return (
        <li className="category-main_list-item">
            <img src={image} alt="men kick" className="category-main_image" />
            <Link to={link}>
                <h4 className="category-main_list-item-title">{title}</h4>
            </Link>
        </li>
    );
}
