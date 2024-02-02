import "./Swip.css";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from 'swiper/modules';

import { IonImg, IonItem } from "@ionic/react";
interface ContainerProps {
  annonce: any;
}

const Swip: React.FC<ContainerProps> = ({ annonce }) => {
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        
        modules={[Pagination]}
        className="mySwiper"
      >
          {annonce.photos.map((photo: any,index: number ) => (
            <SwiperSlide key={index}>
            <IonImg
              alt="Photo"
              src={photo.lien}
            ></IonImg>            
          </SwiperSlide>      
          ))}
      </Swiper>
    </>
  );
};

export default Swip;
