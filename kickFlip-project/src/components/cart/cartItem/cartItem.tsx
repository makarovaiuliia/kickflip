import { useState } from 'react';
import { CartResponse, ChangeLineItemQuantity, DefaultCartItem, LineItem } from '@/types/types';
import './cartItem.css';
import { getFormatPrice, responsesErrorsHandler } from '@/utils/utils';
import ProductPrices from '@/components/product/productDetails/productPrice';
import QuantityCounter from '@/components/quantityCounter/quantittyCounter';
import { updateCartQuantitty } from '@/utils/kickflip-api';

interface CartItemProps {
    itemData: LineItem;
    cartVersion: number;
    setCartData: React.Dispatch<React.SetStateAction<CartResponse | null>>;
}

export default function CartItem({ itemData, setCartData, cartVersion }: CartItemProps) {
    const [cartError, setCartError] = useState('');
    const itemVariant = itemData.variant;
    const itemDescription = itemVariant.attributes.find((attr) => attr.name === 'shortDescription');
    const cartId = 1;

    const handleQuantityChange = async (newQuantity: number) => {
        const changedData: ChangeLineItemQuantity = {
            version: cartVersion,
            actions: [
                {
                    action: 'changeLineItemQuantity',
                    lineItemId: itemData.id,
                    quantity: newQuantity,
                },
            ],
        };
        try {
            const newCart = await updateCartQuantitty(`${cartId}`, changedData);
            setCartData(newCart);
        } catch (error) {
            if (error) {
                responsesErrorsHandler(error, setCartError);
                setTimeout(() => setCartError(''), 2000);
            }
        }
    };

    return (
        <div className="cart-item">
            {cartError && <div className="cart-error">{cartError}</div>}
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
                    <div className="item-quantity">
                        Qty
                        <QuantityCounter initialQuantity={itemData.quantity} onQuantityChange={handleQuantityChange} />
                    </div>
                    <span className="item-total">Total: $ {getFormatPrice(itemData.totalPrice)}</span>
                </div>
            </div>
        </div>
    );
}
