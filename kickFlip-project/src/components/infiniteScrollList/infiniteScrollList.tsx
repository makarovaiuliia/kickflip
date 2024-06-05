import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import CardList from '@/components/cardList/cardList';
import './infiniteScrollList.css';
import { useDispatch, useSelector } from '@/services/store';
import { getAllSneakers, getFilteredProducts } from '@/services/sneakersSlice';
import { ProductProjected, TransformParams } from '@/types/types';
import Loader from '../loader/loader';

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
    const allSneakers = useSelector(getAllSneakers);

    const [items, setItems] = useState<ProductProjected[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFilteredProducts({ options: categories, page: 0 }))
            .unwrap()
            .then((response) => {
                setItems(response.results);
            });
    }, [categories, dispatch]);

    const fetchMoreData = () => {
        dispatch(getFilteredProducts({ options: categories, page }))
            .unwrap()
            .then((response) => {
                const sneakers = response.results;
                if (sneakers.length === 0) {
                    setHasMore(false);
                } else {
                    setPage((prevPage) => prevPage + 1);
                    setItems((prevItems) => [...prevItems, ...sneakers]);
                }
            })
            .catch(() => {
                setHasMore(false);
            });
    };

    if (!allSneakers) {
        return <Loader />;
    }

    return (
        <InfiniteScroll
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>You have seen all we have!</b>
                </p>
            }
            dataLength={items.length}
        >
            <CardList
                products={items}
                setCategories={setCategories}
                categories={categories}
                setFilterIsActive={setFilterIsActive}
                isMobile={isMobile}
            />
        </InfiniteScroll>
    );
}
