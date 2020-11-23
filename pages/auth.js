import FirebaseAuth from '../components/FirebaseAuth';
import { useUser } from '../utils/auth/useUser';

const Auth = () => {
  return (
    <div>
      <div className=' h-56 flex items-center justify-center max-w-screen-lg mx-auto'>
        <h2>Sign in</h2>
        <FirebaseAuth />
      </div>
    </div>
  );
};

export default Auth;
