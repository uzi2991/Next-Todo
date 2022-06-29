import { Formik, Field } from 'formik';
import FormInput from '../src/components/FormInput';
import Logo from '../src/components/Logo';
import Alert from '../src/components/Alert';
import LoginValidation from '../src/validations/login';
import { useAppDispatch } from '../src/store/hooks';
import { showAlert, createAlert } from '../src/store/features/AlertSlice';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import UnauthWrapper from '../src/components/UnauthWrapper';
import { login } from '../src/store/features/UserSlice';

const LoginPage = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="full-page">
      <div className="bg-white p-8 border-t-4 border-t-primary-500 shadow-md rounded flex flex-col items-center w-[24rem]">
        <div className="mb-4">
          <Logo />
        </div>

        <h1 className="text-4xl mb-8">Login</h1>
        <div className="mb-8 w-full">
          <Alert id="login-alert" />
        </div>

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginValidation}
          onSubmit={async (values, { setSubmitting }) => {
            await dispatch(login(values)).unwrap();

            setSubmitting(false);
          }}
        >
          {({ isSubmitting, handleSubmit, isValid }) => (
            <form onSubmit={handleSubmit} className="mb-4 w-full">
              <div className="flex flex-col gap-4 mb-8">
                <Field name="username" component={FormInput} />
                <Field name="password" component={FormInput} type="password" />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting || !isValid}
              >
                Login
              </button>
            </form>
          )}
        </Formik>
        <p>
          Don&apos;t have an account?{' '}
          <Link href="/register" passHref>
            <a className="text-primary-500">Register</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

LoginPage.AuthLayout = UnauthWrapper;

export default LoginPage;
