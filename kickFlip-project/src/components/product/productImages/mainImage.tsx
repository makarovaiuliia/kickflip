import { useEffect, useState } from 'react';
import { ImgProps } from '@/types/componentsInterfaces';

export default function MainImage({ imagesSrc, setIndex, activeIndex, openModal }: ImgProps) {
    const [currentIndex, setCurrentIndex] = useState(activeIndex);

    useEffect(() => setIndex(currentIndex), [currentIndex, setIndex]);
    useEffect(() => setCurrentIndex(activeIndex), [activeIndex, setCurrentIndex]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesSrc.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + imagesSrc.length) % imagesSrc.length);
    };

    const handleOpen = () => {
        if (openModal) {
            openModal(true);
        }
    };

    return (
        <div className="carousel-wrapper">
            <div
                className="carousel-inner"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                onClick={handleOpen}
                onKeyDown={handleOpen}
                tabIndex={0}
                role="button"
                aria-label="show modal"
            >
                {imagesSrc.map((src, index) => (
                    <img
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        src={src}
                        alt={`Slide ${index}`}
                        className="main-img"
                    />
                ))}
            </div>
            <button className="slider-btn prev" onClick={handlePrev} aria-label="Previous image" type="button">
                &lt;
            </button>
            <button className="slider-btn next" onClick={handleNext} aria-label="Next image" type="button">
                &gt;
            </button>
        </div>
    );
}
