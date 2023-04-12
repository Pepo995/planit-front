import React, { useEffect, useState } from 'react';
import TopNav from '../../layouts/TopNav';
import SearchIcon from '../../assets/svg/search_icon.svg';
import Vector from '../../assets/svg/vector.svg';
import GoBackVector from '../../assets/svg/go_back_vector_black.svg';
import Footer from '../../layouts/Footer';
import SummaryCard from './SummaryCard';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from 'react-query';
import { createSale } from '../../api/salesApi';
import DestinationDetails from './DestinationDetails';

const numberValidator = z
  .string()
  .min(1, 'El campo no puede quedar vacio')
  .transform((value, context) => {
    const parsed = parseInt(value);

    if (isNaN(parsed)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'El campo debe ser un numero',
      });

      return z.NEVER;
    }

    return parsed;
  });

const checkoutFormValidationSchema = z.object({
  fullName: z.string(),
  deliveryDate: z.string(),
  direction: z.string(),
  deliveryTime: z.string(),
  contactNumber: numberValidator,
  deliveryCost: numberValidator,
  surprise: z.boolean(),
  forwarding: z.boolean(),
});
export type CheckoutFormValidationInterface = z.infer<typeof checkoutFormValidationSchema>;

const Checkout = () => {
  const location = useLocation();
  const state = location.state;
  const params = location.pathname.split('/');
  const id = params[params.length - 2];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormValidationInterface>({
    resolver: zodResolver(checkoutFormValidationSchema),
    mode: 'all',
  });

  const { mutate: checkoutMutation } = useMutation({
    mutationFn: createSale,
    onSuccess: () => {
      console.log('Sale created!');
      navigate('/successfulOrder', { replace: true });
    },
  });

  const deliveryFixCost = 180;
  const taxPercentage = 0.22;
  const total = state.total;
  const totalWithTax = total && total + deliveryFixCost + taxPercentage;
  const tax = total && (total + deliveryFixCost) * taxPercentage;

  const [isDesktop, setIsDesktop] = useState(true);
  const [lastPageMobile, setLastPageMobile] = useState(false);

  const query = window.matchMedia('(max-width: 850px)');

  useEffect(() => {
    const resizeHandler = () => {
      if (query.matches) {
        setIsDesktop(false);
      } else {
        setIsDesktop(true);
        setLastPageMobile(false);
      }
    };

    query.addListener(resizeHandler);

    return () => query.removeListener(resizeHandler);
  }, []);

  const navigate = useNavigate();

  return (
    <section className='flex flex-col gap-16 h-full w-full'>
      <div className='sm:flex hidden'>
        <TopNav>
          <input
            type='text'
            placeholder=''
            className='bg-gray-100 px-12 md:px-6 h-full rounded-3xl w-full border-radius border-solid border-black'
          ></input>
          <button className='absolute bg-[#9BC7FF] rounded-full w-8 h-8 right-[93%] md:right-[1%] translate-y-[7%]'>
            <img src={SearchIcon} className='w-20 h-4'></img>
          </button>
          <div className='flex md:hidden'>
            <img src={Vector} className='w-8 h-8 absolute right-[1%] translate-y-[7%]'></img>
          </div>
        </TopNav>
      </div>

      <div className='bg-gray-100 '>
        <div className='w-[90%] md:w-[80%] m-inline flex flex-col mt-20 gap-10'>
          <h4 className='hidden sm:flex font-medium text-4xl text-transparent-bgclip'>Detalles de la entrega</h4>

          <form
            className='flex gap-28'
            onSubmit={handleSubmit((values) => {
              checkoutMutation({ ...values, productId: parseInt(id), amount: state.amount || 1, tax, totalWithTax });
              reset();
            })}
          >
            {!isDesktop && lastPageMobile ? (
              <div>
                <div
                  className='flex cursor-pointer gap-4 mb-10'
                  onClick={() => {
                    setLastPageMobile(false);
                  }}
                >
                  <img src={GoBackVector}></img>
                  <p className='font-medium'>Volver</p>
                </div>
                <SummaryCard
                  total={total}
                  deliveryFixCost={deliveryFixCost}
                  taxPercentage={taxPercentage}
                ></SummaryCard>
              </div>
            ) : (
              <div className='flex gap-28'>
                <DestinationDetails
                  register={register}
                  errors={errors}
                  onClick={() => {
                    setLastPageMobile(true);
                  }}
                  id={id}
                ></DestinationDetails>

                <div className='w-[40%] md:flex hidden'>
                  <SummaryCard
                    total={total}
                    deliveryFixCost={deliveryFixCost}
                    taxPercentage={taxPercentage}
                  ></SummaryCard>
                </div>
              </div>
            )}
          </form>
          <Footer></Footer>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
