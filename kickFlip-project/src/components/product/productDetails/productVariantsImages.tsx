import { VariantImagesProps } from '@/types/componentsInterfaces';

export default function VariantsImages({
    images,
    setImages,
    currentImages,
    handleActiveColorImage,
}: VariantImagesProps) {
    return (
        <div className="variants">
            {Object.values(images).map((imgs, i) => (
                <button
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    style={{
                        backgroundImage: `url(${imgs[0]})`,
                    }}
                    onClick={() => {
                        setImages(imgs);
                        handleActiveColorImage(i);
                    }}
                    className={`variant-img ${currentImages[0] === imgs[0] ? 'active' : ''}`}
                    type="button"
                    aria-label={`Variant ${i + 1} main image `}
                />
            ))}
        </div>
    );
}
