import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import CardList from '@/components/cardList/cardList';
import './infiniteScrollList.css';
import { useDispatch, useSelector } from '@/services/store';
import { getAllSneakers, getFilteredProducts, removeAllSneakers } from '@/services/sneakersSlice';
import { TransformParams } from '@/types/types';

interface InfiniteScrollListProps {
    setCategories: React.Dispatch<React.SetStateAction<TransformParams>>;
    setFilterIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    categories: TransformParams;
    isMobile: boolean;
}

export default function InfiniteScrollList({
    setCategories,
    categories,
    isMobile,
    setFilterIsActive,
}: InfiniteScrollListProps): JSX.Element {
    const dispatch = useDispatch();
    const products = useSelector(getAllSneakers);

    const [hasMore, setHasMore] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        dispatch(removeAllSneakers());
        dispatch(getFilteredProducts({ options: categories, page: 0 }))
            .unwrap()
            .then(() => {
                setHasMore(true);
                setPage(1);
            });
    }, [categories, dispatch]);

    const fetchMoreData = () => {
        dispatch(getFilteredProducts({ options: categories, page: page * 6 }))
            .unwrap()
            .then((response) => {
                const sneakers = response.results;
                if (sneakers.length === 0) {
                    setHasMore(false);
                } else {
                    setPage((prevPage) => prevPage + 1);
                }
            })
            .catch(() => {
                setHasMore(false);
            });
    };

    return (
        <InfiniteScroll
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4 className="loading">Loading...</h4>}
            dataLength={products.length}
        >
            <CardList
                products={products}
                setCategories={setCategories}
                categories={categories}
                setFilterIsActive={setFilterIsActive}
                isMobile={isMobile}
            />
        </InfiniteScroll>
    );
}
