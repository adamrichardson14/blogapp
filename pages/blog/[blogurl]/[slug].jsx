import React from 'react';
import { getData } from '../../../utils/utils';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Footer from '../../../components/Footer';
import { FiTwitter, FiLink } from 'react-icons/fi';
import Link from 'next/link';

const Post = ({ post, siteInfo }) => {
  const router = useRouter();
  if (router.isFallback) return <h1>Loading...</h1>;
  return (
    <>
      <Head>
        <meta property='og:title' content={post.title} />
        <meta property='og:description' content={post.excerpt} />
        <meta property='og:image' content={post.imageUrl} />
        <title>{`Awesome Blog | ${post.title}`}</title>
        <link
          rel='stylesheet'
          href='//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.4.0/styles/github.min.css'
        />
      </Head>
      <div>
        <div className='md:flex md:flex-row-reverse max-w-7xl'>
          <header className='md:w-1/2' layoutId={'postImage'}>
            <Image
              className='object-cover'
              src={post.imageUrl}
              alt={post.title}
              width={1200}
              height={800}
              quality={40}
              layout='responsive'
            />
          </header>
          <div className='w-11/12 mx-auto my-2 md:my-0 sm:flex sm:flex-row sm:justify-between sm:items-center md:w-1/2 md:flex-col md:justify-center md:items-center space-y-5 md:bg-gray-50 md:px-8'>
            <div>
              <h2 className='hidden font-normal md:block text-3xl text-gray-500 md:text-center -mb-7 md:-mb-4 md:text-2xl'>
                {siteInfo.title}
              </h2>
              <h1 className='md:text-center text-3xl sm:text-4xl md:text-4xl lg:text-5xl'>
                {post.title}
              </h1>
              <div className='space-x-3 md:text-center'>
                <span className='md:text-gray-700 text-xs lg:text-sm uppercase font-semibold md:text-sm md:ml-1'>
                  {new Date(post.date).toDateString()}
                </span>
                <span className='text-xs uppercase  font-semibold text-light-blue-700 md:text-xs lg:text-base'>{`3 minute read`}</span>
                {siteInfo.website && (
                  <span>
                    <Link href={siteInfo.website}>
                      <button className='text-xs uppercase text-green-500 font-semibold md:hidden'>
                        Website
                      </button>
                    </Link>
                  </span>
                )}
                {siteInfo.twitter && (
                  <span>
                    <Link href={siteInfo.twitter}>
                      <button className='text-xs uppercase text-light-blue-500 font-semibold md:hidden'>
                        Twitter
                      </button>
                    </Link>
                  </span>
                )}
                <div className='hidden md:block text-4xl space-x-5'>
                  {siteInfo.website && (
                    <Link href={siteInfo.website}>
                      <button>
                        <FiLink className='text-green-500' />
                      </button>
                    </Link>
                  )}
                  {siteInfo.twitter && (
                    <Link href={siteInfo.twitter}>
                      <button>
                        <FiTwitter className='text-light-blue-500' />
                      </button>
                    </Link>
                  )}
                </div>
              </div>
              <hr className='my-1 border-gray-100 sm:hidden' />
            </div>
          </div>
        </div>

        <main className='mt-3 w-11/12 mx-auto md:w-11/12 md:mt-5 mb-10'>
          <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
        </main>
      </div>
      <Footer title={siteInfo.title} />
    </>
  );
};

export default Post;

export const getStaticProps = async ({ params }) => {
  console.log(params);
  const postRes = await getData(
    `http://localhost:3000/api/getsinglepostpublic?sitename=${params.blogurl}&slug=${params.slug}`
  );
  const post = postRes.post;
  const siteInfo = postRes.siteInfo;
  return {
    revalidate: 1000,
    props: {
      post,
      siteInfo,
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
