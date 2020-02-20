import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectLoginPageDomain = state => state.loginPage || initialState;

/**
 * Other specific selectors
 */

const makeErrorSelector = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate.error,
  );

const makeIsLoadingSelector = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate.isLoading,
  );

/**
 * Default selector used by LoginPage
 */

const makeSelectLoginPage = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate,
  );

export default makeSelectLoginPage;
export {
  makeErrorSelector,
  makeIsLoadingSelector,
};
