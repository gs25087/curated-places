import Image from 'next/image';
import React from 'react';
import { IPostPhotosProps } from 'src/types/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

export const PlacePhotos: React.FC<IPostPhotosProps> = ({ photoUrls }) => {
  return (
    <Swiper
      slidesPerView={'auto'}
      spaceBetween={10}
      pagination={{
        el: '.swiper-pagination',
        clickable: true
      }}
      style={{ width: '100%' }}
      space-between="10"
      mousewheel={true}
      mousewheel-force-to-axis={true}
      free-mode={true}
      momentum-bounce={false}
    >
      {/*  <SwiperSlide className="mr-4 inline-block" style={{ height: '300px', width: '100px' }}>
        <div className="flex h-full w-full items-center justify-around bg-primary-LIGHT">
          Add your photo
        </div>
      </SwiperSlide> */}
      {photoUrls.length > 0 &&
        photoUrls.map((photoUrl) => (
          <SwiperSlide key={photoUrl} style={{ width: 'auto' }}>
            <Image
              src={photoUrl}
              width={200}
              height={128}
              alt="Place photo"
              className="aspect-auto h-[128px] w-auto rounded-lg object-contain"
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};
