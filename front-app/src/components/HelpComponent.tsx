import React from 'react';

import LogoPlanIt from '../assets/svg/logo_p.svg';
import PointIcon from '../assets/svg/point.svg';

const HelpComponent = () => {
  return (
    <div className='hidden md:flex items-center gap-5 absolute bottom-6 right-10'>
      <button type='button' className='text-sm lg:text-base w-52 h-8  bg-dark-blue rounded-xl'>
        <div className='flex gap-3 justify-center items-center'>
          <img src={PointIcon}></img>
          <p className='text-white text-base font-normal'>¿Necesitás ayuda?</p>
        </div>
      </button>
      <div className='flex items-center justify-center w-20 h-20 rounded-xl bg-white'>
        <img src={LogoPlanIt}></img>
      </div>
    </div>
  );
};

export default HelpComponent;
