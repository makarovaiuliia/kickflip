import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

import './modalSlider.css';
import { EffectCoverflow, Navigation, EffectCreative } from 'swiper/modules';
import { useEffect, useState } from 'react';

interface ModalSliderProps {
    sliderImages: string[];
}

export default function ModalSlider({ sliderImages }: ModalSliderProps) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <Swiper
            effect={`${isMobile ? 'creative' : 'coverflow'}`}
            grabCursor
            centeredSlides
            loop
            slidesPerView="auto"
            coverflowEffect={{
                rotate: 0,
                modifier: 2.5,
            }}
            creativeEffect={{
                prev: {
                    translate: [0, 0, -400],
                },
                next: {
                    translate: ['100%', 0, 0],
                },
            }}
            navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }}
            modules={[EffectCoverflow, Navigation, EffectCreative]}
            className="swiper_container"
        >
            {sliderImages.map((img, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <SwiperSlide key={index}>
                    <img src={img} alt="slide_image" />
                </SwiperSlide>
            ))}
            <div className="slider-controler">
                <button className="swiper-button-prev slider-arrow" type="button">
                    &lt;
                </button>
                <button className="swiper-button-next slider-arrow" type="button">
                    &gt;
                </button>
            </div>
        </Swiper>
    );
}
