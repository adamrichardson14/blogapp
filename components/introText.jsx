const IntroText = ({ title, description, center }) => (
  <header
    className={`w-11/12 mx-auto mt-4 lg:max-w-7xl ${
      center ? 'text-center' : null
    }`}>
    <h1 className='text-2xl font-bold'>{title}</h1>
    <p className='text-gray-600'>{description}</p>
  </header>
);

export default IntroText;
