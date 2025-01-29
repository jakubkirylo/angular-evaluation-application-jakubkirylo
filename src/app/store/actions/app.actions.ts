import { createAction } from '@ngrx/store';

export const increaseBusy = createAction('[App] Increase Busy');
export const decreaseBusy = createAction('[App] Decrease Busy');
export const clearBusy = createAction('[App] Clear Busy');

export const AppActions = {
  increaseBusy,
  decreaseBusy,
  clearBusy,
};
