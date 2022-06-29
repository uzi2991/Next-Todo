import { deleteTodo, selectTodoById } from '../store/features/TodoSlice';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import styles from './TodoItem.module.css';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useState, useRef } from 'react';
import AddTodo from './AddTodo';
import useClickOutside from '../hooks/useClickOutside';
import EditTodo from './EditTodo';

type Props = {
  id: string;
};

const TodoItem = ({ id }: Props) => {
  const dispatch = useAppDispatch();
  const { title, content, status, createdAt } = useAppSelector((state) =>
    selectTodoById(state, id)
  );

  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="flex flex-col p-4 rounded-md border border-slate-300 shadow-sm hover:border-primary-500">
      <h1 className="text-xl mb-2">{title}</h1>
      <p className="text-gray-500 text-base mb-2">{content}</p>
      <span
        className={`${styles[status]} rounded-md px-2 py-1 self-end text-sm mb-4`}
      >
        {status}
      </span>
      <div className="flex gap-2">
        <button
          className="btn btn-secondary flex items-center gap-1 text-sm"
          onClick={() => dispatch(deleteTodo(id))}
        >
          <FaTrash />
          Delete
        </button>
        <button
          className="btn btn-primary flex items-center gap-1 text-sm"
          onClick={() => setShowEdit(true)}
        >
          <FaEdit />
          Edit
        </button>
      </div>

      {showEdit && (
        <EditTodo editingId={id} closeEdit={() => setShowEdit(false)} />
      )}
    </div>
  );
};

export default TodoItem;
