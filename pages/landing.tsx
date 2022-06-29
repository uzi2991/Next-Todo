import Link from 'next/link';
import Logo from '../src/components/Logo';
import UnauthWrapper from '../src/components/UnauthWrapper';

const LandingPage = () => {
  return (
    <div className="container-fluid py-4">
      <div className="mb-8">
        <Logo />
      </div>

      <div className="grid md:grid-cols-2 items-center gap-8">
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-4xl font-medium text-gray-800 mb-4">
            Todo List App
          </h1>
          <p className="text-gray-500 mb-6">
            Become focused, organized, and calm with{' '}
            <span className="text-primary-500">Todoist</span>. Add your
            tasks.Organize your life. Achieve more every day. Reach that mental
            clarity you&apos;ve been longing for.
          </p>

          <div className="flex gap-4">
            <Link href="/register" passHref>
              <a>
                <button className="btn btn-primary text-lg w-[8rem]">
                  Register
                </button>
              </a>
            </Link>

            <Link href="/login" passHref>
              <a>
                <button className="btn btn-secondary text-lg w-[8rem]">
                  Login
                </button>
              </a>
            </Link>
          </div>
        </div>

        <img src="/hero.svg" alt="hero" />
      </div>
    </div>
  );
};

export default LandingPage;

LandingPage.AuthLayout = UnauthWrapper;
