import { DefaultCartItem, LineItem } from '@/types/types';
import './cartItem.css';
import { getFormatPrice } from '@/utils/utils';
import ProductPrices from '@/components/product/productDetails/productPrice';

interface CartItemProps {
    itemData: LineItem;
}

export default function CartItem({ itemData }: CartItemProps) {
    const itemVariant = itemData.variant;
    const itemDescription = itemVariant.attributes.find((attr) => attr.name === 'shortDescription');

    return (
        <div className="cart-item">
            <div className="cart-item-img-wrapper">
                <img src={itemVariant.images[0].url} alt={itemData.name} className="cart-item-img" />
            </div>
            <div className="item-data">
                <div className="item-info">
                    <h3 className="item-name">{itemData.name}</h3>
                    <div className="item-description">
                        {itemDescription ? itemDescription.value : DefaultCartItem.ItemDescription}
                    </div>
                    <span className="item-price">
                        <ProductPrices priceData={itemVariant.prices[0]} />
                    </span>
                </div>

                <div className="item-total-cost">
                    <span className="item-quantity">Quantity {itemData.quantity}</span>
                    <span className="item-total">Total: $ {getFormatPrice(itemData.totalPrice)}</span>
                </div>
            </div>
        </div>
    );
}
