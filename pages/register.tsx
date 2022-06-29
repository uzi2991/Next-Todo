import FormInput from '../src/components/FormInput';
import Logo from '../src/components/Logo';
import { Field, Formik } from 'formik';
import RegisterValidation from '../src/validations/register';
import axios from 'axios';
import Link from 'next/link';
import { useAppDispatch } from '../src/store/hooks';
import { createAlert, showAlert } from '../src/store/features/AlertSlice';
import Alert from '../src/components/Alert';
import UnauthWrapper from '../src/components/UnauthWrapper';
import { register } from '../src/store/features/UserSlice';

const RegisterPage = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="full-page">
      <div className="bg-white p-8 border-t-4 border-t-primary-500 shadow-md rounded flex flex-col items-center w-[24rem]">
        <div className="mb-4">
          <Logo />
        </div>

        <h1 className="text-4xl mb-8">Register</h1>
        <div className="mb-8 w-full">
          <Alert id="register-alert" />
        </div>

        <Formik
          initialValues={{ username: '', password: '', confirmPassword: '' }}
          validationSchema={RegisterValidation}
          onSubmit={async (values, { setSubmitting }) => {
            await dispatch(register(values)).unwrap();

            setSubmitting(false);
          }}
        >
          {({ isSubmitting, handleSubmit, isValid }) => (
            <form onSubmit={handleSubmit} className="mb-4 w-full">
              <div className="flex flex-col gap-4 mb-8">
                <Field name="username" component={FormInput} />
                <Field name="password" component={FormInput} type="password" />
                <Field
                  name="confirmPassword"
                  component={FormInput}
                  type="password"
                  label="Confirm Password"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting || !isValid}
              >
                Register
              </button>
            </form>
          )}
        </Formik>
        <p>
          Already have an account?{' '}
          <Link href="/login" passHref>
            <a className="text-primary-500">Login</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

RegisterPage.AuthLayout = UnauthWrapper;

export default RegisterPage;
