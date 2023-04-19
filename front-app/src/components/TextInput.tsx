import React from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface TextFieldProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  placeholder?: string;
  hidden?: boolean;
  type?: string;
  error?: boolean;
  errorMessage?: string;
  defaultValue?: string;
}

export const TextInput = <T extends FieldValues>({
  name,
  register,
  placeholder,
  hidden = false,
  error,
  errorMessage,
}: TextFieldProps<T>) => {
  return (
    <div className='w-full h-12'>
      <input
        {...register(name)}
        type={hidden ? 'password' : 'text'}
        placeholder={placeholder}
        autoComplete='off'
        className={`w-full bg-transparent placeholder:text-black border-b placeholder:text-lg sm:placeholder:text-sm lg:placeholder:text-base border-black py-2 focus:outline-none focus:placeholder:text-transparent ${
          error && 'border-red-500'
        }`}
      />
      {error && <p className='text-sm mt-2 text-red-500'>{errorMessage}</p>}
    </div>
  );
};

export const TextInput2 = <T extends FieldValues>({
  name,
  register,
  hidden = false,
  error,
  errorMessage,
  defaultValue,
}: TextFieldProps<T>) => {
  return (
    <div className='w-full h-12'>
      <input
        defaultValue={defaultValue}
        {...register(name)}
        type={hidden ? 'password' : 'text'}
        autoComplete='off'
        className={`w-full bg-transparent border-b text-base font-medium text-gray-500 border-gray-500 py-2 focus:outline-none ${
          error && 'border-red-500'
        }`}
      />
      {error && <p className='text-sm mt-2 text-red-500'>{errorMessage}</p>}
    </div>
  );
};

export const TextInput3 = <T extends FieldValues>({
  name,
  register,
  error,
  errorMessage,
  defaultValue,
  placeholder,
}: TextFieldProps<T>) => {
  return (
    <div className='w-full h-12'>
      <input
        // {...(type == 'number' ? { ...register(name, { setValueAs: (v) => parseInt(v) }) } :
        {...register(name)}
        // )}
        placeholder={placeholder}
        defaultValue={defaultValue}
        autoComplete='off'
        className={`w-full bg-transparent border-b text-base font-medium text-gray-500 border-gray-500 py-2 focus:outline-none ${
          error && 'border-red-500'
        }`}
      />
      {error && <p className='text-sm mt-2 text-red-500'>{errorMessage}</p>}
    </div>
  );
};
