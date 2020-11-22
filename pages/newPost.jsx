import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '../utils/auth/useUser';
import Link from 'next/link';
import { ControlledEditor } from '@monaco-editor/react';
import unified from 'unified';
import gfm from 'remark-gfm';
import parse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import stringify from 'rehype-stringify';
import { useForm } from 'react-hook-form';
import { AiOutlineSave, AiOutlineAlignRight } from 'react-icons/ai';
import { VscColorMode } from 'react-icons/vsc';
import highlight from 'rehype-highlight';
import Head from 'next/head';
import breaks from 'remark-breaks';
import { content } from '../defaultMd';
import { createSlug } from '../utils/utils';
import axios from 'axios';
import InitFireBase from '../utils/auth/initFirebase';
import firebase from 'firebase/app';
import Image from 'next/image';
import {
  validateTitle,
  validateImageUrl,
  validateExcerpt,
} from '../utils/formValidation';

import 'firebase/storage';
InitFireBase();

const storage = firebase.storage();
const storageRef = storage.ref();

const NewPost = () => {
  const { register, handleSubmit, errors, getValues, setValue } = useForm();
  const [mdText, setMdText] = useState(content);
  const { user, logout } = useUser();
  const [editorTheme, setEditorTheme] = useState(false);
  const [show, setShow] = useState(false);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [htmlValue, sethtmlValue] = useState();
  const valueGetter = useRef();
  const [snapShotProgress, setSnapShotProgress] = useState(0);
  const [imageInput, setImageInput] = useState('');
  const [imageUrl, setImageUrl] = useState();

  const onSubmit = async (values) => {
    console.log(values);
    const slugSubmitValue = getValues('slugurl');

    const data = {
      title: values.title,
      slug: slugSubmitValue,
      category: values.category,
      excerpt: values.excerpt,
      publish: values.publish,
      html: htmlValue,
      authorId: user.id,
      imageUrl: imageUrl,
      mdText,
    };
    try {
      let config = {
        method: 'post',
        url: 'http://localhost:3000/api/addpost',
        headers: {
          'Content-Type': 'application/json',
          token: user.token,
        },
        data: data,
      };
      console.log(data);
      const response = await axios(config); //TODO: Add toast for successful creation
      console.log(response);
    } catch (err) {
      console.error(err); //TODO: Add toast for error
    }
  };

  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
    processMD();
  }

  function processMD() {
    unified()
      .use(parse)
      .use(gfm)
      .use(breaks)
      .use(remark2rehype)
      .use(highlight)
      .use(stringify)
      .process(valueGetter.current(), (err, data) => {
        if (err) console.log(err);
        sethtmlValue(data.contents);
        console.log(data.contents);
      });
  }

  const handleEditorChange = (ev, value) => {
    setMdText(value);
    processMD();
  };

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
      <Head>
        <link
          rel='stylesheet'
          href='//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.4.0/styles/github-gist.min.css'
        />
        <script src='//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.4.0/highlight.min.js'></script>
      </Head>
      <main className='overflow-hidden'>
        <div
          className={`bg-gray-50 z-50 absolute top-0 right-0 border-l overflow-scroll border-gray-200  ${
            show ? 'block' : 'hidden'
          }`}>
          <div className='flex flex-col sm:flex-row sm:justify-around '>
            <div className='w-96 h-screen bg-gray-50'>
              <div className='w-11/12 mx-auto max-w-7xl'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <label className='text-lg font-semibold mt-5'>
                    Title
                    <input
                      ref={register({
                        validate: { validateTitle },
                      })}
                      className='form-input block w-full mt-1 bg-gray-50 border-gray-300 border rounded-lg'
                      type='text'
                      name='title'
                      autoComplete='off'
                      onBlur={() => {
                        const title = getValues('title');
                        setValue('slugurl', String(createSlug(title)));
                        console.log(getValues('slugurl'));
                      }}
                      placeholder='Enter the title of your blog post here'
                    />
                  </label>
                  <div className='text-red-600'>
                    {errors.title && errors.title.message}
                  </div>
                  <label className='text-lg font-semibold mt-1'>
                    Post URL
                    <input
                      ref={register}
                      className='form-input block w-full mt-1 bg-gray-50 border-gray-300 border rounded-lg'
                      type='text'
                      name='slugurl'
                      disabled
                      placeholder='This will be created from your title'
                    />
                  </label>
                  <label className='text-lg font-semibold mt-1'>
                    Choose A Category
                    <select
                      name='category'
                      ref={register}
                      class='form-select mt-1 block w-full border-gray-300 border rounded-lg'>
                      <option value='tech'>Tech</option>
                      <option value='coding'>Coding</option>
                      <option value='javascript'>Javascript</option>
                      <option value='python'>Python</option>
                    </select>
                  </label>
                  <label className='block text-lg font-semibold mt-1'>
                    <span>Custom Excerpt</span>
                    <textarea
                      name='excerpt'
                      ref={register({
                        validate: validateExcerpt,
                      })}
                      type='email'
                      className='form-input mt-1 block w-full border border-gray-300 rounded-lg'
                      rows='4'
                      placeholder='john@example.com'
                    />
                  </label>
                  <div className='text-red-600'>
                    {errors.excerpt && errors.excerpt.message}
                  </div>
                  <label className='block text-lg font-semibold mt-1'>
                    Featured Image
                  </label>

                  <input
                    className='my-2 text-sm'
                    name='image'
                    required={true}
                    type='file'
                    accept='.jpeg,.jpg,.png,.svg'
                    onChange={() => {
                      setImageInput(event.target.files[0]);
                      console.log(imageInput);
                    }}
                  />
                  <button
                    className='bg-light-blue-500 hover:bg-light-blue-600 py-1 px-2 rounded-lg shadow text-light-blue-100'
                    disabled={!imageInput}
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(imageInput);
                      if (imageInput === '') {
                        console.error(`You need an image to do that.`);
                      }
                      console.log(imageInput);
                      const userRef = storageRef.child(`/${user.id}`);
                      const uploadTask = userRef
                        .child(`${imageInput.name}`)
                        .put(imageInput);

                      uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                          let progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                          setSnapShotProgress(progress);
                          console.log(snapshot);
                        },
                        (err) => {
                          //catches the errors
                          console.log(err);
                        },
                        () => {
                          // gets the functions from storage refences the image storage in firebase by the children
                          // gets the download url then sets the image from firebase as the value for the imgUrl key:
                          storageRef
                            .child(`/${user.id}`)
                            .child(`${imageInput.name}`)
                            .getDownloadURL()
                            .then((fireBaseUrl) => {
                              setImageInput(null);
                              setImageUrl(fireBaseUrl);
                              console.log(fireBaseUrl);
                              setValue('imageUrl', fireBaseUrl);
                            });
                        }
                      );
                    }}>
                    Upload
                  </button>
                  <div
                    style={{
                      width: `${snapShotProgress ? snapShotProgress : 0}%`,
                    }}
                    className='h-3 bg-light-blue-500'></div>
                  <div className='hidden'>
                    <input
                      type='text'
                      name='imageUrl'
                      ref={register({
                        validate: validateImageUrl,
                      })}
                    />
                  </div>
                  <div className='text-red-600'>
                    {errors.imageUrl && errors.imageUrl.message}
                  </div>

                  {imageUrl ? (
                    <div>
                      <Image
                        src={imageUrl ? imageUrl : null}
                        width={400}
                        height={300}
                        layout='responsive'
                        className='object-cover'
                      />
                    </div>
                  ) : null}

                  <label className='inline-flex items-center mt-2'>
                    <span className='block text-lg font-semibold mt-1'>
                      Publish?
                    </span>
                    <input
                      ref={register}
                      name='publish'
                      type='checkbox'
                      className='ml-5 form-checkbox border border-gray-300 h-8 w-8 rounded-lg bg-gray-100'
                    />
                  </label>
                  <p className='text-sm text-gray-600'>
                    Check this box and hit save to push the article live. Leave
                    it unchecked and hit save to save the article as a draft you
                    can come back to later.
                  </p>

                  <div className='w-full text-center'>
                    <button type='submit'>
                      <AiOutlineSave className='text-7xl text-green-500' />
                    </button>
                  </div>
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
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>

                  <Link href='/dashboard'>
                    <span className='mx-4 font-medium'>Dashboard</span>
                  </Link>
                </a>
                <a
                  className='flex items-center py-2 px-8 bg-gray-50 text-gray-700 border-gray-700'
                  href='#'>
                  <VscColorMode className='text-xl ml-1' />

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
        <div className='flex p-0 m-0'>
          <ControlledEditor
            height='100vh'
            language='markdown'
            theme={editorTheme ? 'light' : 'dark'}
            width='50%'
            value={mdText}
            editorDidMount={handleEditorDidMount}
            options={{
              wordWrap: 'on',
              automaticLayout: true,
              lineNumbers: 'off',
              autoIndent: 'keep',
            }}
            onChange={handleEditorChange}
          />
          <div className='absolute right-10 bottom-10 z-50 flex flex-row justify-end items-end'>
            <button
              onClick={() => {
                setShow(!show);
              }}>
              <AiOutlineAlignRight className='text-5xl  ' />
            </button>
          </div>
          <div className='w-1/2 h-screen overflow-scroll'>
            <div className='w-11/12 mx-auto'>
              <div dangerouslySetInnerHTML={{ __html: htmlValue }}></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NewPost;
