import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './productsPage.css';
import { useSelector, useDispatch } from '@/services/store';
import { getAllCategories, getAllSneakers, getFilteredProducts } from '@/services/sneakersSlice';
import CategorySection from '@/components/categorySection/categorySection';
import BreadCrumbs, { CrumbType } from '@/components/breadCrumbs/breadCrumbs';
import FilterComponent from '@/components/filterComponent/filterComponent';
import filterData from '@/components/filterComponent/filterComponentData';
import { TransformParams } from '@/types/types';
import ModalWindow from '@/components/modalWindow/modalWindow';
import initialTransformParams from '@/data/initialTransformParams';
import CardList from '@/components/cardList/cardList';

export default function ProductsPage(): JSX.Element {
    const products = useSelector(getAllSneakers);

    const dispatch = useDispatch();
    const { section, category } = useParams<{ category: string; section: string }>();
    const transformParams: TransformParams =
        section === 'outlet'
            ? {
                  filter: { color: [], size: [], price: [], discount: [''] },
                  sort: '',
                  search: '',
                  category: '',
              }
            : initialTransformParams;

    const [categories, setCategories] = useState<TransformParams>(transformParams);
    const [filterIsActive, setFilterIsActive] = useState<boolean>(true);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 900);

    const productCategories = useSelector(getAllCategories);

    useEffect(() => {
        setCategories((prevCategories) => {
            const newFilter = { ...prevCategories.filter };
            newFilter.discount = section === 'outlet' ? [''] : [];
            return { ...prevCategories, filter: newFilter };
        });
    }, [section]);

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
        if (!category) {
            setCategories((prevCategories) => {
                return { ...prevCategories, category: '' };
            });
            return;
        }

        const categoryId = productCategories[category.toUpperCase()]?.id;
        if (categoryId) {
            setCategories((prevCategories) => {
                return { ...prevCategories, category: categoryId };
            });
        }
    }, [category, productCategories]);

    useEffect(() => {
        dispatch(getFilteredProducts({ options: categories, page: 0 }));
    }, [categories, dispatch]);

    const breadCrumbs: CrumbType[] = category
        ? [
              {
                  label: 'Main',
                  url: '/',
              },
              {
                  label: section!,
                  url: `/${section}`,
              },
              {
                  label: category!,
                  url: '',
              },
          ]
        : [
              {
                  label: 'Main',
                  url: '/',
              },
              {
                  label: section!,
                  url: '',
              },
          ];

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
            <BreadCrumbs crumbs={breadCrumbs} />
            <div className={filterIsActive ? 'products' : 'products filterIsHidden'}>
                {isMobile && filterIsActive && (
                    <ModalWindow
                        content={
                            <FilterComponent
                                options={filterData}
                                setCategories={setCategories}
                                categories={categories}
                                isMobile={isMobile}
                            />
                        }
                        open={filterIsActive}
                        closeModal={() => setFilterIsActive(false)}
                    />
                )}
                {!isMobile && filterIsActive && (
                    <FilterComponent
                        options={filterData}
                        setCategories={setCategories}
                        categories={categories}
                        isMobile={isMobile}
                    />
                )}
                <CardList
                    categories={categories}
                    setCategories={setCategories}
                    isMobile={isMobile}
                    setFilterIsActive={setFilterIsActive}
                    products={products}
                />
                {/* <InfiniteScrollList
                    categories={categories}
                    setCategories={setCategories}
                    isMobile={isMobile}
                    setFilterIsActive={setFilterIsActive}
                /> */}
            </div>
        </div>
    );
}
