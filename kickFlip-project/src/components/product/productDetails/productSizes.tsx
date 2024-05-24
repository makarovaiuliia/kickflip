import { ProductSizesProps } from '@/types/componentsInterfaces';
import { getAdditionalSize } from '@/utils/utils';

export default function ProductSizes({ sizes }: ProductSizesProps) {
    return (
        <div className="product-sizes">
            <h1 className="choose-title">Choose your size</h1>
            <div className="size-container">
                {getAdditionalSize(sizes).map((size, index) => (
                    <button
                        key={size}
                        className={`size-btn ${index > sizes.length - 1 ? 'unavailable' : ''}`}
                        type="button"
                    >
                        {`US ${size}`}
                    </button>
                ))}
            </div>
        </div>
    );
}
