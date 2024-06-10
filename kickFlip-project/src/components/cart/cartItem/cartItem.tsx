import { LineItem } from '@/types/types';
import './cartItem.css';
import { getFormatPrice } from '@/utils/utils';
import ProductPrices from '@/components/product/productDetails/productPrice';

interface CartItemProps {
    itemData: LineItem;
}

export default function CartItem({ itemData }: CartItemProps) {
    const itemVariant = itemData.variant;

    return (
        <div className="cart-item">
            <img src={itemVariant.images[0].url} alt={itemData.name} className="cart-item-img" />
            <div className="item-data">
                <div className="item-info">
                    <h3 className="item-name">{itemData.name}</h3>
                    <div className="item-description">
                        {itemVariant.attributes.map((attr) => (
                            <p className="item-attribute" key={attr.name}>
                                {attr.name}: {attr.value}
                            </p>
                        ))}
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
