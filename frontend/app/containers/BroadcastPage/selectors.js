import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectImportCSVPageDomain = state => state.importCSV || initialState;

/**
 * Other specific selectors
 */

const makeErrorSelector = () =>
  createSelector(
    selectImportCSVPageDomain,
    substate => substate.error,
  );

const makeIsSubmittingSelector = () =>
  createSelector(
    selectImportCSVPageDomain,
    substate => substate.isLoading,
  );

const makeSelectImportCSVPage = () =>
  createSelector(
    selectImportCSVPageDomain,
    substate => substate,
  );

export default makeSelectImportCSVPage;
export {
  makeErrorSelector,
  makeIsSubmittingSelector,
};
