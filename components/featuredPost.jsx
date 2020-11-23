import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
const FeaturedPost = ({ post }) => {
  return (
    <>
      <div className='w-11/12 mx-auto relative mb-2'>
        <Image
          key={post.slug}
          src={post.imageUrl}
          width={800}
          height={450}
          layout='responsive'
          className='object-cover rounded-lg'
          alt={post.title}
          priority={true}
          quality={40}
        />

        <div className='absolute top-0 w-full h-full text-center bg-yellow-700 rounded-lg flex justify-center items-center bg-opacity-25'>
          <div className='space-y-3'>
            <h2 className='text-white font-bold text-xl lg:text-3xl'>
              {post.title}
            </h2>
            <Link
              href={{
                pathname: '/blog/[blogurl]/[slug]',
                query: {
                  slug: post.slug,
                  blogurl: post.url,
                },
              }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-black bg-opacity-50 hover:bg-opacity-75 rounded-lg text-gray-200 px-2 py-1 lg:text-xl outline-none focus:outline-none'>
                Read full post
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedPost;
