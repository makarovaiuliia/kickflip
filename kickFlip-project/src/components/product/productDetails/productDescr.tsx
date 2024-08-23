import { ProductDescriptionProps } from '@/types/componentsInterfaces';

export default function ProductDescription({ description }: ProductDescriptionProps) {
    return <p className="product-descr-text">{description}</p>;
}
