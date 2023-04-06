import React from 'react';
import LogoColor from '../assets/svg/logo_and_letters.svg';
import BellIcon from '../assets/svg/bell-icon.svg';
import { Link } from 'react-router-dom';
import { getUserById } from '../api/usersApi';
import { useQuery } from 'react-query';
import DropDown from '../assets/svg/drop_down.svg';

interface NavProps {
  children: React.ReactNode;
}

const TopNav = ({ children }: NavProps) => {
  const token = localStorage.getItem('token');
  let id = '';
  if (token) {
    const [, payload] = token.split('.');
    const decodedToken = JSON.parse(atob(payload));
    id = decodedToken.id;
  }

  const { data } = useQuery(['params', id], () => getUserById(id));

  return (
    <nav className='w-[80%] m-inline mb-[0.2rem]'>
      <div className=' flex flex-col gap-4 justify-between mt-10'>
        <div className='md:hidden flex justify-between'>
          <img src={LogoColor} className='w-24 h-9'></img>
          <label className='h-[30px] cursor-pointer flex items-center justify-center'>
            <span className='block w-[45px] position-relative '>
              <hr className='border-[1px] border-black'></hr>
              <hr className='border-[1px] mt-3 border-black'></hr>
              <hr className='border-[1px] mt-3 border-black'></hr>
            </span>
          </label>
        </div>
        <div className='hidden md:flex gap-6 items-center text-transparent-bgclip justify-center'>
          <Link to='/products' className=''>
            Regalos
          </Link>
          <Link to='/catering' className=''>
            Catering
          </Link>
          <Link to='/merchandising' className=''>
            Merchandising
          </Link>
          <Link to='/eventos' className=''>
            Eventos
          </Link>
        </div>
        <div className='flex justify-between items-center'>
          <img src={LogoColor} className='hidden md:flex w-24 h-9'></img>
          <div className='flex relative w-full md:w-[500px] h-9'>{children}</div>
          <div className='flex gap-5 items-center'>
            <div className='hidden md:flex gap-4'>
              <img src={BellIcon} className='w-8 h-6'></img>
            </div>
            <Link to='/personalInformation'>
              <div className='hidden md:flex flex-col'>
                <div className=' flex gap-2 font-medium text-lg'>
                  <p>{data?.firstName}</p>
                  <p>{data?.lastName}</p>
                </div>
                <div className='flex gap-1 items-center'>
                  <p className='font-normal text-base text-gray-400'>{data?.position}</p>
                  <div className='flex items-center gap-1'>
                    <img src={DropDown} className='w-3 h-3'></img>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
