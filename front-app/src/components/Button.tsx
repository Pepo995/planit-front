import React from 'react';

interface ButtonProps {
  loading: boolean;
  text: string;
  children: React.ReactNode;
}

export const Button = ({ loading, text, children }: ButtonProps) => {
  return loading ? (
    <p>${text}</p>
  ) : (
    <button
      type='submit'
      className='mt-6 h-9 sm:h-7 lg:h-9 w-full uppercase bg-linear-gradient-primary font-medium text-sm lg:text-base text-white bg-transparent rounded-md'
    >
      {children}
    </button>
  );
};
