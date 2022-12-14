import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';

// swiper bundle styles
import 'swiper/css/bundle';
// swiper core styles
import 'swiper/css';
import './Carousel.css';

// modules styles
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ScoreCard from '../ScoreCard/ScoreCard';
import DateCard from '../DateCard/DateCard';
import { basketballData } from '../../types/basketballdata';

// extend apibasketballData?
interface CarouselProps {
    data: basketballData[];
    meta?: object;
    handleClick: (id: number) => void;
}

const Carousel = ({ data, handleClick }: CarouselProps) =>
    data && (
        <div className="carousel-container">
            <Swiper
                modules={[Navigation, Pagination]}
                direction={'horizontal'}
                spaceBetween={0}
                freeMode={true}
                slidesPerView={'auto'}
                // loop={true}
                // slidesPerGroupAuto
                slidesPerGroupAuto={true}
                pagination={{
                    clickable: true,
                    el: '.swiper-pagination',
                }}
                navigation={{}}
            >
                {data.map((item, idx: number) => {
                    return (
                        <SwiperSlide key={idx}>
                            {item.dateObj ? (
                                <DateCard data={item} />
                            ) : (
                                <ScoreCard
                                    key={item.id}
                                    handleClick={() => handleClick(item.id)}
                                    {...item}
                                />
                            )}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
export default Carousel;
