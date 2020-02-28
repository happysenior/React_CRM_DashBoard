import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeErrorSelector = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeIsLoggedSelector = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.isLogged,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeUnreadMessageSelector = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.unreadMessage,
  );

export {
  makeSelectLocation,
  makeErrorSelector,
  makeIsLoggedSelector,
  makeUnreadMessageSelector,
};
