import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the prospect page state domain
 */

const selectProspectPageDomain = state => state.prospectPage || initialState;

/**
 * Other specific selectors
 */

const makeErrorSelector = () =>
  createSelector(
    selectProspectPageDomain,
    substate => substate.error,
  );

const makeIsLoadingSelector = () =>
  createSelector(
    selectProspectPageDomain,
    substate => substate.isLoading,
  );

const makeProspectsSelector = () =>
  createSelector(
    selectProspectPageDomain,
    substate => substate.prospects,
  );

const makeSelectedProspectIdsSelector = () =>
  createSelector(
    selectProspectPageDomain,
    substate => substate.selectedProspectIds,
  );

const makeCheckAllSelector = () =>
  createSelector(
    selectProspectPageDomain,
    substate => substate.checkAll,
  );

const makePageSelector = () =>
  createSelector(
    selectProspectPageDomain,
    substate => substate.page,
  );

const makeLastPageSelector = () =>
  createSelector(
    selectProspectPageDomain,
    substate => substate.lastPage,
  );

const makeTotalProspectsSelector = () =>
  createSelector(
    selectProspectPageDomain,
    substate => substate.totalProspects,
  );

const makeCheckedPagesSelector = () =>
  createSelector(
    selectProspectPageDomain,
    substate => substate.checkedPages,
  );

/**
 * Default selector used by LoginPage
 */

const makeSelectProspectPage = () =>
  createSelector(
    selectProspectPageDomain,
    substate => substate,
  );

export default makeSelectProspectPage;
export {
  makeErrorSelector,
  makeIsLoadingSelector,
  makeSelectedProspectIdsSelector,
  makeProspectsSelector,
  makeCheckAllSelector,
  makePageSelector,
  makeLastPageSelector,
  makeTotalProspectsSelector,
  makeCheckedPagesSelector
};
