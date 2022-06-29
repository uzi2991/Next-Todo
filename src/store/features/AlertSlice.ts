import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../index';

type ALertType = 'success' | 'danger' | 'info';

type Alert = {
  type: ALertType;
  message: string;
};

type AlertState = {
  [key: string]: Alert | null;
};

const AlertSlice = createSlice({
  name: 'alert',
  initialState: {} as AlertState,
  reducers: {
    showAlert: (
      state,
      { payload }: PayloadAction<{ id: string; alert: Alert }>
    ) => {
      state[payload.id] = payload.alert;
    },
    clearAlert: (state: AlertState, { payload }: PayloadAction<string>) => {
      state[payload] = null;
    }
  }
});

export const createAlert =
  (id: string, alert: Alert) => (dispatch: AppDispatch) => {
    dispatch(showAlert({ id, alert }));
    setTimeout(() => dispatch(clearAlert(id)), 3000);
  };

export const { showAlert, clearAlert } = AlertSlice.actions;
export const selectAlertById = (state: RootState, id: string) =>
  state.alert[id];

const AlertReducer = AlertSlice.reducer;
export default AlertReducer;
