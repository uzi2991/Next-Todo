import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Loading from './Loading';
import { useAppDispatch } from '../store/hooks';
import { changeUser } from '../store/features/UserSlice';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthWrapper = ({ children }: Props) => {
  const router = useRouter();
  const { status, data: session } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session) {
      dispatch(changeUser(session.user));
    } else {
      dispatch(changeUser(null));
    }
  }, [session, dispatch]);

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'unauthenticated') {
    router.push('/landing');

    return <></>;
  }

  return <>{children}</>;
};

export default AuthWrapper;
