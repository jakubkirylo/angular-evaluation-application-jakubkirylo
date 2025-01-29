import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../reducers/app.reducers';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectBusyCount = createSelector(
  selectAppState,
  (state) => state.busyCount
);

export const selectIsBusy = createSelector(
  selectBusyCount,
  (busyCount) => busyCount > 0
);
