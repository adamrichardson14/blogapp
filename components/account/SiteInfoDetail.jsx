const SiteInfoDetail = (props) => (
  <div className='flex items-center'>
    <span className='font-mono text-gray-900 font-bold text-2xl'>
      {props.title}
    </span>
    <p className='block m-0'>{props.data}</p>
  </div>
);

export default SiteInfoDetail;
