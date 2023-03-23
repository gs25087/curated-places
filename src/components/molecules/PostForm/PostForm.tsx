import { yupResolver } from '@hookform/resolvers/yup';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { IAddPostFormData, IFormStatusMessage } from 'src/types/types';
import * as yup from 'yup';

import { FormStatusMessage, FormTitle, Input, Label, Textarea } from '@/components/atoms';
import { Button } from '@/components/atoms/Button';
import { SearchBox } from '@/components/molecules/SearchBox';

import { CategoriesSelection } from '../CategoriesSelection';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  address: yup.string().required('Address is required'),
  photos: yup.string(),
  latitude: yup.number().required('Latitude is required'),
  longitude: yup.number().required('Longitude is required'),
  description: yup.string()
  // tags: yup.array().min(1, 'At least one tag is required')
});

export const PostForm = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();

  const [statusMessage, setStatusMessage] = useState<IFormStatusMessage>({
    status: '',
    message: ''
  });

  const [showCategories, setShowCategories] = useState(false);

  const { handleSubmit, setValue, formState, watch, register } = useForm<IAddPostFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      address: '',
      photos: '',
      latitude: 0,
      longitude: 0,
      description: ''
    }
  });

  const errors: FieldErrors<IAddPostFormData> = formState.errors;
  const address = watch('address');

  const handleCreate = async (formData: IAddPostFormData) => {
    if (!user) {
      // user is not authenticated
      return;
    }

    try {
      const updates = {
        author: user.id,
        ...formData,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase.from('posts').insert([updates]);
      if (error) throw error;
      router.push('/');
    } catch (error: unknown) {
      //@ts-nocheck
      setStatusMessage({ status: 'error', message: 'Error updating the data!' });
    }
  };

  //const handleUpdate = async (currentPost: IPost, data: IAddPostFormData) => {};
  const onSubmit: SubmitHandler<IAddPostFormData> = async (data) => {
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
        <Label label="Search address" name="search" />
        <SearchBox
          onSelectAddress={(title, address, latitude, longitude) => {
            setValue('address', address);
            setValue('latitude', latitude);
            setValue('longitude', longitude);
            setValue('title', title);
          }}
          setPhotos={(photos) => {
            setValue('photos', JSON.stringify(photos));
          }}
          address={address}
          defaultValue=""
        />
        {/*         <ErrorMessage errors={errors} name="address" />
         */}{' '}
      </div>

      {/* {address && ( */}
      <>
        {/*  

        <div
          className={`${styles.input} ${styles.fieldWrapper} text-gray-400`}
          onClick={() => setShowCategories(true)}
        >
          Select category
        </div>*/}
        {showCategories && <CategoriesSelection />}
        <Input name="title" label="Title" register={register} errors={errors.title} />
        {/*           <ErrorMessage errors={errors} name="title" />
         */}
        <Textarea
          name="description"
          label="Description"
          register={register}
          errors={errors.description}
        />
      </>
      {/*   )} */}

      {statusMessage.message && (
        <FormStatusMessage message={statusMessage.message} status={statusMessage.status} />
      )}
      <div className="my-8 flex gap-x-4">
        <Button label="Save" type={'submit'} /* disabled={submitting} */ />
        <Link href="/">
          <Button label="Cancel" type={'button'} /* disabled={submitting} */ />
        </Link>
      </div>
    </form>
  );
};
