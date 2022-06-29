import Navbar from './Navbar';

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      <main className="container-fluid">{children}</main>
    </div>
  );
};

export default MainLayout;
