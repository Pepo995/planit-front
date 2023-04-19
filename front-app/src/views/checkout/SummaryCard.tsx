import React from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { getProductById } from '../../api/productsApi';
import { Button } from '../../components/Button';

interface SummaryCardProps {
  total?: any | null;
  deliveryFixCost: number;
  taxPercentage: number;
}

const SummaryCard = ({ total, deliveryFixCost, taxPercentage }: SummaryCardProps) => {
  const location = useLocation();
  const params = location.pathname.split('/');
  const id = params[params.length - 2];
  const { isLoading, data: productData } = useQuery(['params', id], () => getProductById(id));

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className='flex flex-col gap-8 bg-white p-14'>
      <h5 className='sm:text-center font-medium sm:text-black text-transparent-bgclip text-xl sm:text-2xl'>
        Resumen de compra
      </h5>
      <div className='flex gap-5'>
        <img src={productData.image} className='h-full w-[30%]'></img>
        <div>
          <h6 className='uppercase font-normal text-lg sm:text-xl'>filipa | {productData.name}</h6>
        </div>
      </div>

      <h6 className='font-normal text-lg sm:text-xl'>Método de Pago</h6>
      <div className='flex flex-col sm:gap-1'>
        <p className='sm:text-lg text-base font-normal text-gray-600'>Pago a través de Mercado pago</p>
      </div>

      <div className='flex flex-col gap-8'>
        <h6 className='sm:text-xl text-lg font-normal'>Información de facturación</h6>

        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-1'>
            <p className='text-gray-500 text-base font-medium'>RUT</p>
            <hr className='border-[0.5px] border-gray-500 w-full m-inline'></hr>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-gray-500 text-base font-medium'>Razón Social</p>
            <hr className='border-[0.5px] border-gray-500 w-full m-inline'></hr>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <div className='flex justify-between'>
            <p className='text-gray-500'>Subtotal</p>
            <p>$ {total && total}</p>
          </div>
          <div className='flex justify-between'>
            <p className='text-gray-500'>Costo de envío</p>
            <p>$ {deliveryFixCost}</p>
          </div>
          <div className='flex justify-between'>
            <p className='text-gray-500'>IVA</p>
            <p>$ {total && (total + deliveryFixCost) * taxPercentage}</p>
          </div>
        </div>

        <div className='flex justify-between text-lg font-medium'>
          <p className='uppercase'>total</p>
          <p>$ {total && total + deliveryFixCost + taxPercentage}</p>
        </div>

        <Button>comprar</Button>
      </div>
    </section>
  );
};

export default SummaryCard;
