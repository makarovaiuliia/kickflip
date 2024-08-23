import { ImgProps } from '@/types/componentsInterfaces';

export default function SideImages({ imagesSrc, activeIndex, setIndex }: ImgProps) {
    return (
        <div className="side-wrapper">
            {imagesSrc.map((img, index) => (
                <button
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    style={{
                        backgroundImage: `url(${img})`,
                    }}
                    onClick={() => {
                        setIndex(index);
                    }}
                    className={`side-img ${activeIndex === index ? 'active' : ''}`}
                    type="button"
                    aria-label={`Variant image ${index + 1}`}
                >
                    <div className="overlay" />
                </button>
            ))}
        </div>
    );
}
