import useSWR from 'swr';
import Link from 'next/link';
import { useUser } from '../utils/auth/useUser';
import Header from '../components/DashHeader';
import { IoMdAddCircleOutline } from 'react-icons/io';
import SiteInfoDetail from '../components/account/SiteInfoDetail';
import { toast, ToastContainer } from 'react-toastify';

const fetcher = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json());

const Index = () => {
  const { user, logout } = useUser();

  const { data, error } = useSWR(
    user ? ['/api/getSite', user.token] : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  if (!user) {
    return (
      <>
        <p>Hi there!</p>
        <p>
          You are not signed in.
          <Link href={'/auth'}>
            <a>Sign in</a>
          </Link>
        </p>
      </>
    );
  }

  return (
    <>
      <Header />

      {error && (
        <div className='max-w-6xl mx-auto w-10/12 mt-10'>
          <h1 className=''>Create your site in a few seconds</h1>
          <p className='max-w-screen-lg text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11'>
            Get ready to have an awesome blogging experience.{' '}
            <span className='font-mono text-gray-900 font-bold'>
              Focus on your writing
            </span>
            and let us worry about everything else. Simple Markdown editor.
          </p>
          <Link href='/createsite'>
            <button className='w-full sm:w-auto flex-none bg-gray-900 hover:bg-gray-700 text-white text-lg font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200'>
              Create Site
            </button>
          </Link>
        </div>
      )}
      {data && !error ? (
        // Main content goes here...
        <main className='max-w-5xl mt-5 mx-auto'>
          <div className='mx-auto w-10/12'>
            <h1>{data.title}</h1>
          </div>

          <div className='mx-auto w-10/12 bg-gray-50 border border-gray-200 rounded-xl shadow p-4'>
            <h2>Blog details</h2>
            <SiteInfoDetail title='Title:' data={data.title}></SiteInfoDetail>
            <SiteInfoDetail
              title='Description:'
              data={data.description}></SiteInfoDetail>
            <SiteInfoDetail
              title='Twitter:'
              data={data.twitter}></SiteInfoDetail>
            <SiteInfoDetail
              title='Website:'
              data={data.website}></SiteInfoDetail>
            <SiteInfoDetail title='Blog URL:' data={data.url}></SiteInfoDetail>
          </div>
        </main>
      ) : (
        // Loading goes here.....
        <div>Loading...</div>
      )}
    </>
  );
};

export default Index;
