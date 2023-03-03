import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import { ChangeEvent, FC, useEffect, useState } from 'react';

import { Label } from '../Label';

interface IAvatarProps {
  uid: string | undefined;
  avatarFilename: string | null;
  size: number;
  onUpload: (filePath: string) => void;
}

export const Avatar: FC<IAvatarProps> = ({ uid, avatarFilename, size, onUpload }) => {
  const supabase = useSupabaseClient();
  const [avatarUrl, setAvatarUrl] = useState<null | string>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (avatarFilename) downloadImage(avatarFilename);
  }, [avatarFilename]);

  async function downloadImage(filename: string) {
    const { data } = supabase.storage.from('avatars').getPublicUrl(filename);
    const url = data.publicUrl;
    setAvatarUrl(url);
  }

  const uploadAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${uid}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
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
    <div>
      {avatarUrl ? (
        <Image
          src={avatarUrl}
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
        <Label name="single" label={uploading ? 'Uploading ...' : 'Edit picture'} />
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
