import AddTodo from '../src/components/AddTodo';
import AuthWrapper from '../src/components/AuthWrapper';
import MainLayout from '../src/components/MainLayout';
import TodoList from '../src/components/TodoList';

const HomePage = () => {
  return (
    <div className="text-xl mt-4 space-y-4">
      <AddTodo />
      <TodoList />
    </div>
  );
};

HomePage.Layout = MainLayout;
HomePage.AuthLayout = AuthWrapper;

export default HomePage;
