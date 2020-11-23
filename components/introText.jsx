const IntroText = ({ title, description, center }) => (
  <header
    className={`w-11/12 mx-auto mt-4 lg:max-w-7xl ${
      center ? 'text-center' : null
    }`}>
    <h1>{title}</h1>
    <p className='max-w-screen-lg text-lg sm:text-2xl sm:leading-10 font-medium '>
      {description}
    </p>
  </header>
);

export default IntroText;
