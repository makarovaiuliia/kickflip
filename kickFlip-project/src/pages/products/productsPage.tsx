import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import CardList from '@/components/cardList/cardList';
import './productsPage.css';
import { useSelector } from '@/services/store';
import { getAllCategories, getAllSneakers } from '@/services/sneakersSlice';
import CategorySection from '@/components/categorySection/categorySection';
import BreadCrumbs, { CrumbType } from '@/components/breadCrumbs/breadCrumbs';
import FilterComponent from '@/components/filterComponent/filterComponent';
import filterData from '@/components/filterComponent/filterComponentData';
import { ProductProjected } from '@/types/types';

export default function ProductsPage(): JSX.Element {
    const [products, setProducts] = useState<ProductProjected[]>([]);
    const allSneakers = useSelector(getAllSneakers);
    const categories = useSelector(getAllCategories);
    const { category } = useParams<{ category: string }>();

    useEffect(() => {
        if (!categories || !category) {
            setProducts(allSneakers);
            return;
        }

        const categoryId = categories[category.toUpperCase()]?.id;
        if (categoryId) {
            const filteredProducts = allSneakers.filter((product) =>
                product.categories.some((cat) => cat.id === categoryId)
            );
            setProducts(filteredProducts);
        } else {
            setProducts(allSneakers);
        }
    }, [category, allSneakers, categories]);

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
                <FilterComponent filterOptions={filterData} />
                <CardList products={products} />
            </div>
        </div>
    );
}
