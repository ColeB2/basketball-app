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


// export default function Carousel(props:CarouselProps): JSX.Element {
//     return (
//         <div className="">
//             <Swiper
//                 modules={[Navigation, Pagination]}
//                 direction={'horizontal'}
//                 spaceBetween={0}
//                 // loop={true}
//                 rewind={true}
//                 slidesPerView={'auto'}
//                 slidesPerGroupAuto
//                 pagination={
//                     {
//                         clickable: true,
//                         el: '.swiper-pagination' 
//                     }
//                 }
//                 navigation={{}}
//             >
//                 {
//                     props.data.map((item, idx) => {
//                         return (
//                             <SwiperSlide key={idx}>
//                                 {
//                                     <ScoreCard
//                                         key={item.id}                                    
//                                     />
//                                 }
//                             </SwiperSlide>
//                         )
//                     })
//                 }
//             </Swiper>
//         </div>
//     )  
// }

import {teamObject} from '../types/basketballdata'

// extend apibasketballData?
interface CarouselProps {
    data: {
        date: Date;
        home_team: teamObject;
        home_team_score: number;
        id: number;
        period: number;
        postseason: boolean;
        season: number;
        status: string;
        time: string;
        visitor_team: teamObject;
        visitor_team_score: number;
    }[];
    meta: Object;
    handleClick?: Function;
}

const Carousel = ({data, meta, handleClick}: CarouselProps) => (
    data &&
    <div className="">
        <h5>Title</h5>
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
                    // {console.log("Carousel data.map, item", item)}
                    return (
                        <SwiperSlide key={idx}>
                            {
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