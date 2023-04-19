import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button2 } from '../../components/Button';
import { TextInput3 } from '../../components/TextInput';
import { CheckoutFormValidationInterface } from './Checkout';
import GoBackVector from '../../assets/svg/go_back_vector_black.svg';

interface DestinationDetailsProps {
  register: UseFormRegister<CheckoutFormValidationInterface>;
  errors: FieldErrors<CheckoutFormValidationInterface>;
  onClick?: () => void;
  id?: string;
}

const DestinationDetails = ({ register, errors, onClick, id }: DestinationDetailsProps) => {
  return (
    <div className='flex flex-col gap-4 sm:gap-10 md:w-[50%] sm:mb-1 mb-12'>
      <div className='flex sm:hidden'>
        <Link to={`/products/${id}`}>
          <div className='flex cursor-pointer gap-4 '>
            <img src={GoBackVector}></img>
            <p className='font-medium'>Volver</p>
          </div>
        </Link>
      </div>

      <h4 className='sm:hidden flex font-medium sm:text-4xl text-lg text-transparent-bgclip'>Detalles de la entrega</h4>
      <h5 className='font-medium text-base sm:text-3xl'>Destinatario</h5>
      <p className='font-normal text-sm sm:text-xl'>Complete la información del destinatario de su regalo.</p>

      <div className='flex flex-col md:flex-row gap-4'>
        <div className='flex flex-col gap-2 md:w-[50%]'>
          <TextInput3 register={register} name='fullName' placeholder='Nombre y apellido'></TextInput3>

          <TextInput3 register={register} name='deliveryDate' placeholder='Fecha de entrega'></TextInput3>

          <TextInput3 register={register} name='direction' placeholder='Dirección de entrega'></TextInput3>
        </div>

        <div className='flex flex-col gap-2 md:w-[50%]'>
          <TextInput3
            register={register}
            name='contactNumber'
            placeholder='Número de contacto'
            error={!!errors.contactNumber}
            errorMessage={errors.contactNumber?.message}
          ></TextInput3>

          <TextInput3 register={register} name='deliveryTime' placeholder='Horarios de entrega'></TextInput3>

          <TextInput3
            register={register}
            name='deliveryCost'
            placeholder='Costo de envío'
            error={!!errors.deliveryCost}
            errorMessage={errors.deliveryCost?.message}
          ></TextInput3>
        </div>
      </div>
      <div className='flex  gap-7'>
        <label className='switch'>
          <input type='checkbox' id='surprise' {...register('surprise')}></input>
          <span className='slider round'></span>
        </label>

        <div className='flex flex-col'>
          <p className='font-normal text-base'>Entrega sorpresa</p>
          <p className='font-light text-sm'>
            Si el envío no es sorpresa, podríamos contactar al destinatario de la entrega.
          </p>
        </div>
      </div>
      <div className='flex flex-col gap-4 sm:mt-1 mt-10'>
        <h5 className='font-medium text-base sm:text-3xl'>Personalización</h5>

        <p className='sm:flex hidden font-normal text-lg'>
          Seleccionó la opción de agregar una tarjeta personal. Por favor, deje el mensaje que desea que acompañe el
          obsequio.
        </p>

        <p className='flex sm:hidden font-normal text-base'>
          Por favor, deje el mensaje que desea que acompañe el obsequio.
        </p>

        <input
          type='text'
          placeholder='Escriba su mensaje...'
          className='w-full h-16 px-5 relative bg-white sm:bg-gray-200 placeholder:text-gray-400 placeholder:absolute placeholder:top-[5%] placeholder:left-[2%] placeholder:text-sm placeholder:font-light focus:placeholder:text-transparent'
        />
      </div>
      <div className='hidden sm:flex gap-10 w-full'>
        <div className='flex flex-col gap-1 w-[95%]'>
          <p className='w-full text-base font-normal'>Adjuntar logo de la empresa</p>
          <p className='w-full text-sm font-light'>Adjuntar en formato png, sin fondo y en alta resolución.</p>
        </div>

        <button
          type='button'
          className='text-gray-500 text-sm h-[70%] bg-transparent border-gray-600 border-[1px] rounded px-6 whitespace-nowrap'
        >
          Subir archivo
        </button>
      </div>
      <div className='flex flex-col gap-4 sm:gap-6 sm:mt-1 mt-8'>
        <h6 className='font-medium text-base sm:text-2xl'>Si el envío rebota</h6>
        <p className='text-sm sm:text-lg font-normal'>
          Cada re-entrega se considera un envío extra y el horario será coordinado por nuestro equipo con el
          destinatario.
        </p>

        <div className='flex mt-4 sm:mt-1 gap-2 text-xs sm:text-base'>
          <input type='checkbox' id='forwarding' {...register('forwarding')} />
          <label>Intentar reenvío a la misma dirección</label>
        </div>
      </div>

      <div className='flex md:hidden'>
        <Button2 type='button' onClick={onClick}>
          validar compra
        </Button2>
      </div>
    </div>
  );
};

export default DestinationDetails;
