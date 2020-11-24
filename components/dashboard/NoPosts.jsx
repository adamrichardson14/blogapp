import Link from 'next/link';
const NoSite = () => {
  return (
    <div className='max-w-5xl w-10/12 mx-auto mt-10'>
      <h4>You don't have any posts yet.</h4>
      <Link href='/newpost'>
        <button className='w-full sm:w-auto flex-none bg-gray-900 hover:bg-gray-700 text-white text-lg font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200'>
          Create your first post
        </button>
      </Link>
    </div>
  );
};

export default NoSite;
