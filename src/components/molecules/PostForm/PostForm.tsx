import { yupResolver } from '@hookform/resolvers/yup';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FormTitle } from '@/components/atoms';
import { Button } from '@/components/atoms/Button';
import { SearchBox } from '@/components/molecules/SearchBox';

interface IFormData {
  latitude: number | null;
  longitude: number | null;
  address: string;
  name: string;
}

interface IPost {
  id: string;
  latitude: number | null;
  longitude: number | null;
}

interface IProps {
  post?: IPost;
}

const schema = yup.object().shape({
  // title: yup.string().required('Title is required'),
  address: yup.string().required('Address is required'),
  latitude: yup.number().required('Latitude is required'),
  longitude: yup.number().required('Longitude is required')
  // description: yup.string().required('Description is required'),
  // tags: yup.array().min(1, 'At least one tag is required')
});

export const PostForm = ({ post }: IProps) => {
  const supabase = useSupabaseClient();

  const user = useUser();

  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>();
  const {
    register,
    handleSubmit,
    setValue,
    formState,
    getValues,
    formState: { errors },
    watch
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    defaultValues: post
      ? {
          latitude: post?.latitude ?? 0,
          longitude: post?.longitude ?? 0
        }
      : { address: '' }
  });
  const address = watch('address');

  const handleCreate = async (data: IFormData) => {
    if (!user) {
      // user is not authenticated
      return;
    }
    const mydata = data;
    try {
      const updates = {
        author: user.id,
        ...mydata,
        updated_at: new Date().toISOString()
      };

      const { error, data } = await supabase.from('posts').insert([updates]);
      if (error) throw error;
      //@ts-nocheck
      console.log('Post updated!');
    } catch (error: unknown) {
      //@ts-nocheck
      console.log('Error updating the data!');
      //@ts-nocheck
      console.log(error);
    } /* finally {
      setLoading(false);
    } */
  };

  //const handleUpdate = async (currentPost: IPost, data: IFormData) => {};

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    // setSubmitting(false);
    if (user) {
      /*  if (post) {
        handleUpdate(post, data);
      } else { */
      handleCreate(data);
      /*  } */
    }
  };

  return (
    <form className="mx-auto max-w-xl py-4" onSubmit={handleSubmit(onSubmit)}>
      <FormTitle title={'Add new place'} />

      <div className={`mt-4`}>
        {/*          <Label label="Search address" name="search" />
         */}{' '}
        <SearchBox
          onSelectAddress={(name, address, latitude, longitude) => {
            setValue('address', address);
            setValue('latitude', latitude);
            setValue('longitude', longitude);
            setValue('name', name);
          }}
          address={address}
          defaultValue=""
        />
        {errors.address && <p>{errors.address.message}</p>}
      </div>

      {address && (
        <>
          {/*           <Input name="description" label="Description" register={register} errors={errors} />
           */}{' '}
          <div className="mt-4 flex gap-x-4">
            {/*  <Link href="/">
              <Button label="Cancel" type={'button'} /* disabled={submitting}  />
            </Link> */}
          </div>
        </>
      )}
      <Button label="Save" type={'submit'} /* disabled={submitting} */ classes="my-8" />
    </form>
  );
};
