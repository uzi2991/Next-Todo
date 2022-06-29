import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, RootState } from '../index';
import { showAlert, createAlert } from './AlertSlice';

export type TodoStatus = 'todo' | 'doing' | 'done';

type Todo = {
  _id: string;
  status: TodoStatus;
  title: string;
  content: string;
  createdAt: string;
};

type TodoState = {
  todos: {
    [id: string]: Todo;
  };

  ids: string[];
};

const TodoSlice = createSlice({
  name: 'todo',
  initialState: { todos: {}, ids: [] } as TodoState,
  reducers: {
    deleteTodo: (state, { payload }: PayloadAction<string>) => {
      delete state.todos[payload];
      state.ids = state.ids.filter((id) => id !== payload);
      axios.delete(`/api/todo/${payload}`);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(addTodo.fulfilled, (state, { payload }) => {
        if (payload) {
          state.todos[payload._id] = payload;
          state.ids.push(payload._id);
        }
      })
      .addCase(fetchTodos.fulfilled, (state, { payload }) => {
        state.todos = payload.reduce(
          (acc, item) => {
            acc[item._id] = item;
            return acc;
          },
          {} as {
            [id: string]: Todo;
          }
        );
        state.ids = payload.map((todo) => todo._id);
      })
      .addCase(updateTodo.fulfilled, (state, { payload }) => {
        if (payload) {
          state.todos[payload.id] = {
            ...state.todos[payload.id],
            ...payload
          };
        }
      });
  }
});

export const addTodo = createAsyncThunk<
  Todo | null,
  { title: string; content: string; status: TodoStatus },
  { dispatch: AppDispatch }
>('todo/addTodo', async (values, { dispatch }) => {
  dispatch(
    showAlert({
      id: 'add_todo-alert',
      alert: {
        type: 'info',
        message: 'Creating new todo...'
      }
    })
  );
  try {
    const { data } = await axios.post('/api/todo', values);
    dispatch(
      createAlert('add_todo-alert', {
        type: 'success',
        message: 'Successful create new todo'
      })
    );

    return data.todo;
  } catch (err: any) {
    dispatch(
      createAlert('add_todo-alert', {
        type: 'danger',
        message: err.data.response.message
      })
    );

    return null;
  }
});

export const updateTodo = createAsyncThunk<
  { id: string; title: string; content: string; status: TodoStatus } | null,
  { id: string; title: string; content: string; status: TodoStatus },
  { dispatch: AppDispatch }
>('todo/updateTodo', async (values, { dispatch }) => {
  dispatch(
    showAlert({
      id: 'edit_todo-alert',
      alert: {
        type: 'info',
        message: 'Updating todo...'
      }
    })
  );
  try {
    await axios.patch(`/api/todo/${values.id}`, values);
    dispatch(
      createAlert('edit_todo-alert', {
        type: 'success',
        message: 'Successful update todo'
      })
    );

    return values;
  } catch (err: any) {
    dispatch(
      createAlert('edit_todo-alert', {
        type: 'danger',
        message: err.data.response.message
      })
    );

    return null;
  }
});

export const fetchTodos = createAsyncThunk('todo/fetchTodos', async () => {
  const { data } = await axios.get('/api/todo');

  return data.todos as Todo[];
});

export const selectTodoById = (state: RootState, id: string) =>
  state.todo.todos[id];

export const selectAllIds = (state: RootState) => state.todo.ids;

export const { deleteTodo } = TodoSlice.actions;

const TodoReducer = TodoSlice.reducer;
export default TodoReducer;
