import Link from 'next/link';
import React from 'react';

const Sidebar = ({ show, setEditorTheme, editorTheme }) => {
  return (
    <div
      className={`bg-gray-50 absolute top-0 right-0 border-l border-gray-200  ${
        show ? 'block' : 'hidden'
      }`}>
      <div className='flex flex-col sm:flex-row sm:justify-around '>
        <div className='w-96 h-screen bg-gray-50'>
          <div className='w-11/12 mx-auto max-w-7xl mt-4 '>
            <form>
              <label className='text-lg font-semibold mt-5' htmlFor='text'>
                Title
                <input
                  className='form-input block w-full mt-1 bg-gray-50 border-gray-300 border rounded-lg'
                  type='text'
                  name='title'
                  id='title'
                  placeholder='Enter the title of your blog post here'
                />
              </label>
              <label className='text-lg font-semibold mt-1' htmlFor='text'>
                Post URL
                <input
                  className='form-input block w-full mt-1 bg-gray-50 border-gray-300 border rounded-lg'
                  type='text'
                  name='url'
                  id='title'
                  placeholder='Must be lowercase, no spaces'
                />
              </label>
              <label className='text-lg font-semibold mt-1'>
                Choose A Category
                <select
                  name='category'
                  className='form-select mt-1 block w-full border-gray-300 border rounded-lg'>
                  <option>Tech</option>
                  <option>Coding</option>
                  <option>Javascript</option>
                  <option>Python</option>
                </select>
              </label>
              <label className='block text-lg font-semibold mt-1'>
                <span>Custom Excerpt</span>
                <textarea
                  name='excerpt'
                  type='email'
                  className='form-input mt-1 block w-full border border-gray-300 rounded-lg'
                  rows='4'
                  placeholder='john@example.com'
                />
              </label>
            </form>
          </div>

          <nav className='mt-10'>
            <a
              className='flex items-center py-2 px-8 bg-gray-200 text-gray-700 border-l-4 border-gray-700'
              href='#'>
              <svg
                className='h-5 w-5'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>

              <Link href='/dashboard'>
                <span className='mx-4 font-medium'>Dashboard</span>
              </Link>
            </a>
            <a
              className='flex items-center py-2 px-8 bg-gray-50 text-gray-700 border-gray-700'
              href='#'>
              <svg
                className='h-5 w-5'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>

              <button
                onClick={() => {
                  setEditorTheme(!editorTheme);
                }}>
                <span className='mx-4 font-medium'>Toggle Dark/Light</span>
              </button>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
