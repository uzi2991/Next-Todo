import { configureStore } from '@reduxjs/toolkit';
import AlertReducer from './features/AlertSlice';
import UserReducer from './features/UserSlice';
import TodoReducer from './features/TodoSlice';

const store = configureStore({
  reducer: {
    alert: AlertReducer,
    user: UserReducer,
    todo: TodoReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
