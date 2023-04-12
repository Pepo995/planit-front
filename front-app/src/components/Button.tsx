import { on } from 'events';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
}

export const Button = ({ children }: ButtonProps) => {
  return (
    <button
      type='submit'
      className='h-9 sm:h-7 lg:h-9 w-full uppercase bg-linear-gradient-primary font-medium text-sm lg:text-base text-white bg-transparent rounded-md'
    >
      {children}
    </button>
  );
};

export const Button2 = ({ children, type, onClick }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className='h-9 sm:h-7 lg:h-9 w-full uppercase bg-linear-gradient-primary font-medium text-sm lg:text-base text-white bg-transparent rounded-md'
    >
      {children}
    </button>
  );
};
