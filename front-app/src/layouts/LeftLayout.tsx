import React from 'react';
import plan_it_logo from '../assets/svg/planit_logo.svg';
import point from '../assets/svg/point.svg';
import logo_p from '../assets/svg/logo_p.svg';
import macbook from '../assets/img/macbook.png';
import bg_blue from '../assets/img/image2.png';
import logo_color from '../assets/svg/logo_and_letters.svg';
import fb_logo from '../assets/svg/fb_gray.svg';
import linkedin_logo from '../assets/svg/linkedin_gray.svg';
import twitter_logo from '../assets/svg/twitter_gray.svg';
import ig_logo from '../assets/svg/ig_gray.svg';

interface LeftLayoutProps {
  children: React.ReactNode;
}

const LeftLayout = (props: LeftLayoutProps) => {
  return (
    <section className='flex gap-16 h-full w-full'>
      <div className='hidden sm:flex flex-col w-1/2 bg-linear-gradient-primary text-white gap-16'>
        <div className='flex h-3/5 flex-col justify-center w-4/5 m-auto gap-16 mt-14'>
          <div className='flex items-center gap-4'>
            <img src={plan_it_logo}></img>
          </div>
          <div className='flex flex-col gap-10 text-left'>
            <h3 className='font-semibold text-3xl w-3/4 lg:text-5xl'>
              Comienza a simplificar tus acciones, <span className='text-dark-blue'>aquí.</span>{' '}
            </h3>
            <h6 className='font-normal text-md lg:text-xl w-4/5'>
              En nuestra plataforma web vas a encontrar todo lo que estás buscando.
            </h6>
          </div>
        </div>
        <img src={macbook} className='h-[200px] w-[300px] md:h-[250px] md:w-[400px] lg:h-[335px] lg:w-[500px]'></img>
      </div>
      <div className='flex flex-col sm:w-1/2  relative sm:static'>
        <div className='sm:hidden relative'>
          <div className='relative w-full'>
            <img src={bg_blue} className='object-contain'></img>
          </div>
          <nav className='w-full absolute top-[15%] flex justify-between'>
            <div className='flex items-center gap-4'>
              <img src={plan_it_logo} className='w-[150px] h-[40px]'></img>
            </div>
            <label className='w-[150px] h-[30px] cursor-pointer flex items-center justify-center'>
              <span className='block w-[45px] position-relative'>
                <hr className='border-[1px]'></hr>
                <hr className='border-[1px] mt-3'></hr>
                <hr className='border-[1px] mt-3'></hr>
              </span>
            </label>
          </nav>
        </div>
        {props.children}
        <div className='hidden sm:flex items-center gap-5 absolute bottom-6 right-10'>
          <button type='button' className='text-sm lg:text-base w-52 h-8  bg-dark-blue rounded-xl'>
            <div className='flex gap-3 justify-center items-center'>
              <img src={point}></img>
              <p className='text-white text-base font-normal'>¿Necesitás ayuda?</p>
            </div>
          </button>
          <div className='flex items-center justify-center w-10 h-10 lg:w-20 lg:h-20 rounded-xl bg-white'>
            <img src={logo_p}></img>
          </div>
        </div>
        <div className='sm:hidden flex flex-col m-inline w-[90%] mt-40  gap-10 bottom-6 right-10'>
          <div className='flex gap-3 items-center'>
            <img src={logo_color}></img>
          </div>
          <div className='flex flex-col gap-2 text-xs font-normal text-gray-400 mb-4'>
            <div className='flex justify-between '>
              <p>info@planit.com.uy </p>
              <p>Tel: +598 96593615</p>
            </div>
            <hr className='border-[1px]'></hr>
            <div className='flex justify-between '>
              <p>PlanIT, 2021 - All rights reserved</p>
              <div className='flex gap-4'>
                <img src={fb_logo}></img>
                <img src={linkedin_logo}></img>
                <img src={twitter_logo}></img>
                <img src={ig_logo}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeftLayout;
