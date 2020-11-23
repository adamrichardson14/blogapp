import React from 'react';

const Footer = ({ title }) => {
  return (
    <div className='h-16 flex justify-center items-center bg-gray-900 text-white text-opacity-100 w-full'>
      <span className='text-sm'>Copyright 2020 &copy; {title}</span>
    </div>
  );
};

export default Footer;
