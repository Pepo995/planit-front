import React, { useState, useEffect } from 'react';
import LogoLinkedinGray from '../assets/svg/logo_linkedin_gray.svg';
import LogoIgGray from '../assets/svg/logo_ig_gray.svg';
import LogoFbGray from '../assets/svg/logo_fb_gray.svg';
import LogoTwGray from '../assets/svg/logo_tw_gray.svg';
import LogoEager from '../assets/svg/eager_logo.svg';
import LogoColor from '../assets/svg/logo_and_letters.svg';

const Footer = () => {
  return (
    <div className='w-full m-inline'>
      <div className='hidden md:flex flex-col mt-5 w-full m-inline text-gray-400  gap-0-5 mb-1-5'>
        <hr className='border-t-line4'></hr>
        <div className='flex justify-between items-center text-base font-light'>
          <p>Copyright ©2021</p>
          <div className='flex items-center gap-2'>
            <p>Powered by</p>
            <img src={LogoEager} alt='logo' className='w-28 h-5'></img>
          </div>
          <div className='flex gap-2'>
            <img src={LogoLinkedinGray} alt='logo' className='w-6 h-8'></img>
            <img src={LogoIgGray} alt='logo' className='w-6 h-8'></img>
          </div>
        </div>
      </div>
      <div className='md:hidden flex flex-col mt-5 mb-8'>
        <img src={LogoColor} className='w-24 h-9 mb-8'></img>
        <div className='flex flex-col  w-full m-inline text-gray-400 text-sm font-normal gap-2 '>
          <div className='flex justify-between'>
            <p>info@planit.com.uy </p>
            <p>Tel: +598 96593615 </p>
          </div>
          <hr className='border-t-line4'></hr>
          <div className='flex justify-between items-center'>
            <p>PlanIT, 2021 - All rights reserved</p>
            <div className='flex gap-5'>
              <img src={LogoFbGray} alt='logo' className='w-2 h-4'></img>
              <img src={LogoLinkedinGray} alt='logo' className='w-4 h-4'></img>
              <img src={LogoTwGray} alt='logo' className='w-4 h-4'></img>
              <img src={LogoIgGray} alt='logo' className='w-4 h-4'></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
