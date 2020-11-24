import Image from 'next/image';
import Link from 'next/link';

const DashPost = (props) => (
  <div
    className={`grid grid-cols-12 mt-4 rounded-xl ${
      props.post.publish ? 'bg-green-50' : 'bg-red-50'
    } `}>
    <div className='col-span-3 mr-5 relative'>
      <Image
        src={props.post.imageUrl}
        className='object-cover rounded-tl-xl rounded-bl-xl shadow'
        height={170}
        width={170}
        layout='responsive'></Image>
      <div className={`${props.post.publish ? 'hidden' : 'block'} `}>
        <span className='absolute top-0 left-0 bg-red-500 rounded-tl-xl text-red-50 rounded-br-xl px-2 py-1'>
          DRAFT
        </span>
      </div>
    </div>

    <div className='col-span-9 flex justify-center flex-col'>
      <h5>{props.post.title}</h5>
      <div className='flex -mt-2'>
        <span className=' text-light-blue-500 text-md'>
          <span className='text-gray-700'>Published: </span>
          {new Date(props.post.date).toDateString()}
        </span>
        <span className=' text-gray-500 ml-4'>
          <span className='text-gray-700'>Category: </span>{' '}
          {props.post.category}
        </span>
      </div>

      <p className='text-md'>{props.post.excerpt}</p>
      <div className='-mt-2 flex space-x-5'>
        <Link
          href={{
            pathname: '/editpost/[id]',
            query: {
              id: props.post.id,
            },
          }}>
          <button className='uppercase text-gray-500 font-bold text-lg hover:text-gray-700'>
            Edit
          </button>
        </Link>
        <button className='uppercase ml-4 text-gray-500 font-bold hover:text-gray-700 text-lg'>
          View
        </button>
        <button
          onClick={() => {
            props.handlePublishChange(props.post.id);
          }}
          className='uppercase ml-4 text-gray-500 font-bold hover:text-gray-700 text-lg'>
          {props.post.publish ? 'UnPublish' : 'Publish'}
        </button>
        <button
          onClick={() => {
            props.handleDelete(props.post.id);
          }}
          className='uppercase text-red-500 font-bold px-3 hover:text-red-700 text-base rounded-xl'>
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default DashPost;
