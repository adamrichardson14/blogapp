import React, { useState, useRef } from 'react';
import { useUser } from '../utils/auth/useUser';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import { BsReverseLayoutTextSidebarReverse } from 'react-icons/bs';
import { ControlledEditor } from '@monaco-editor/react';
import unified from 'unified';
import markdown from 'remark-parse';
import html from 'remark-html';
import gfm from 'remark-gfm';
import parse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import stringify from 'rehype-stringify';
import { useForm } from 'react-hook-form';
import { AiOutlineSave, AiOutlineAlignRight } from 'react-icons/ai';

const NewPost = () => {
  const { register, handleSubmit, errors } = useForm();
  const { user, logout } = useUser();
  const [editorTheme, setEditorTheme] = useState(false);
  const [show, setShow] = useState(false);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [htmlValue, sethtmlValue] = useState(
    '<h1>Start Typing in Markdown and you will see a preview here as you go.'
  );
  const valueGetter = useRef();

  const onSubmit = (values) => {
    console.log(values);
    console.log(htmlValue);
    console.log(user.id);
  };
  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  }

  function processMD() {
    unified()
      .use(parse)
      .use(gfm)
      .use(remark2rehype)
      .use(stringify)
      .process(valueGetter.current(), (err, data) => {
        if (err) console.log(err);
        sethtmlValue(data.contents);
      });
  }

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
    <main>
      <div
        className={`bg-gray-50 absolute top-0 right-0 border-l border-gray-200  ${
          show ? 'block' : 'hidden'
        }`}>
        <div className='flex flex-col sm:flex-row sm:justify-around '>
          <div className='w-96 h-screen bg-gray-50'>
            <div className='w-11/12 mx-auto max-w-7xl mt-4 '>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label className='text-lg font-semibold mt-5' htmlFor='text'>
                  Title
                  <input
                    className='form-input block w-full mt-1 bg-gray-50 border-gray-300 border rounded-lg'
                    type='text'
                    name='title'
                    id='title'
                    placeholder='Enter the title of your blog post here'
                    ref={register}
                  />
                </label>
                <label className='text-lg font-semibold mt-1' htmlFor='text'>
                  Post URL
                  <input
                    ref={register}
                    className='form-input block w-full mt-1 bg-gray-50 border-gray-300 border rounded-lg'
                    type='text'
                    name='url'
                    id='title'
                    placeholder='Must be lowercase, no spaces'
                  />
                </label>
                <label class='text-lg font-semibold mt-1'>
                  Choose A Category
                  <select
                    name='category'
                    ref={register}
                    class='form-select mt-1 block w-full border-gray-300 border rounded-lg'>
                    <option>Tech</option>
                    <option>Coding</option>
                    <option>Javascript</option>
                    <option>Python</option>
                  </select>
                </label>
                <label class='block text-lg font-semibold mt-1'>
                  <span>Custom Excerpt</span>
                  <textarea
                    name='excerpt'
                    ref={register}
                    type='email'
                    className='form-input mt-1 block w-full border border-gray-300 rounded-lg'
                    rows='4'
                    placeholder='john@example.com'
                  />
                </label>
                <label class='inline-flex items-center mt-2'>
                  <span class='text-xl mt-2'>Publish?</span>
                  <input
                    ref={register}
                    name='publish'
                    type='checkbox'
                    className='ml-5 form-checkbox border border-gray-100 h-8 w-8 rounded-lg bg-gray-50'
                  />
                </label>
                <p className='text-sm text-gray-600'>
                  Check this box and hit save to push the article live. Leave it
                  unchecked and hit save to save the article as a draft you can
                  come back to later.
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
      <div className='flex p-0 m-0'>
        <ControlledEditor
          height='100vh'
          language='markdown'
          theme={editorTheme ? 'light' : 'dark'}
          width='50%'
          editorDidMount={handleEditorDidMount}
          onChange={() => {
            processMD();
          }}
        />
        <div className='absolute right-10 bottom-10 z-50 flex flex-row justify-end items-end'>
          <button
            onClick={() => {
              setShow(!show);
            }}>
            <AiOutlineAlignRight className='text-5xl  ' />
          </button>
        </div>

        <div className='w-1/2'>
          <div className='w-11/12 mx-auto'>
            <div dangerouslySetInnerHTML={{ __html: htmlValue }}></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewPost;
