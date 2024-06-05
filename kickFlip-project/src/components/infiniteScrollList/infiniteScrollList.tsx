import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import CardList from '@/components/cardList/cardList';
import './infiniteScrollList.css';
import { useDispatch } from '@/services/store';
import { getFilteredProducts } from '@/services/sneakersSlice';
import { ProductProjected, TransformParams } from '@/types/types';

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
    const [items, setItems] = useState<ProductProjected[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFilteredProducts({ options: categories, page: 0 }))
            .unwrap()
            .then((response) => {
                setItems(response.results);
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
                    setItems((prevItems) => [...prevItems, ...sneakers]);
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
            loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
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
