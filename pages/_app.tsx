import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import store from '../src/store';
import { NextPage } from 'next';

type INextPage = NextPage & {
  AuthLayout?: ({ children }: { children: React.ReactNode }) => JSX.Element;
  Layout?: ({ children }: { children: React.ReactNode }) => JSX.Element;
};

type IAppProps = AppProps & {
  Component: INextPage;
};

function MyApp({ Component, pageProps }: IAppProps) {
  const AuthLayout =
    Component.AuthLayout ??
    (({ children }: { children: React.ReactNode }) => <>{children}</>);

  const Layout =
    Component.Layout ??
    (({ children }: { children: React.ReactNode }) => <>{children}</>);

  return (
    <SessionProvider>
      <Provider store={store}>
        <AuthLayout>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthLayout>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
