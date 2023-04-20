import React from 'react';

import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { getAuthenticatedUser } from '../api/usersApi';
import BellIcon from '../assets/svg/bell-icon.svg';
import DropDown from '../assets/svg/drop_down.svg';
import LogoColor from '../assets/svg/logo_and_letters.svg';
import SearchIcon from '../assets/svg/search_icon.svg';
import Vector from '../assets/svg/vector.svg';

interface NavProps {
  textValue: string;
  onChange: (event: any) => void;
  onClick: () => void;
}

const TopNav = ({ textValue, onChange, onClick }: NavProps) => {
  const { data: userData } = useQuery(['userParams'], () => getAuthenticatedUser());

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
          <div className='flex relative w-full md:w-[500px] h-9'>
            <input
              type='text'
              value={textValue}
              onChange={onChange}
              className='bg-gray-100 px-12 md:px-6 h-full rounded-3xl w-full border-radius border-solid border-black'
            ></input>
            <button
              onClick={onClick}
              className='absolute bg-[#9BC7FF] rounded-full w-8 h-8 right-[93%] md:right-[1%] translate-y-[7%]'
            >
              <img src={SearchIcon} className='w-20 h-4'></img>
            </button>
            <div className='flex md:hidden'>
              <img src={Vector} className='w-8 h-8 absolute right-[1%] translate-y-[7%]'></img>
            </div>
          </div>
          <div className='flex gap-5 items-center'>
            <div className='hidden md:flex gap-4'>
              <img src={BellIcon} className='w-8 h-6'></img>
            </div>
            <div className='hidden md:flex flex-col'>
              <div className=' flex gap-2 font-medium text-lg'>
                <p>{userData?.firstName}</p>
                <p>{userData?.lastName}</p>
              </div>
              <div className='flex gap-1 items-center'>
                <p className='font-normal text-base text-gray-400'>{userData?.position}</p>
                <div className='flex items-center gap-1'>
                  <img src={DropDown} className='w-3 h-3'></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
