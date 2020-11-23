import React from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { useUser } from '../utils/auth/useUser';
import Header from '../components/DashHeader';
import { IoMdAddCircleOutline } from 'react-icons/io';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';

const fetcher = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json());

const Index = () => {
  const { user } = useUser();

  const { data: postData, postError, mutate } = useSWR(
    user ? ['/api/getallpostsauth', user.token] : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const notify = (type, text, options) => toast[type](text, options);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/deletesinglepost?id=${id}`,
        {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            token: user.token,
          }),
        }
      );
      const msg = await res.json();
      console.log(msg);
      mutate();
      notify('success', 'Post successfully deleted', {
        position: 'bottom-center',
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handlePublishChange = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/publishtoggle?id=${id}`,
        {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            token: user.token,
          }),
        }
      );
      const msg = await res.json();
      console.log(msg);
      mutate();
      notify(
        'success',
        msg.status
          ? 'Successfully published your post'
          : 'Successfully unpublished your post',
        {
          position: 'bottom-center',
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (!postData) return <h1>loading</h1>;
  if (postError) return <h1>You don't have any posts yet, create one now</h1>;

  return (
    <React.Fragment>
      <Header />
      <main className='max-w-5xl mt-5 mx-auto'>
        <div className='w-11/12 mx-auto'>
          {!postData ? (
            <div>
              <h4>You have no posts yet. Create your first post.</h4>
              <Link href='/newpost'>
                <button className='w-full sm:w-auto flex-none bg-gray-900 hover:bg-gray-700 text-white text-lg font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200'>
                  Create Post
                </button>
              </Link>
            </div>
          ) : (
            <div>
              <div>
                <h2>Posts</h2>
              </div>
              <div>
                <div>
                  {postData.map((post) => {
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
                            className={`${post.publish ? 'hidden' : 'block'} `}>
                            <span className='absolute top-0 left-0 bg-red-500 rounded-tl-xl text-red-50 rounded-br-xl px-2 py-1'>
                              DRAFT
                            </span>
                          </div>
                        </div>

                        <div className='col-span-9 flex justify-center flex-col'>
                          <h5>{post.title}</h5>
                          <div className='flex -mt-2'>
                            <span className=' text-light-blue-500 text-md'>
                              <span className='text-gray-700'>Published: </span>
                              {new Date(post.date).toDateString()}
                            </span>
                            <span className=' text-gray-500 ml-4'>
                              <span className='text-gray-700'>Category: </span>{' '}
                              {post.category}
                            </span>
                          </div>

                          <p className='text-md'>{post.excerpt}</p>
                          <div className='-mt-2 flex space-x-5'>
                            <Link
                              href={{
                                pathname: '/editpost/[id]',
                                query: { id: post.id },
                              }}>
                              <button className='uppercase text-gray-500 font-bold text-lg hover:text-gray-700'>
                                Edit
                              </button>
                            </Link>
                            <button className='uppercase ml-4 text-gray-500 font-bold hover:text-gray-700 text-lg'>
                              View
                            </button>
                            <button
                              onClick={() => {
                                handlePublishChange(post.id);
                              }}
                              className='uppercase ml-4 text-gray-500 font-bold hover:text-gray-700 text-lg'>
                              {post.publish ? 'UnPublish' : 'Publish'}
                            </button>
                            <button
                              onClick={() => {
                                handleDelete(post.id);
                              }}
                              className='uppercase text-red-50 shadow font-semibold px-3 hover:text-gray-700 text-base bg-red-500 rounded-xl'>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='absolute right-10 bottom-10 z-50 flex flex-row justify-end items-end'>
          <Link href='newpost'>
            <button>
              <IoMdAddCircleOutline className='text-7xl hover:text-black text-gray-900 ' />
            </button>
          </Link>
        </div>
        <ToastContainer
          position='bottom-center'
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </main>
    </React.Fragment>
  );
};

export default Index;
