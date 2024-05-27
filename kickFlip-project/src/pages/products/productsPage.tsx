import { useParams } from 'react-router-dom';
import CardList from '@/components/cardList/cardList';
import './productsPage.css';
import { useSelector } from '@/services/store';
import { getAllCategories, getAllSneakers } from '@/services/sneakersSlice';
import CategorySection from '@/components/categorySection/categorySection';
import BreadCrumbs, { CrumbType } from '@/components/breadCrumbs/breadCrumbs';

export default function ProductsPage(): JSX.Element {
    const allSneakers = useSelector(getAllSneakers);
    const categories = useSelector(getAllCategories);

    const { category } = useParams();
    const products = category
        ? allSneakers.filter(
              (product) => product.masterData.current.categories[0].id === categories[category.toUpperCase()].id
          )
        : allSneakers;

    const breadCrumbs: CrumbType[] = category
        ? [
              {
                  label: 'Sneakers',
                  url: '../products',
              },
              {
                  label: category,
                  url: '',
              },
          ]
        : [];

    return (
        <div className="main-wrapper products-wrapper">
            <div className="categories">
                {Object.keys(categories).map((categoryKey) => (
                    <CategorySection key={categories[categoryKey].id} category={categories[categoryKey]} />
                ))}
            </div>
            {category && <BreadCrumbs crumbs={breadCrumbs} />}
            <div className="products">
                <div />
                <CardList products={products} />
            </div>
        </div>
    );
}
