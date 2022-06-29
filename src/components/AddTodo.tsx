import { Formik, Field } from 'formik';
import FormInput from './FormInput';
import TodoValidation from '../validations/todo';
import FormSelect from './FormSelect';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Alert from './Alert';
import {
  addTodo,
  selectTodoById,
  TodoStatus
} from '../store/features/TodoSlice';
import FormTextArea from './FormTextArea';
import { updateTodo } from '../store/features/TodoSlice';

type Props = {
  editingId?: string;
  closeEdit?: () => void;
};

const AddTodo = ({ editingId, closeEdit }: Props) => {
  const dispatch = useAppDispatch();
  const todo = useAppSelector((state) =>
    selectTodoById(state, editingId || '')
  );

  return (
    <div className="bg-white shadow-sm rounded-md p-4">
      <h1 className="text-3xl mb-8">
        {editingId ? 'Edit Todo' : 'Add New Todo'}
      </h1>
      <div className="mb-8">
        <Alert id={editingId ? 'edit_todo-alert' : 'add_todo-alert'} />
      </div>
      <Formik
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          if (editingId) {
            const todo = await dispatch(
              updateTodo({ id: editingId, ...values })
            ).unwrap();
            if (todo) {
              closeEdit?.();
            }
          } else {
            const todo = await dispatch(addTodo(values)).unwrap();
            if (todo) {
              resetForm();
            }
          }

          setSubmitting(false);
        }}
        initialValues={
          todo
            ? { title: todo.title, content: todo.content, status: todo.status }
            : { title: '', content: '', status: 'todo' as TodoStatus }
        }
        validationSchema={TodoValidation}
      >
        {({ handleSubmit, isValid, isSubmitting, resetForm }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <Field name="title" component={FormInput} />
              <Field
                name="status"
                component={FormSelect}
                options={['todo', 'doing', 'done']}
              />
            </div>
            <Field name="content" component={FormTextArea} />
            <div className="flex self-end gap-2">
              <button
                className="btn btn-secondary text-base"
                type="button"
                disabled={isSubmitting}
                onClick={() => resetForm()}
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="btn btn-primary text-base"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddTodo;
