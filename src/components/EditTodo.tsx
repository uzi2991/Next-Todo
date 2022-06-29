import AddTodo from './AddTodo';
import { useRef } from 'react';
import useClickOutside from '../hooks/useClickOutside';

type Props = {
  editingId: string;
  closeEdit: () => void;
};

const EditTodo = ({ editingId, closeEdit }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="fixed left-0 top-0 full-page bg-[rgba(0,0,0,.7)]"
      onClick={(e) => {
        console.log('Clicked');
        if (ref.current && !ref.current.contains(e.target as Node)) {
          closeEdit();
        }
      }}
    >
      <div className="container-fluid" ref={ref}>
        <AddTodo editingId={editingId} closeEdit={closeEdit} />
      </div>
    </div>
  );
};

export default EditTodo;
