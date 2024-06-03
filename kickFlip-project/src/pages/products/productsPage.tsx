import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import CardList from '@/components/cardList/cardList';
import './productsPage.css';
import { useSelector, useDispatch } from '@/services/store';
import { getAllCategories, getAllSneakers, getFilteredProducts } from '@/services/sneakersSlice';
import CategorySection from '@/components/categorySection/categorySection';
import BreadCrumbs, { CrumbType } from '@/components/breadCrumbs/breadCrumbs';
import FilterComponent from '@/components/filterComponent/filterComponent';
import filterData from '@/components/filterComponent/filterComponentData';
import { ProductProjected, TransformParams } from '@/types/types';
import ModalWindow from '@/components/modalWindow/modalWindow';

export default function ProductsPage(): JSX.Element {
    const dispatch = useDispatch();

    const [products, setProducts] = useState<ProductProjected[]>([]);
    const [categories, setCategories] = useState<TransformParams>({
        filter: { color: [], size: [], price: [] },
        sort: '',
        search: '',
    });
    const [filterIsActive, setFilterIsActive] = useState<boolean>(true);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 900);

    const allSneakers = useSelector(getAllSneakers);
    const productCategories = useSelector(getAllCategories);
    const { category } = useParams<{ category: string }>();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 900);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (window.innerWidth < 900) {
            setFilterIsActive(false);
        }
    }, []);

    useEffect(() => {
        if (!productCategories || !category) {
            setProducts(allSneakers);
            return;
        }

        const categoryId = productCategories[category.toUpperCase()]?.id;
        if (categoryId) {
            const filteredProducts = allSneakers.filter((product) =>
                product.categories.some((cat) => cat.id === categoryId)
            );
            setProducts(filteredProducts);
        } else {
            setProducts(allSneakers);
        }
    }, [category, allSneakers, productCategories]);

    useEffect(() => {
        dispatch(getFilteredProducts(categories));
    }, [categories, dispatch]);

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
                {Object.keys(productCategories).map((categoryKey) => (
                    <CategorySection
                        key={productCategories[categoryKey].id}
                        category={productCategories[categoryKey]}
                    />
                ))}
            </div>
            {category && <BreadCrumbs crumbs={breadCrumbs} />}
            <div className={filterIsActive ? 'products' : 'products filterIsHidden'}>
                {isMobile && filterIsActive && (
                    <ModalWindow
                        content={
                            <FilterComponent
                                options={filterData}
                                setCategories={setCategories}
                                categories={categories}
                            />
                        }
                        open={filterIsActive}
                        closeModal={() => setFilterIsActive(false)}
                    />
                )}
                {!isMobile && filterIsActive && (
                    <FilterComponent options={filterData} setCategories={setCategories} categories={categories} />
                )}
                <CardList
                    products={products}
                    setCategories={setCategories}
                    categories={categories}
                    setFilterIsActive={setFilterIsActive}
                />
            </div>
        </div>
    );
}
