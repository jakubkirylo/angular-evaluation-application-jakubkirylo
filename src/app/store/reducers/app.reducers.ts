import { createReducer, on } from '@ngrx/store';
import { AppActions } from '../actions/app.actions';

export type AppState = {
  busyCount: number;
};

export const initialState: AppState = {
  busyCount: 0,
};

export const appReducer = createReducer(
  initialState,
  on(AppActions.increaseBusy, (state) => ({
    ...state,
    busyCount: state.busyCount + 1,
  })),
  on(AppActions.decreaseBusy, (state) => {
    if (state.busyCount === 0) {
      console.warn(
        '[AppState] Logical error: more decreaseBusy calls than increaseBusy.'
      );
      return state;
    }
    return {
      ...state,
      busyCount: state.busyCount - 1,
    };
  }),
  on(AppActions.clearBusy, () => initialState)
);
