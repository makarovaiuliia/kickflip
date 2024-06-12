import { SyntheticEvent } from 'react';
import { ProductProjected } from '@/types/types';
import { getAdditionalSize, getProductsSizes } from '@/utils/utils';

interface AddToCartFormProps {
    productInfo: ProductProjected;
    handleAddToCart: (event: SyntheticEvent) => void;
    alreadyInShoppingCart: boolean;
}

function AddToCartForm({ productInfo, handleAddToCart, alreadyInShoppingCart }: AddToCartFormProps): JSX.Element {
    const sizes = Array.from(getProductsSizes(productInfo.masterVariant, productInfo.variants));

    return (
        <form onSubmit={handleAddToCart} className="card_cart-form">
            <select id="size" className="card_size-select" required disabled={alreadyInShoppingCart}>
                <option value="">Size</option>
                {getAdditionalSize(sizes).map((size, index) => (
                    <option key={size} value={size} disabled={index > sizes.length - 1}>
                        {size}
                    </option>
                ))}
            </select>
            <button type="submit" className="card_button" disabled={alreadyInShoppingCart}>
                {alreadyInShoppingCart ? 'Already in the Cart' : 'Add to Cart'}
            </button>
        </form>
    );
}

export default AddToCartForm;
