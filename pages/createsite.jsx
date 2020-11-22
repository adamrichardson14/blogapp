import React, { useState } from 'react';
import useSWR from 'swr';

import { useForm } from 'react-hook-form';
import { useUser } from '../utils/auth/useUser';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  validateURL,
  validateTwitter,
  validateBlogSlug,
  validateTitle,
} from '../utils/formValidation';

const fetcher = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json());

const createsite = () => {
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();
  const { user } = useUser();
  const onSubmit = async (values) => {
    try {
      const data = {
        title: String(values.title),
        url: String(values.url),
        description: String(values.description),
        twitter: String(values.twitter),
        website: String(values.website),
      };
      let config = {
        method: 'post',
        url: 'http://localhost:3000/api/addsiteinfo',
        headers: {
          'Content-Type': 'application/json',
          token: user.token,
        },
        data: data,
      };
      const response = await axios(config); //TODO: Add toast for successful creation
      router.push('/dashboard');
    } catch (err) {
      console.error(err); //TODO: Add toast for error
    }
  };
  const { data: site, error } = useSWR(
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

  if (site && !error) {
    return (
      <>
        <h1>You already have a site, you can only create one site</h1>
        <button>You can edit your existing site here</button>
      </>
    );
  }

  if (!site) {
    return (
      <>
        <div className='max-w-6xl mx-auto w-10/12'>
          <h1>You're almost there...</h1>
          <div className='mx-auto max-w-2xl'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mt-5'>
                <label className='text-3xl font-semibold' htmlFor='text'>
                  Title
                  <input
                    className={`form-input block w-full mt-3 bg-gray-50 border-gray-300 border rounded-lg ${
                      errors.title
                        ? 'border-red-600 bg-red-200 focus:border-red-600'
                        : ''
                    } `}
                    type='text'
                    name='title'
                    id='title'
                    autoComplete='off'
                    placeholder='This will be the title of your Blog'
                    ref={register({
                      validate: validateTitle,
                    })}
                  />
                </label>
                <span className='text-red-600'>
                  {errors.title && errors.title.message}
                </span>
              </div>
              <div className='mt-5'>
                <label className='text-3xl font-semibold mt-5' htmlFor='text'>
                  Blog URL -{' '}
                  <span className='text-xl text-gray-500 font-medium'>
                    This will be the url that follows ours.
                    https://blogify.com/blog/yourblognamehere. It must be
                    lowercase and can't contain and special characters.
                  </span>
                  <input
                    className={`form-input block w-full mt-3 bg-gray-50 border-gray-300 border rounded-lg ${
                      errors.url
                        ? 'border-red-600 bg-red-200 focus:border-red-600'
                        : ''
                    } `}
                    type='text'
                    name='url'
                    id='url'
                    autoComplete='off'
                    ref={register({
                      validate: validateBlogSlug,
                    })}
                  />
                </label>
                <span className='text-red-600'>
                  {errors.url && errors.url.message}
                </span>
              </div>
              <div className='mt-5'>
                <label class='block text-3xl font-semibold mt-1'>
                  Blog Desciption -{' '}
                  <span className='text-xl text-gray-500 font-medium'>
                    This will be displayed on the homepage of your blog.
                  </span>
                  <textarea
                    name='description'
                    ref={register}
                    className='form-input mt-1 block w-full border bg-gray-50 border-gray-300 rounded-lg'
                    rows='4'
                  />
                </label>
              </div>
              <div className='mt-5'>
                <label className='text-3xl font-semibold' htmlFor='text'>
                  Twitter
                  <input
                    className={`form-input block w-full mt-3 bg-gray-50 border-gray-300 border rounded-lg ${
                      errors.twitter
                        ? 'border-red-600 bg-red-200 focus:border-red-600'
                        : ''
                    } `}
                    type='text'
                    name='twitter'
                    id='twitter'
                    autoComplete='off'
                    placeholder='If you have a twitter, link it here...'
                    ref={register({
                      validate: validateTwitter,
                    })}
                  />
                </label>
                <span className='text-red-600'>
                  {errors.twitter && errors.twitter.message}
                </span>
              </div>
              <div className='mt-5'>
                <label className='text-3xl font-semibold' htmlFor='text'>
                  Website
                  <input
                    className={`form-input block w-full mt-3 bg-gray-50 border-gray-300 border rounded-lg ${
                      errors.website
                        ? 'border-red-600 bg-red-200 focus:border-red-600'
                        : ''
                    } `}
                    type='text'
                    name='website'
                    id='website'
                    autoComplete='off'
                    placeholder='Paste the link to your website. It must be start with https://yourwebsite.com'
                    ref={register({
                      validate: validateURL,
                    })}
                  />
                </label>
                <span className='text-red-600'>
                  {errors.website && errors.website.message}
                </span>
              </div>
              <button
                type='submit'
                className='mt-5 w-full sm:w-auto flex-none bg-light-blue-500 hover:bg-light-blue-600 text-white text-lg font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200'>
                Create Site
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return <h1>Loading....</h1>;
};

export default createsite;
