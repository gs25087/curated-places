import { yupResolver } from '@hookform/resolvers/yup';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFormStatusMessage, IProfileFormData } from 'src/types/types';
import * as yup from 'yup';

import { Avatar } from '@/components/atoms';
import { Button } from '@/components/atoms';
import { Input } from '@/components/atoms';
import { FormStatusMessage } from '@/components/atoms';

export const Account = (/* { session } */) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState<IFormStatusMessage>({
    status: '',
    message: ''
  });
  const [avatarFilename, setAvatarFilename] = useState(null);

  const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required')
  });

  const { register, handleSubmit, formState, reset } = useForm<IProfileFormData>({
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
        setStatusMessage({
          status: '',
          message: ''
        });
      }
    } catch (error: unknown) {
      setStatusMessage({
        status: 'error',
        message: 'Error loading the data!'
      });
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(data: IProfileFormData) {
    try {
      setLoading(true);

      const updates = {
        id: user?.id,
        ...data,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;

      setStatusMessage({
        status: '',
        message: ''
      });

      reset(data);
    } catch (error: unknown) {
      setStatusMessage({
        status: 'error',
        message: 'Error loading the data!'
      });

      //@ts-ignore
      if (error.code === '23505') {
        //@ts-ignore
        setStatusMessage({
          status: 'error',
          message: 'Username already exists!'
        });
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
        setStatusMessage({ status: 'success', message: 'Your profile has been updated!' });
      } catch (error) {
        setStatusMessage({ status: 'error', message: 'Error updating the data!' });
      } finally {
        setLoading(false);
      }
    }
  }

  const onSubmit: SubmitHandler<IProfileFormData> = async (data) => {
    if (user) {
      updateProfile(data);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap items-center justify-around gap-x-8">
          <Avatar
            uid={user?.id}
            avatarFilename={avatarFilename}
            size={100}
            onUpload={(avatarFilename: string) => {
              //@ts-ignore
              setAvatarFilename(avatarFilename);
              //@ts-ignore
              updatePhoto(avatarFilename);
            }}
          />
          <div className="w-full">
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
        </div>

        <div className=" flex flex-wrap  justify-around gap-x-4 py-8">
          {statusMessage.message && (
            <FormStatusMessage message={statusMessage.message} status={statusMessage.status} />
          )}
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
