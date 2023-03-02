import { yupResolver } from '@hookform/resolvers/yup';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Avatar } from '@/components/atoms';
import { Button } from '@/components/atoms';
import { Input } from '@/components/atoms';

export type IFormData = {
  username: string | '';
  first_name: string | '';
  last_name: string | ' ';
  website: string | ' ';
  submit: undefined;
};

export const Account = (/* { session } */) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [avatarFilename, setAvatarFilename] = useState(null);

  const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required')
  });

  const { register, handleSubmit, formState, reset } = useForm<IFormData>({
    resolver: yupResolver(schema)
  });

  const { errors, isSubmitting } = formState;

  useEffect(() => {
    getProfile();
  }, [reset]);

  async function getProfile() {
    try {
      setLoading(true);
      const { data, error, status } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        reset(data);
        setAvatarFilename(data.avatar_url);
        setSuccessMessage('');
        setErrorMessage('');
      }
    } catch (error: unknown) {
      // @ts-ignore
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(data: IFormData) {
    try {
      setLoading(true);

      const updates = {
        id: user?.id,
        ...data,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;

      //@ts-ignore
      setErrorMessage('');

      reset(data);
    } catch (error: unknown) {
      setErrorMessage('Error updating the data!');

      //@ts-ignore
      if (error.code === '23505') {
        //@ts-ignore
        setErrorMessage('Username already taken');
      }
    } finally {
      setLoading(false);
    }
  }

  async function updatePhoto(avatarFile: string) {
    if (user) {
      try {
        setLoading(true);

        const updates = {
          id: user.id,
          avatar_url: avatarFile,
          updated_at: new Date().toISOString()
        };

        const { error } = await supabase.from('profiles').upsert(updates);
        if (error) throw error;
        //@ts-nocheck
        setSuccessMessage('Profile updated!');
        setErrorMessage('');
      } catch (error) {
        //@ts-nocheck
        setSuccessMessage('');
        setErrorMessage('Error updating the data!');
      } finally {
        setLoading(false);
      }
    }
  }

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    if (user) {
      updateProfile(data);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap items-center justify-around gap-x-8">
          <div className="md:order order-2 w-full md:w-auto md:grow">
            <Input
              label="First Name"
              name="first_name"
              register={register}
              errors={errors.first_name}
              placeholder={'First Name'}
            />
            <Input
              label="Last Name"
              name="last_name"
              register={register}
              errors={errors.last_name}
              placeholder={'Last Name'}
            />
            <Input
              label="Username"
              name="username"
              register={register}
              errors={errors.username}
              placeholder={'Username'}
            />
            <Input
              label="Instagram"
              name="website"
              register={register}
              errors={errors.website}
              placeholder={'@username'}
            />
          </div>
          <div className="order md:order-2">
            <Avatar
              uid={user?.id}
              url={avatarFilename}
              size={'100'}
              onUpload={(avatarFilename: string) => {
                //@ts-ignore
                setAvatarFilename(avatarFilename);
                //@ts-ignore
                updatePhoto(avatarFilename);
              }}
            />
          </div>
        </div>

        <div className=" flex flex-wrap  justify-around gap-x-4 py-8">
          {errorMessage && <p className="mb-4  w-full text-sm text-red-500">{errorMessage}</p>}
          <Button
            label={loading ? 'Loading ...' : 'Update'}
            /* disabled={loading} */
            color="white"
            type={'submit'}
          />
          <Button
            color="white"
            label="Sign Out"
            onClick={() => supabase.auth.signOut()}
            type={'button'}
          />
        </div>
      </form>
    </>
  );
};
