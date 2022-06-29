import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from '../index';
import axios from 'axios';
import { showAlert, createAlert } from './AlertSlice';
import { signIn } from 'next-auth/react';

type User = {
  username: string;
};

type UserState = {
  user: User | null;
};

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    user: null
  } as UserState,
  reducers: {
    changeUser: (state, { payload }: PayloadAction<User | null>) => {
      state.user = payload;
    }
  }
});

export const register = createAsyncThunk<
  void,
  {
    username: string;
    confirmPassword: string;
    password: string;
  },
  {
    dispatch: AppDispatch;
  }
>('user/register', async (values, { dispatch }) => {
  dispatch(
    showAlert({
      id: 'register-alert',
      alert: { type: 'info', message: 'Signing up...' }
    })
  );
  try {
    await axios.post('/api/auth/sign-up', values);
    dispatch(
      createAlert('register-alert', {
        type: 'success',
        message: 'Successful create account'
      })
    );
  } catch (err: any) {
    dispatch(
      createAlert('register-alert', {
        type: 'danger',
        message: err.response.data.message
      })
    );
  }
});

export const login = createAsyncThunk<
  void,
  {
    username: string;
    password: string;
  },
  { dispatch: AppDispatch }
>('user/login', async (values, { dispatch }) => {
  dispatch(
    showAlert({
      id: 'login-alert',
      alert: {
        type: 'info',
        message: 'Signing in...'
      }
    })
  );

  const response = await signIn('credentials', {
    ...values,
    redirect: false
  });

  if (!response) {
    dispatch(
      createAlert('login-alert', {
        type: 'danger',
        message: 'Cannot sign in, try again later'
      })
    );
    return;
  }

  if (response.error) {
    dispatch(
      createAlert('login-alert', {
        type: 'danger',
        message: response.error
      })
    );
  } else {
    dispatch(
      createAlert('login-alert', {
        type: 'success',
        message: 'Successful Login'
      })
    );
  }
});

export const { changeUser } = UserSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
const UserReducer = UserSlice.reducer;
export default UserReducer;
