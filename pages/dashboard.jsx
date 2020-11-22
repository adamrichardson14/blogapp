import useSWR from 'swr';
import Link from 'next/link';
import { useUser } from '../utils/auth/useUser';
import Header from '../components/DashHeader';
import { IoMdAddCircleOutline } from 'react-icons/io';
import Image from 'next/image';
import firebase from 'firebase/app';
import { TimeStamp } from 'firebase';
import { FiArrowRightCircle, FiEdit } from 'react-icons/fi';

const fetcher = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json());

const Index = () => {
  const { user, logout } = useUser();

  const { data: siteData, siteError } = useSWR(
    () => (user ? ['/api/getSite', user.token] : null),
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const { data: postData, postError } = useSWR(
    () => (user ? ['/api/getallpostsauth', user.token] : null),
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  console.log(siteData);
  console.log(postData);

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

      {siteError && (
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
      {siteData && !siteError ? (
        // Main content goes here...
        <main className='max-w-5xl mt-5 mx-auto'>
          <div className='w-11/12 mx-auto'>
            {!postData && !siteError ? (
              <div>
                <h4>You have no posts yet. Create your first post.</h4>
                <Link href='/newpost'>
                  <button className='w-full sm:w-auto flex-none bg-gray-900 hover:bg-gray-700 text-white text-lg font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200'>
                    Create Post
                  </button>
                </Link>
              </div>
            ) : (
              <>
                <div>
                  <h2>Posts</h2>
                </div>
                <div>
                  <div>
                    {postData &&
                      postData.map((post) => {
                        return (
                          <div
                            key={post.url}
                            className={`grid grid-cols-12 mt-4 rounded-xl ${
                              post.publish ? 'bg-green-50' : 'bg-red-50'
                            } `}>
                            <div className='col-span-3 mr-5 relative'>
                              <Image
                                src={post.imageUrl}
                                className='object-cover rounded-tl-xl rounded-bl-xl shadow'
                                height={170}
                                width={170}
                                layout='responsive'></Image>
                              <div
                                className={`${
                                  post.publish ? 'hidden' : 'block'
                                } `}>
                                <span className='absolute top-0 left-0 bg-red-500 rounded-tl-xl text-red-50 rounded-br-xl px-2 py-1'>
                                  DRAFT
                                </span>
                              </div>
                            </div>

                            <div className='col-span-9 flex justify-center flex-col'>
                              <h5>{post.title}</h5>
                              <div className='flex -mt-2'>
                                <span className=' text-light-blue-500 text-md'>
                                  <span className='text-gray-700'>
                                    Published:{' '}
                                  </span>
                                  {new Date(post.date).toDateString()}
                                </span>
                                <span className=' text-gray-500 ml-4'>
                                  <span className='text-gray-700'>
                                    Category:{' '}
                                  </span>{' '}
                                  {post.category}
                                </span>
                              </div>

                              <p className='text-md'>{post.excerpt}</p>
                              <div className='-mt-2'>
                                <Link
                                  href={{
                                    pathname: '/editpost/[id]',
                                    query: { id: post.id },
                                  }}>
                                  <button className='w-20  uppercase text-gray-500 font-bold text-lg hover:text-gray-700'>
                                    Edit
                                  </button>
                                </Link>
                                <button className='w-20 uppercase ml-4 text-gray-500 font-bold hover:text-gray-700 text-lg'>
                                  View
                                </button>
                                <button className='w-20 uppercase ml-4 text-gray-500 font-bold hover:text-gray-700 text-lg'>
                                  {post.publish ? 'UnPublish' : 'Publish'}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className='absolute right-10 bottom-10 z-50 flex flex-row justify-end items-end'>
            <Link href='newpost'>
              <button>
                <IoMdAddCircleOutline className='text-7xl hover:text-black text-gray-900 ' />
              </button>
            </Link>
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
