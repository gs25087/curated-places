import Image from 'next/image';
import { ChangeEvent, FC } from 'react';
import { IAvatarProps } from 'src/types/types';

import { Label } from '../Label';

export const Avatar: FC<IAvatarProps> = ({ avatarFilePath, size, onUpload }) => {
  const previewAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      throw new Error('You must select an image to upload.');
    }

    const file = event.target.files[0];
    const blobUrl = URL.createObjectURL(file);

    onUpload(blobUrl, file);
  };

  return (
    <div>
      {avatarFilePath ? (
        <Image
          src={avatarFilePath}
          priority
          alt="Avatar"
          className="block h-[6rem] w-[6rem] rounded-full object-cover shadow-lg"
          height={size}
          width={size}
          style={{ height: size, width: size }}
          onClick={() => document.getElementById('single')?.click()}
        />
      ) : (
        <div
          className="h-[6rem]  w-[6rem] cursor-pointer rounded-full border border-dashed border-black bg-primary-75"
          style={{ height: size, width: size }}
          onClick={() => document.getElementById('single')?.click()}
        />
      )}
      <div style={{ width: size }} className="pt-4 text-center">
        <Label name="single" label={'Edit picture'} />
        <input
          className="absolute hidden w-0"
          type="file"
          id="single"
          accept="image/*"
          onChange={previewAvatar}
        />
      </div>
    </div>
  );
};
