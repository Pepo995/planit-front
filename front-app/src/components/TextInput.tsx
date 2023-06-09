import React from 'react';

import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface TextFieldProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  placeholder: string;
  hidden?: boolean;
  error?: boolean;
  errorMessage?: string;
}

const TextInput = <T extends FieldValues>({
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

export default TextInput;
