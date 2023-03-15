import { Link } from "react-router-dom";
import TextInput from "../components/TextInput";
import LeftLayout from "../layouts/LeftLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const registerValidationSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string().email("El email no es valido"),
  password: z
    .string()
    .min(8, "La contrasena debe tener al menos 8 caracteres")
    .max(20, "La contrasena debe tener maximo 20 caracteres"),
  company: z.string(),
});

type RegisterValidationInterface = z.infer<typeof registerValidationSchema>;

const Register = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValidationInterface>({
    resolver: zodResolver(registerValidationSchema),
  });

  return (
    <LeftLayout>
      <div className="px-[6.0rem] mt-24 flex flex-col w-full gap-5">
        <h4 className="font-medium text-4xl">¡Bienvenido a Plan IT!</h4>
        <p className="font-normal text-lg">
          Por favor, complete su información personal para crear un usuario
          propio.
        </p>
        <div className="flex font-normal text-base text-gray-500">
          <p>¿Ya tenés una cuenta?</p>
          <Link to="/login" className="text-dark-blue">
            Inicia sesión aquí.
          </Link>
        </div>
        <form
          className="flex flex-col gap-2 "
          onSubmit={handleSubmit((values) => {
            console.log(values); //call the register endpoint
          })}
        >
          <TextInput
            register={register}
            placeholder="Nombre"
            name="name"
            hidden
            error={!!errors.password}
            errorMessage={errors.password?.message}
          />
          <TextInput
            register={register}
            placeholder="Apellido"
            name="surname"
            hidden
            error={!!errors.password}
            errorMessage={errors.password?.message}
          />
          <TextInput
            register={register}
            placeholder="Email"
            name="email"
            hidden
            error={!!errors.password}
            errorMessage={errors.password?.message}
          />
          <TextInput
            register={register}
            placeholder="Contraseña"
            name="password"
            hidden
            error={!!errors.password}
            errorMessage={errors.password?.message}
          />
          <TextInput
            register={register}
            placeholder="Nombre de su empresa"
            name="company"
            hidden
            error={!!errors.password}
            errorMessage={errors.password?.message}
          />
          <button
            type="submit"
            className="mt-8 h-9 w-full uppercase bg-linear-gradient-primary font-medium text-base text-white bg-transparent rounded-md"
          >
            iniciar sesion
          </button>
        </form>
      </div>
    </LeftLayout>
  );
};

export default Register;
