import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { Label } from '@/components/atoms';

export const Avatar = ({ uid, url, size, onUpload }) => {
  const supabase = useSupabaseClient();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      //@ts-nocheck
      console.log('Error downloading image: ', error);
    }
  }

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${uid}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      //@ts-nocheck
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className=" ">
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="Avatar"
          className="block h-[6rem] w-[6rem] rounded-full object-cover shadow-lg"
          height={size}
          width={size}
          style={{ height: size, width: size }}
          onClick={() => document.getElementById('single').click()}
        />
      ) : (
        <div
          className="h-[6rem]  w-[6rem] cursor-pointer rounded-full border border-dashed border-black bg-primary"
          style={{ height: size, width: size }}
          onClick={() => document.getElementById('single').click()}
        />
      )}
      <div style={{ width: size }} className="pt-4 text-center">
        <Label
          className="w-full text-sm "
          name="single"
          label={uploading ? 'Uploading ...' : 'Edit picture'}
        />
        <input
          className="absolute hidden w-0"
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
};
