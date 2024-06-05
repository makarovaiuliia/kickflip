import { ProductProjected, TransformParams } from '@/types/types';
import Card from '../card/card';
import './cardList.css';
import SearchForm from '../searchForm/searchForm';
import { getTotal } from '@/services/sneakersSlice';
import { useSelector } from '@/services/store';

interface CardListProps {
    products: ProductProjected[];
    setCategories: React.Dispatch<React.SetStateAction<TransformParams>>;
    setFilterIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    categories: TransformParams;
    isMobile: boolean;
}

function CardList({ products, setCategories, categories, setFilterIsActive, isMobile }: CardListProps): JSX.Element {
    const total = useSelector(getTotal);

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategories((prevCategories) => {
            return { ...prevCategories, sort: event.target.value };
        });
    };

    return (
        <div className="card-list-container">
            <div className="card-list-info-container">
                <h2 className="card-list-title">{`The best kicks (${total})`}</h2>
                <div className="card-list-options-container">
                    {isMobile && <SearchForm setCategories={setCategories} />}
                    <button
                        type="button"
                        onClick={() => setFilterIsActive((prevState) => !prevState)}
                        className={isMobile ? 'card-list-hide-filter-mobile' : 'card-list-hide-filter'}
                        aria-label="show/hide filters"
                    >
                        {isMobile && 'Show/hide Filters'}
                    </button>
                    <select id="sort-select" className="card-list-sorting" onChange={handleSelect}>
                        <option value="">Sort by</option>
                        <option value="price asc">Price (Low-High)</option>
                        <option value="price desc">Price (High-Low)</option>
                        <option value="name.en-US desc">Name ⭡</option>
                        <option value="name.en-US asc">Name ⭣</option>
                    </select>
                </div>
            </div>
            {products.length === 0 ? (
                <p className="card-list-title">No kicks match these filters. Try modifying your search</p>
            ) : (
                <div className="card-list">
                    {products.map((product) => (
                        <Card productInfo={product} key={product.id} selectedColors={categories.filter.color} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CardList;
