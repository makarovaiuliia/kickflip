import CardList from '@/components/cardList/cardList';
import './productsPage.css';
import { useSelector } from '@/services/store';
import { getAllSneakers } from '@/services/sneakersSlice';

export default function ProductsPage(): JSX.Element {
    const allSneakers = useSelector(getAllSneakers);

    return (
        <div className="main-wrapper cart-wrapper">
            <CardList products={allSneakers!} />
        </div>
    );
}
