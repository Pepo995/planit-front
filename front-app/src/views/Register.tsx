import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextInput from '../components/TextInput';
import LeftLayout from '../layouts/LeftLayout';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from 'react-query';
import { createUser } from '../api/usersApi';
import { Button } from '../components/Button';
import HelpComponent from '../components/HelpComponent';

const registerValidationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email('El email no es valido'),
  password: z
    .string()
    .min(8, 'La contrasena debe tener al menos 8 caracteres')
    .max(20, 'La contrasena debe tener maximo 20 caracteres'),
  company: z.string(),
  profileImage: z.string(),
  position: z.string(),
});
export type RegisterValidationInterface = z.infer<typeof registerValidationSchema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterValidationInterface>({
    resolver: zodResolver(registerValidationSchema),
  });

  const { mutate: registerMutation, isLoading } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      console.log('User created!');
    },
  });

  const navigate = useNavigate();

  return (
    <LeftLayout>
      <div className='w-[90%] sm:w-[77%] m-inline mt-24 flex flex-col gap-5'>
        <h4 className='font-semibold sm:font-medium text-4xl sm:text-3xl lg:text-4xl'>¡Bienvenido a Plan IT!</h4>
        <p className='font-medium sm:font-normal text-lg sm:text-sm lg:text-lg'>
          Por favor, complete su información personal para crear un usuario propio.
        </p>
        <div className='flex font-medium sm:font-normal text-sm lg:text-base text-gray-500'>
          <p>¿Ya tenés una cuenta?</p>
          <Link to='/login' className='text-dark-blue'>
            Inicia sesión aquí.
          </Link>
        </div>
        <form
          className='flex flex-col gap-4 '
          onSubmit={handleSubmit((values) => {
            registerMutation(values);
            reset();
            navigate('/login', { replace: true });
          })}
        >
          <TextInput register={register} placeholder='Nombre' name='firstName' />

          <TextInput register={register} placeholder='Apellido' name='lastName' />

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
          <TextInput register={register} placeholder='Nombre de su empresa' name='company' />

          <TextInput register={register} placeholder='Imagen de perfil' name='profileImage' />

          <TextInput register={register} placeholder='Puesto en empresa' name='position' />
          <Button loading={isLoading} text='Loading...'>
            registrarse
          </Button>
        </form>
      </div>
      <HelpComponent></HelpComponent>
    </LeftLayout>
  );
};

export default Register;
