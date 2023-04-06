import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TopNav from '../layouts/TopNav';
import SearchIcon from '../assets/svg/search_icon.svg';
import Vector from '../assets/svg/vector.svg';
import Footer from '../layouts/Footer';
import { TextInput2 } from '../components/TextInput';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from 'react-query';
import { getUserById, modifyUser } from '../api/usersApi';
import { useNavigate } from 'react-router-dom';

const updateValidationInterface = z.object({
  email: z.string().email('El email no es valido').nullable().optional(),
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
});
export type UpdateValidationInterface = z.infer<typeof updateValidationInterface>;

const PersonalInformation = () => {
  const token = localStorage.getItem('token');
  let id = '';
  if (token) {
    const [, payload] = token.split('.');
    const decodedToken = JSON.parse(atob(payload));
    id = decodedToken.id;
  }

  const { data } = useQuery(['params', id], () => getUserById(id));

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdateValidationInterface>({
    resolver: zodResolver(updateValidationInterface),
  });

  useEffect(() => {
    if (data) {
      setValue('email', data.email);
      setValue('firstName', data.firstName);
      setValue('lastName', data.lastName);
    }
  }, [data]);

  const navigate = useNavigate();

  const { mutate: updateMutation } = useMutation(
    'modifyUser',
    (updateData: UpdateValidationInterface) => modifyUser(updateData, id),
    {
      onSuccess: () => {
        console.log('User updated!');
        navigate('/SuccessfullyUpdated', { replace: true });
      },
    },
  );

  return (
    <section className='flex flex-col gap-16 h-full w-full'>
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
      <div className='bg-gray-100 '>
        <div className='w-[90%] md:w-[80%] m-inline flex flex-col'>
          <h3 className='text-xl sm:text-2xl md:text-4xl font-medium mt-14 sm:mt-16 md:mt-20'>Información personal</h3>
          <section className='md:bg-white mt-10 mb-20 md:p-32 flex'>
            <form
              className='w-full flex flex-col md:flex-row justify-between gap-14'
              onSubmit={handleSubmit((values) => {
                updateMutation(values);
                reset();
              })}
            >
              <div className='flex flex-col gap-10 md:w-[40%]'>
                <div className='flex flex-col gap-1'>
                  <label className='text-xs font-normal text-gray-500'>Email</label>
                  <TextInput2
                    register={register}
                    name='email'
                    error={!!errors.email}
                    errorMessage={errors.email?.message}
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label className='text-xs font-normal text-gray-500'>Nombre</label>
                  <TextInput2 register={register} name='firstName' />
                </div>

                <div className='flex flex-col gap-1'>
                  <label className='text-xs font-normal text-gray-500'>Apellido</label>
                  <TextInput2 register={register} name='lastName' />
                </div>
              </div>
              <div className='flex flex-col gap-2 text-blue-700'>
                <button className='bg-transparent' name='editInformation' type='submit'>
                  Editar información
                </button>
                <button
                  className='bg-transparent'
                  type='button'
                  onClick={() => {
                    navigate('/login', { replace: true });
                    localStorage.clear();
                  }}
                >
                  Cerrar cuenta
                </button>
              </div>
            </form>
          </section>
          <Footer></Footer>
        </div>
      </div>
    </section>
  );
};

export default PersonalInformation;
