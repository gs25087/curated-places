import Skeleton from '@mui/material/Skeleton';
import Image from 'next/image';
import React, { useState } from 'react';
import { IPostPhotosProps } from 'src/types/types';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { extractWidthFromUrl } from '@/lib/helpers';

export const PlacePhotos: React.FC<IPostPhotosProps> = ({ photoUrls }) => {
  const [loaded, setLoaded] = useState(false);

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
      mousewheel-force-to-axis="true"
      free-mode="true"
      momentum-bounce="false"
    >
      {photoUrls.length > 0 &&
        photoUrls.map((photoUrl) => {
          const ImgWidth = extractWidthFromUrl(photoUrl) || 200;

          return (
            <SwiperSlide key={photoUrl} style={{ width: 'auto' }}>
              {loaded ? null : (
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width={ImgWidth}
                  height={128}
                  className="rounded-lg"
                />
              )}
              <Image
                src={photoUrl}
                width={ImgWidth}
                height={128}
                alt="Place photo"
                className={`aspect-auto h-[128px]  w-auto rounded-lg object-contain ${
                  loaded ? '' : 'absolute opacity-0'
                }`}
                style={{ width: 'auto' }}
                onLoad={() => setLoaded(true)}
              />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};
