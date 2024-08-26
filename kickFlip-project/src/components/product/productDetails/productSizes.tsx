import { ProductSizesProps } from '@/types/componentsInterfaces';
import { getAdditionalSize } from '@/utils/utils';

export default function ProductSizes({ sizes, handleActiveSize, activeSize }: ProductSizesProps) {
    return (
        <div className="product-sizes">
            <h1 className="choose-title">Choose your size</h1>
            <div className="size-container">
                {getAdditionalSize(sizes).map((size, index) => (
                    <button
                        key={size}
                        className={`size-btn ${index > sizes.length - 1 ? 'unavailable' : ''} ${activeSize === size ? 'active' : ''}`}
                        type="button"
                        onClick={() => handleActiveSize(size)}
                    >
                        {`US ${size}`}
                    </button>
                ))}
            </div>
        </div>
    );
}
