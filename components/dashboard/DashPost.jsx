import Image from 'next/image';
import Link from 'next/link';
import { truncateString } from '../../utils/utils';

const DashPost = (props) => (
  <div
    className={` mt-4 rounded-xl sm:flex ${
      props.post.publish ? 'bg-green-50' : 'bg-red-50'
    } `}>
    <div className='hidden sm:block sm:relative sm:h-36 sm:w-36'>
      <Image
        src={props.post.imageUrl}
        className='object-cover rounded-tl-xl rounded-bl-xl shadow'
        height={144}
        width={144}
        layout='responsive'></Image>
      <div
        className={`${
          props.post.publish && props.post.featured ? 'block' : 'hidden'
        } `}>
        <span className='absolute top-0 left-0 bg-yellow-500 rounded-tl-xl text-red-50 rounded-br-xl px-2 py-1'>
          FEATURED
        </span>
      </div>

      <div className={`${props.post.publish ? 'hidden' : 'block'} `}>
        <span className='absolute top-0 left-0 bg-red-500 rounded-tl-xl text-red-50 rounded-br-xl px-2 py-1'>
          DRAFT
        </span>
      </div>
    </div>

    <div className='p-2 flex flex-col space-y-1'>
      <a
        className='text-gray-900 text-2xl text-bold'
        href={`${process.env.NEXT_PUBLIC_URL}/blog/${props.site.url}/${props.post.slug}`}
        target='_blank'>
        {props.post.title}
      </a>
      <div className='flex'>
        <span className=' text-light-blue-500'>
          <span className='text-gray-700'>Published: </span>
          {new Date(props.post.date).toDateString()}
        </span>
        <span className=' text-gray-500 ml-4'>
          <span className='text-gray-700'>Category: </span>{' '}
          {props.post.category}
        </span>
      </div>

      <span className='text-base text-gray-700 font-semibold '>
        {truncateString(props.post.excerpt, 40)}
      </span>
      <div className='text-md'>
        <Link
          href={{
            pathname: '/editpost/[id]',
            query: {
              id: props.post.id,
            },
          }}>
          <button className='hidden sm:inline-block sm:mr-4 uppercase text-gray-500 font-bold  hover:text-gray-700'>
            Edit
          </button>
        </Link>

        <button
          onClick={() => {
            props.handlePublishChange(props.post.id);
          }}
          className='uppercase mt-1 text-gray-500 font-bold hover:text-gray-700 '>
          {props.post.publish ? 'UnPublish' : 'Publish'}
        </button>
        <button
          onClick={() => {
            props.handleFeaturedChange(props.post.id);
          }}
          className='uppercase ml-4 text-gray-500 font-bold hover:text-gray-700 '>
          {props.post.featured ? 'UnFeature' : 'Feature'}
        </button>
        <button
          onClick={() => {
            props.handleDelete(props.post.id);
          }}
          className='uppercase text-red-500 font-bold px-3 hover:text-red-700  rounded-xl'>
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default DashPost;
