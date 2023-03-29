import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import LeftLayout from '../layouts/LeftLayout';
import TextInput from '../components/TextInput';
import { useMutation } from 'react-query';
import { login } from '../api/usersApi';
import { Button } from '../components/Button';
import HelpComponent from '../components/HelpComponent';

const loginValidationSchema = z.object({
  email: z.string().email('El email no es valido'),
  password: z
    .string()
    .min(8, 'La contrasena debe tener al menos 8 caracteres')
    .max(20, 'La contrasena debe tener maximo 20 caracteres'),
});

export type LoginValidationInterface = z.infer<typeof loginValidationSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginValidationInterface>({
    resolver: zodResolver(loginValidationSchema),
  });

  const navigate = useNavigate();

  const { mutate: loginMutation, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.data.token);
      navigate('/products', { replace: true });
    },
  });
  return (
    <LeftLayout>
      <div className='w-[90%] sm:w-[77%] m-inline flex flex-col gap-8 lg:gap-16'>
        <div className='flex flex-col mt-10 sm:mt-28 text-left gap-6 lg-gap-9'>
          <h4 className='font-semibold sm:font-medium text-4xl sm:text-3xl lg:text-4xl'>¡Hola, otra vez!</h4>
          <p className='text-lg sm:text-sm lg:text-lg font-medium sm:font-normal'>
            Por favor, confirma tu información para ingresar a Plan IT.
          </p>
        </div>

        <form
          className='flex flex-col gap-6 lg:gap-8 '
          onSubmit={handleSubmit((values) => {
            loginMutation(values);
            reset();
          })}
        >
          <TextInput
            register={register}
            placeholder='Email'
            name='email'
            error={!!errors.email}
            errorMessage={errors.email?.message}
          />
          <TextInput
            register={register}
            placeholder='Contraseña'
            name='password'
            hidden
            error={!!errors.password}
            errorMessage={errors.password?.message}
          />
          <div className='flex text-left gap-4'>
            <input type='checkbox' id='informacion'></input>
            <label className='font-normal text-base sm:text-sm lg:text-base' id='informacion'>
              Recordar mi información
            </label>
          </div>
          <Button loading={isLoading} text='Loading...'>
            iniciar sesion
          </Button>
        </form>
        <div className='text-sm lg:text-base flex flex-col gap-4'>
          <div className='flex flex-col text-center gap-2'>
            <p className=' text-gray-400'>¿No tienes una cuenta aún?</p>
            <Link to='/register' className='text-dark-blue'>
              ¡Regístrate aquí!
            </Link>
          </div>
        </div>
      </div>
      <HelpComponent></HelpComponent>
    </LeftLayout>
  );
};

export default Login;
