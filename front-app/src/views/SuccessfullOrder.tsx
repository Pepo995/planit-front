import React from 'react';
import TopNav from '../layouts/TopNav';
import SearchIcon from '../assets/svg/search_icon.svg';
import Vector from '../assets/svg/vector.svg';
import LogoPlanIt from '../assets/svg/logo_planit_big.svg';
import Footer from '../layouts/Footer';
import { Link } from 'react-router-dom';

const SuccessfullOrder = () => {
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
      <div className='bg-gray-100'>
        <div className='w-[80%] m-inline '>
          <div className='flex flex-col items-center py-24'>
            <div>
              <img className='text-center' src={LogoPlanIt}></img>
            </div>
            <h4 className='font-medium text-4xl text-transparent-bgclip'>Pedido realizado</h4>
            <p className='font-normal text-sm sm:text-lg mt-8 sm:w-[40%] w-[70%] text-center'>
              Te enviaremos una notificación una vez que el servicio esté confirmado.
            </p>
            <Link to={'/products'}>
              <button
                type='button'
                className='text-gray-500 sm:text-black text-sm h-[70%] bg-transparent sm:border-black border-gray-600 border-[1px] sm:font-medium rounded px-10 py-1 whitespace-nowrap uppercase mt-12'
              >
                volver al inicio
              </button>
            </Link>
          </div>
          <Footer></Footer>
        </div>
      </div>
    </section>
  );
};

export default SuccessfullOrder;
