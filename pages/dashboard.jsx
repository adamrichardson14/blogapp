import React from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { useUser } from '../utils/auth/useUser';
import Header from '../components/DashHeader';
import { IoMdAddCircleOutline } from 'react-icons/io';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import Loading from '../components/Loading';
import NoSite from '../components/dashboard/NoSite';
import NoPosts from '../components/dashboard/NoPosts';
import DashPost from '../components/dashboard/DashPost';

const fetcher = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json());

const Index = () => {
  const { user } = useUser();

  const { data, error, mutate } = useSWR(
    user ? ['/api/getallpostsauth', user.token] : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  console.log(data);

  const notify = (type, text, options) => toast[type](text, options);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/deletesinglepost?id=${id}`,
        {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            token: user.token,
          }),
        }
      );
      const msg = await res.json();

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
        `${process.env.NEXT_PUBLIC_URL}/api/publishtoggle?id=${id}`,
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

  if (data && data.postError) {
    return (
      <>
        <Header />
        <NoPosts />
      </>
    );
  }

  if (data && data.siteError) {
    return (
      <>
        <Header />
        <NoSite />
      </>
    );
  }

  return (
    <React.Fragment>
      <Header />
      <main className='max-w-5xl mt-5 mx-auto'>
        <div className='w-11/12 mx-auto'>
          {!data ? (
            <Loading />
          ) : (
            data &&
            data.allPosts && (
              <div>
                <div>
                  <h2>Posts</h2>
                </div>
                <div>
                  <div>
                    {data.allPosts &&
                      data.allPosts.map((post) => {
                        return (
                          <DashPost
                            key={post.url}
                            handleDelete={handleDelete}
                            handlePublishChange={handlePublishChange}
                            post={post}
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        <div className='fixed right-10 bottom-10 z-50 flex flex-row justify-end items-end'>
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
