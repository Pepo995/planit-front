import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import LeftLayout from "../layouts/LeftLayout";
import TextInput from "../components/TextInput";

const loginValidationSchema = z.object({
  email: z.string().email("El email no es valido"),
  password: z
    .string()
    .min(8, "La contrasena debe tener al menos 8 caracteres")
    .max(20, "La contrasena debe tener maximo 20 caracteres"),
});

type LoginValidationInterface = z.infer<typeof loginValidationSchema>;

const Login = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValidationInterface>({
    resolver: zodResolver(loginValidationSchema),
  });
  return (
    <LeftLayout>
      <div className="px-[5.0rem] flex flex-col gap-16">
        <div className="flex flex-col mt-32 text-left gap-9">
          <h4 className="font-medium text-4xl">¡Hola, otra vez!</h4>
          <p className="text-lg font-normal">
            Por favor, confirma tu información para ingresar a Plan IT.
          </p>
        </div>
        <form
          className="flex flex-col gap-8 "
          onSubmit={handleSubmit((values) => {
            console.log(values); //call the register endpoint
          })}
        >
          <TextInput
            register={register}
            placeholder="Email"
            name="email"
            error={!!errors.email}
            errorMessage={errors.email?.message}
          />

          <TextInput
            register={register}
            placeholder="Contraseña"
            name="password"
            hidden
            error={!!errors.password}
            errorMessage={errors.password?.message}
          />

          <div className="flex text-left gap-4">
            <input type="checkbox" id="informacion"></input>
            <label className="font-normal text-base" id="informacion">
              Recordar mi información
            </label>
          </div>
          <button
            type="submit"
            className="h-9 w-full uppercase bg-linear-gradient-primary font-medium text-base text-white bg-transparent rounded-md"
          >
            iniciar sesion
          </button>
        </form>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col text-center gap-2">
            <p className="text-base text-gray-400">
              ¿No tienes una cuenta aún?
            </p>
            <Link to="/register" className="text-dark-blue">
              ¡Regístrate aquí!
            </Link>
          </div>
        </div>
      </div>
    </LeftLayout>
  );
};

export default Login;
