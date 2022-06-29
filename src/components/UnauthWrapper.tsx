import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Loading from './Loading';
import Spinner from './Spinner';

type Props = {
  children: React.ReactNode;
};

const UnauthWrapper = ({ children }: Props) => {
  const router = useRouter();

  const { status } = useSession();

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'authenticated') {
    router.push('/');
    return <></>;
  }

  return <>{children}</>;
};

export default UnauthWrapper;
