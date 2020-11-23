import React from 'react';
import Link from 'next/link';
import { truncateString } from '../utils/utils';
import Image from 'next/image';
import { motion } from 'framer-motion';
const DisplayPosts = ({ posts, url }) => (
  <main className='w-11/12 mx-auto py-2 lg:max-w-7xl'>
    <div className='sm:-mt-4 lg:grid lg:grid-cols-2 lg:gap-3'>
      {posts ? (
        posts.map((post) => {
          return (
            <React.Fragment key={post.slug}>
              <div className='flex-row flex lg:flex-none items-center sm:shadow-lg sm:rounded-lg sm:mt-4 lg:flex-col lg:w-full lg:my-1 lg:shadow-xs lg:border-none lg:rounded-lg'>
                <Link
                  href={{
                    pathname: '/blog/post/[slug]',
                    query: {
                      slug: post.slug,
                    },
                  }}>
                  <a>
                    <motion.div
                      layoutId={'postImage'}
                      className='w-20 h-20 mr-4 sm:w-40 sm:h-40  lg:hidden'>
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        className='rounded-full sm:rounded-none sm:rounded-l-lg shadow-md  object-cover object-center  lg:rounded-t-lg lg:shadow-none'
                        width={160}
                        height={160}
                        quality={40}
                        layout='responsive'
                      />
                    </motion.div>
                    <motion.div
                      layoutId={'postImage'}
                      className='hidden lg:block'>
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        className='lg:rounded-t-lg object-cover'
                        width={600}
                        height={350}
                        quality={40}
                      />
                    </motion.div>
                  </a>
                </Link>
                <div className='w-7/12 lg:w-full lg:px-2 lg:pb-2'>
                  <Link
                    href={{
                      pathname: '/blog/post/[slug]',
                      query: {
                        slug: post.slug,
                      },
                    }}>
                    <a>
                      <motion.h2
                        layoutId={post.title}
                        animate={{ scale: 1 }}
                        className='font-bold sm:text-lg md:text-xl lg:text-2xl'>
                        {post.title}
                      </motion.h2>
                    </a>
                  </Link>
                  <span className='text-sm text-gray-600 lg:text-base'>
                    {new Date(post.date).toDateString()}
                  </span>
                  <p className='text-gray-700 hidden sm:block'>
                    {truncateString(post.excerpt, 120)}
                  </p>
                  <button className='text-yellow-700 text-base hover:text-yellow-600 hidden sm:block md:text-base lg:text-base'>
                    Read full post
                  </button>
                </div>
              </div>
              <p className='text-gray-700 sm:hidden'>
                {truncateString(post.excerpt, 120)}
              </p>
              <Link
                href={{
                  pathname: `/blog/[blogurl]/[slug]`,
                  query: {
                    blogurl: url,
                    slug: post.slug,
                  },
                }}>
                <button className='text-yellow-700 text-base hover:text-yellow-600 sm:hidden pb-3'>
                  Read full post
                </button>
              </Link>
            </React.Fragment>
          );
        })
      ) : (
        <h1>No posts</h1>
      )}
    </div>
  </main>
);

export default DisplayPosts;
