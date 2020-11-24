import React from 'react';

const Loading = () => {
  return (
    <div className='flex w-full justify-center h-screen  items-center'>
      <div class='lds-grid'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
