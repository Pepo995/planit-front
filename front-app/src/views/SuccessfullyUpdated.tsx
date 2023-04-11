import React from 'react';
import TopNav from '../layouts/TopNav';
import SearchIcon from '../assets/svg/search_icon.svg';
import Vector from '../assets/svg/vector.svg';
import Footer from '../layouts/Footer';
import GoBackVector from '../assets/svg/go_back_vector_black.svg';
import { Link } from 'react-router-dom';

const SuccessfullyUpdated = () => {
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
      <div className='w-[80%] m-inline'>
        <Link to={'/personalInformation'}>
          <div className='flex cursor-pointer gap-4 '>
            <img src={GoBackVector}></img>
            <p className='font-medium'>Volver</p>
          </div>
        </Link>
        <h5 className='p-48 text-center font-normal text-4xl text-transparent-bgclip'>Usuario modificado con exito!</h5>
        <Footer></Footer>
      </div>
    </section>
  );
};

export default SuccessfullyUpdated;
