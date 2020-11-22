import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '../utils/auth/useUser';

const MdHeaderLink = ({ text, href, router }) => (
  <a
    href={href}
    className={`px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-900 ${
      router.pathname === href ? 'bg-gray-900' : 'bg-black'
    }`}>
    {text}
  </a>
);

const MobileHeaderLink = ({ text, href, router }) => (
  <a
    href={href}
    className={`block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-900 ${
      router.pathname === href ? 'bg-gray-900' : 'bg-black'
    }`}>
    {text}
  </a>
);

const Header = ({ url }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { logout } = useUser();
  return (
    <>
      <Head>
        <title>Zoeble</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <nav className='bg-black'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center justify-between w-full'>
              <div className='flex-shrink-0'>
                <Link href='/'>
                  <a className='text-gray-200 text-xl font-semibold'>Zoeble</a>
                </Link>
              </div>
              <div className='hidden md:block'>
                <div className='ml-10 flex items-baseline space-x-4'>
                  <MdHeaderLink
                    text='Dashboard'
                    href='/dashboard'
                    router={router}
                  />

                  <MdHeaderLink
                    text='My Account'
                    href='/account'
                    router={router}
                  />
                  <button
                    className='text-xs text-gray-50 bg-gray-800 rounded-lg px-3 py-1 hover:bg-gray-900'
                    onClick={() => {
                      logout();
                    }}>
                    Logout
                  </button>
                </div>
              </div>
            </div>

            <div className='-mr-2 flex md:hidden'>
              {/* <!-- Mobile menu button --> */}
              <button
                onClick={() => {
                  setOpen(!open);
                }}
                aria-label='Menu toggle button'
                aria-expanded={`${open ? 'true' : 'false'}`}
                className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white'>
                {/* <!-- Menu open: "hidden", Menu closed: "block" --> */}
                <svg
                  className={`${!open ? 'block' : 'hidden'} h-6 w-6`}
                  stroke='currentColor'
                  fill='none'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
                {/* <!-- Menu open: "block", Menu closed: "hidden" --> */}
                <svg
                  className={`${!open ? 'hidden' : 'block'} h-6 w-6`}
                  stroke='currentColor'
                  fill='none'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* <!--
      Mobile menu, toggle classNamees based on menu state.

      Open: "block", closed: "hidden"
    --> */}
        <div className={`${!open ? 'hidden' : 'block'}`}>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            <MobileHeaderLink
              text='Dashboard'
              href='/dashboard'
              router={router}
            />

            <MobileHeaderLink
              text='My Account'
              href='/account'
              router={router}
            />
            <button
              className='text-sm text-gray-50 bg-gray-800 rounded-lg px-3 py-1 hover:bg-gray-900 ml-3'
              onClick={() => {
                logout();
              }}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
