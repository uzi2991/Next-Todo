import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchTodos, selectAllIds } from '../store/features/TodoSlice';
import Spinner from './Spinner';
import TodoItem from './TodoItem';

const TodoList = () => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );

  const todoIds = useAppSelector(selectAllIds);

  useEffect(() => {
    dispatch(fetchTodos())
      .unwrap()
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'));
  }, [dispatch]);

  let content: JSX.Element;

  if (status === 'loading') {
    content = (
      <div className="mx-auto space-y-4">
        <Spinner />
        Fetching todos...
      </div>
    );
  } else if (status === 'error') {
    content = (
      <div className="mx-auto">Could not fetch Todos, try again later</div>
    );
  } else {
    content = (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4 items-start">
        {todoIds.map((id) => (
          <TodoItem key={id} id={id} />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-md p-4">
      <h1 className="text-3xl mb-8">Your Todos</h1>
      {content}
    </div>
  );
};

export default TodoList;
