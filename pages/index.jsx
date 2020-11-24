import useSWR from 'swr';
import Link from 'next/link';
import { useUser } from '../utils/auth/useUser';

const Index = () => {
  return (
    <main className='pt-10 flex bg-gray-50 h-screen'>
      <header className='max-w-screen-lg xl:max-w-screen-xl mx-auto px-4'>
        <div className=' flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='160.3751'
            height='160.9153'
            className='h-20 w-20'
            viewBox='0 0 160.3751 160.9153'>
            <rect
              x='10'
              y='10'
              width='121.3574'
              height='121.3574'
              style={{
                fill: '#fff',
                stroke: '#111827',
                strokeMiterlimit: 10,
                strokeWidth: '20px',
              }}
            />
            <path
              d='M540.4355,437l-29.1,1.8237c-9.8586.6368-19.9182,1.21-30.0818,1.79-10.1756.5535-20.4724,1.0876-30.8554,1.5284-5.1872.2423-10.4.4307-15.6222.6165-5.2221.18-10.4561.3839-15.698.51l-6.0849.1465L412.8094,437c-.29-10.1131-.5679-20.2262-.7639-30.3393-.2465-10.1131-.3752-20.2262-.5372-30.3393-.1635-10.1131-.2086-20.2262-.3188-30.3393l-.109-30.3393-.0288-8.0232,8.0265.0255,30.3393.0962,30.3393.3134c10.1131.1687,20.2262.2847,30.3393.5342l15.17.3391,15.17.4242,6.44.18-.1491,6.1105c-.128,5.2424-.3234,10.4775-.5088,15.7-.19,5.2221-.372,10.4367-.6166,15.6244-.4432,10.3842-.9776,20.6821-1.5327,30.8587-.583,10.1639-1.159,20.2231-1.7981,30.0814Zm0,0-3.6323-62.1832c-.5551-10.05-1.0895-19.9779-1.5327-29.82-.2446-4.9254-.4264-9.8239-.6166-14.7149-.1855-4.8905-.3808-9.7685-.5088-14.6392l6.29,6.29-15.17.4242-15.17.3392c-10.1131.25-20.2262.3655-30.3393.5342l-30.3393.3133-30.3393.0963,7.9975-7.9975-.109,30.3393c-.11,10.1131-.1552,20.2262-.3188,30.3393-.1619,10.1131-.2906,20.2262-.5371,30.3393-.1961,10.1131-.4739,20.2262-.7639,30.3393l-6.2687-6.2687c4.8713.1262,9.75.33,14.6413.51,4.8912.1858,9.7913.3742,14.7172.6165,9.8433.4408,19.7727.9749,29.8233,1.5284Z'
              transform='translate(-386.5 -282.5)'
              style={{ fill: '#4b5563' }}
            />
          </svg>
          <span className='text-light-blue-500 ml-10 text-7xl font-semibold'>
            Zoeble
          </span>
        </div>
        <div className='mt-20'>
          <h1>Create a blog with us and get writing in under a minute</h1>
          <p className='font-medium mb-4 text-3xl mt-4'>
            Extremely simple to setup and use, built with the latest
            technologies to ensure your blog is exceptionally{' '}
            <span className='text-black font-bold font-mono'>fast,</span> SEO{' '}
            <span className='text-black font-bold font-mono'>optimised</span>{' '}
            and provides a{' '}
            <span className='text-black font-bold font-mono'>
              great experience
            </span>{' '}
            for your readers.
          </p>
          <div className='sm:text-lg sm:leading-snug font-semibold tracking-wide uppercase text-green-500 mb-3'></div>
          <Link href='/auth'>
            <button className='bg-light-blue-500 hover:bg-light-blue-700 text-white text-lg leading-6 font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-light-blue-500 focus:outline-none transition-colors duration-200'>
              Create Blog
            </button>
          </Link>
          <Link href='/auth'>
            <button className='ml-10 bg-gray-900 hover:bg-gray-700 text-white text-lg leading-6 font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200'>
              Sign in
            </button>
          </Link>
        </div>
      </header>
    </main>
  );
};

export default Index;
