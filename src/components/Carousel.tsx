import React from "react";

import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper';

// swiper bundle styles
import 'swiper/css/bundle'

// swiper core styles
import 'swiper/css'

// modules styles
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import ScoreCard from "./ScoreCard"
import DateCard from "./DateCard";
import {teamObject, basketballData} from '../types/basketballdata'

// extend apibasketballData?
interface CarouselProps {
    data: basketballData[];
    meta?: Object;
    handleClick?: Function;
}

const Carousel = ({data, meta, handleClick}: CarouselProps) => (
    data &&
    <div className="">
        <Swiper
            modules={[Navigation, Pagination]}
            direction={'horizontal'}
            spaceBetween={0}
            freeMode={true}
            slidesPerView={"auto"}
            // loop={true}
            // slidesPerGroupAuto
            slidesPerGroupAuto={true}
            pagination={
                {
                    clickable: true,
                    el: '.swiper-pagination' 
                }
            }
            navigation={{}}
        >
            {
                data.map((item, idx: number) => {
                    {console.log("Carousel data.map, item", item)}
                    return (
                        <SwiperSlide key={idx}>
                            {   item.dateObj ? <DateCard data={item}/> :
                                <ScoreCard
                                    key={item.id}
                                    handleClick={handleClick}
                                    {...item}
                                />
                            }
                        </SwiperSlide>
                    )

                })
            }
        </Swiper>
    </div>
)
export default Carousel;