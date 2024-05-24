interface SideImgProps {
    sideImagesSrc: string[];
    mainImageSrc: string;
    setIndex: (index: number) => void;
    setImage: (image: string) => void;
}

export default function SideImages({ sideImagesSrc, mainImageSrc, setIndex, setImage }: SideImgProps) {
    return (
        <div className="side-wrapper">
            {sideImagesSrc.map((img, index) => (
                <button
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    style={{
                        backgroundImage: `url(${img})`,
                    }}
                    onClick={() => {
                        setImage(img);
                        setIndex(index);
                    }}
                    className={`side-img ${mainImageSrc === img ? 'active' : ''}`}
                    type="button"
                    aria-label={`Variant image ${index + 1}`}
                >
                    <div className="overlay" />
                </button>
            ))}
        </div>
    );
}
