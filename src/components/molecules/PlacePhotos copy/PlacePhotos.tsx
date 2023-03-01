import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

interface IPlacePhotosProps {
  address: string;
  photoUrls: string[];
}

export const PlacePhotos: React.FC<IPlacePhotosProps> = ({ address, photoUrls }) => {
  return (
    <Swiper
      slidesPerView={'auto'}
      spaceBetween={30}
      pagination={{
        el: '.swiper-pagination',
        clickable: true
      }}
      style={{ height: '300px', width: '100%' }}
    >
      <SwiperSlide className="mr-4 inline-block" style={{ height: '300px', width: '100px' }}>
        <div className="flex h-full w-full items-center justify-around bg-primary-LIGHT">
          Add your photo
        </div>
      </SwiperSlide>
      {address && photoUrls.length ? (
        photoUrls.map((photoUrl) => (
          <SwiperSlide
            key={photoUrl}
            className="mr-4 inline-block"
            style={{ height: '300px', width: 'auto' }}
          >
            <Image
              src={photoUrl}
              width={200}
              height={300}
              alt="Place photo"
              className="min-h-full w-auto object-contain"
            />
          </SwiperSlide>
        ))
      ) : address ? (
        <div className="flex h-full w-[200px] items-center justify-around bg-primary">
          Add your photo
        </div>
      ) : (
        <></>
      )}
    </Swiper>
  );
};
