import { VariantImagesProps } from '@/types/componentsInterfaces';

export default function VariantsImages({ images, index, setImage, setImages, currentImages }: VariantImagesProps) {
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
                        setImage(imgs[index]);
                        setImages(imgs);
                    }}
                    className={`variant-img ${currentImages[0] === imgs[0] ? 'active' : ''}`}
                    type="button"
                    aria-label={`Variant ${index + 1} main image `}
                />
            ))}
        </div>
    );
}
