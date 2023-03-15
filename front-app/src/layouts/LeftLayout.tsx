import plan_it_logo from "../assets/svg/planit_logo.svg";
import point from "../assets/svg/point.svg";
import logo_p from "../assets/svg/logo_p.svg";

interface LeftLayoutProps {
  children: React.ReactNode;
}

const LeftLayout = (props: LeftLayoutProps) => {
  return (
    <section className="flex gap-16 h-full w-full relative">
      <div className="w-1/2 bg-linear-gradient-primary flex flex-col text-white gap-28">
        <div className="flex h-3/5 flex-col justify-center w-4/5 m-auto gap-16 mt-12">
          <div className="flex items-center gap-4">
            <img src={plan_it_logo}></img>
          </div>
          <div className="flex flex-col gap-10 text-left">
            <h3 className="font-semibold text-5xl w-3/4">
              Comienza a simplificar tus acciones,{" "}
              <span className="text-dark-blue">aquí.</span>{" "}
            </h3>
            <h6 className="font-normal text-xl w-4/5">
              En nuestra plataforma web vas a encontrar todo lo que estás
              buscando.
            </h6>
          </div>
        </div>
        <div className="bg-black w-3/4 h-[270px]">
          <p>hola</p>
        </div>
      </div>
      <div className="w-1/2 flex flex-col gap-16">
        {props.children}
        <div className="flex items-center gap-5 absolute top-90 right-[5%]">
          <button type="button" className="w-52 h-8 bg-dark-blue rounded-xl">
            <div className="flex gap-3 justify-center items-center">
              <img src={point}></img>
              <p className="text-white text-base font-normal">
                ¿Necesitás ayuda?
              </p>
            </div>
          </button>
          <div className=" flex items-center justify-center w-20 h-20 rounded-xl bg-white">
            <img src={logo_p}></img>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeftLayout;
