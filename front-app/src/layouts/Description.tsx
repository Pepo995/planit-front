import React from 'react';
import { Link } from 'react-router-dom';

interface DescriptionProps {
  description: string | null;
  name: string;
}

export const Description1 = ({ description, name }: DescriptionProps) => {
  return (
    <div className='sm:hidden flex flex-col gap-8 sm:gap-12'>
      <h5 className='text-2xl font-medium'>Descripción</h5>
      <div className='flex flex-col gap-5 bg-red'>
        {description != null ? (
          <p>
            Cada <span className='font-semibold'>{name}</span> contiene:
          </p>
        ) : (
          <p>
            El producto <span className='font-semibold'>{name}</span> no tiene descripcion
          </p>
        )}

        {description != null && (
          <ul>
            {description.split(',').map((element: any) => (
              <li key={element}>{element}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export const Description2 = ({ description, name }: DescriptionProps) => {
  return (
    <div className='hidden sm:flex flex-col gap-12'>
      <h5 className='text-2xl font-medium'>Descripción</h5>
      <div className='flex flex-col gap-5 bg-red'>
        {description != null ? (
          <p>
            Cada <span className='font-semibold'>{name}</span> de Filipa contiene los siguientes productos:
          </p>
        ) : (
          <p>
            El producto <span className='font-semibold'>{name}</span> no tiene descripcion
          </p>
        )}

        {description != null && (
          <ul>
            {description.split(',').map((element: any) => (
              <li key={element}>{element}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
