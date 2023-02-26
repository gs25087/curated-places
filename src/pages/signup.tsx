import { useAuth } from '@/auth/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import React, { useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button } from '@/components/molecules/Button';
import { Input } from '@/components/molecules/Input';

interface FileWithPathPreview extends FileWithPath {
  preview?: string;
}

export type SignUpFormData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  file: FileWithPathPreview | null;
};

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  firstName: yup.string().required('Name is required'),
  lastName: yup.string(),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required')
});

function FileUpload({
  onFileChange
}: {
  onFileChange: (file: FileWithPathPreview | null) => void;
}) {
  const [file, setFile] = useState<FileWithPathPreview | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.heic', '.heif']
    },

    onDrop: (acceptedFiles) => {
      onFileChange(acceptedFiles[0]);
      setFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0])
        })
      );
    }
  });

  return (
    <div className="mt-1 flex h-[6rem] w-[6rem] justify-center  ">
      <div className="space-y-1 text-center">
        {file && file.preview ? (
          <>
            <div className="aspect-w-1 aspect-h-1">
              <Image
                className="block h-[6rem] w-[6rem] rounded-full object-cover shadow-lg"
                width={100}
                height={100}
                src={file.preview}
                alt={file.name}
              />
            </div>
            <button
              type="button"
              className="focus:no-outline mt-4  rounded-full  p-0   text-xs  underline focus:outline-none "
              onClick={() => {
                setFile(null);
                onFileChange(null);
              }}
            >
              Remove photo
            </button>
          </>
        ) : (
          <div
            {...getRootProps({ className: 'cursor-pointer' })}
            className="h-[6rem]  w-[6rem] cursor-pointer rounded-full border border-dashed border-black bg-lime-100"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="relative top-1/2 -translate-y-1/2 transform px-6 pt-5 pb-6 text-xs font-medium">
                Drop the file here ...
              </p>
            ) : (
              <>
                <div className="relative top-1/2 -translate-y-1/2 transform px-6 pt-5 pb-6 text-center text-center">
                  <p className=" text-xs font-medium">
                    Add <br />
                    photo
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpFormData>({
    resolver: yupResolver(schema)
  });

  const { signup } = useAuth();
  const [avatarFile, setAvatarFile] = useState<FileWithPathPreview | null>(null);

  const handleSignup = async (data: SignUpFormData) => {
    data.file = avatarFile;
    try {
      await signup(data);
      //@ts-ignore
    } catch (err: unknown) {
      //@ts-ignore
      throw new Error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignup)}>
      <Input
        name="email"
        type={'email'}
        label="Email address"
        register={register}
        errors={errors.email}
        required
        placeholder={'you@email.com'}
      />
      <div className="flex w-full gap-x-4">
        <Input
          name="firstName"
          label="First Name"
          register={register}
          errors={errors.firstName}
          required
          placeholder={'First Name'}
          classes={['w-1/2']}
        />
        <Input
          name="lastName"
          label="Last Name"
          register={register}
          errors={errors.lastName}
          placeholder={'Last Name'}
          classes={['w-1/2']}
        />
      </div>
      <div className="flex w-full gap-x-4">
        <Input
          name="password"
          type={'password'}
          label="Password"
          register={register}
          errors={errors.password}
          required
          classes={['w-1/2']}
        />

        <Input
          name="password"
          type={'password'}
          label="Confirm password"
          register={register}
          errors={errors.confirmPassword}
          required
          classes={['w-1/2']}
        />
      </div>
      <div className="mt-6">
        <div className="mt-4">
          <FileUpload onFileChange={setAvatarFile} />
        </div>
      </div>
      <div className="mt-16">
        <Button label="Sign up" type="submit" />
      </div>
    </form>
  );
};

export default Signup;
