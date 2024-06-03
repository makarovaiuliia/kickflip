import { Link, useParams } from 'react-router-dom';
import './categorySection.css';
import { Category } from '@/utils/utils';

export interface CategorySectionProps {
    category: Category;
}

function CategorySection({ category }: CategorySectionProps): JSX.Element {
    const { section } = useParams<{ section: string }>();
    return (
        <Link to={`../${section}/${category.url}`} className="category_link">
            <img src={category.imageUrl} className="category_image" alt={`category: ${category.sectionName}`} />
            <p className="category_title">{category.sectionName}</p>
        </Link>
    );
}

export default CategorySection;
