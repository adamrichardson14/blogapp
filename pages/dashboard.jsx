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

const Dashboard = () => {
  const { user } = useUser();

  const { data, error, mutate } = useSWR(
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
    } catch (err) {}
  };

  const handleFeaturedChange = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/togglefeaturedpost?id=${id}`,
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
      notify(
        msg.status ? 'success' : 'info',
        msg.status
          ? 'Successfully featured your post'
          : 'Successfully unfeatured your post',
        {
          position: 'bottom-center',
        }
      );
    } catch (err) {}
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
      mutate();
      notify(
        msg.status ? 'success' : 'info',
        msg.status
          ? 'Successfully published your post'
          : 'Successfully unpublished your post',
        {
          position: 'bottom-center',
        }
      );
    } catch (err) {}
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

  if (!user) {
    return (
      <div className='max-w-7xl mx-auto p-10'>
        <Link href='/auth'>Sign in</Link>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Header />
      <main className='max-w-5xl mt-5 mx-auto mb-10'>
        <div className='w-11/12 mx-auto'>
          {!data ? (
            <Loading />
          ) : (
            data &&
            data.allPosts && (
              <div>
                <div>
                  <a
                    className='text-gray-900 text-2xl text-bold'
                    href={`${process.env.NEXT_PUBLIC_URL}/blog/${data.siteInfo.url}`}
                    target='_blank'>
                    Visit Site
                  </a>
                  <h4>Posts</h4>
                </div>
                <div>
                  <div>
                    {data.allPosts &&
                      data.allPosts.map((post) => {
                        return (
                          <DashPost
                            key={post.slug}
                            handleDelete={handleDelete}
                            handlePublishChange={handlePublishChange}
                            handleFeaturedChange={handleFeaturedChange}
                            post={post}
                            site={data.siteInfo}
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

export default Dashboard;
