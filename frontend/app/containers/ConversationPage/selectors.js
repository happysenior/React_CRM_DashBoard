import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectConversationPageDomain = state =>
  state.conversationPage || initialState;

/**
 * Other specific selectors
 */

const makeErrorSelector = () =>
  createSelector(
    selectConversationPageDomain,
    substate => substate.error,
  );

const makeIsLoadingSelector = () =>
  createSelector(
    selectConversationPageDomain,
    substate => substate.isLoading,
  );

const makeListSelector = () =>
  createSelector(
    selectConversationPageDomain,
    substate => substate.list,
  );

const makeChatSelector = () =>
  createSelector(
    selectConversationPageDomain,
    substate => substate.chat,
  );

const makeProspectSelector = () =>
  createSelector(
    selectConversationPageDomain,
    substate => substate.prospect,
  );

const makeSelectedProspectIdSelector = () =>
  createSelector(
    selectConversationPageDomain,
    substate => substate.selectedProspectId,
  );

const makeSelectConversationPage = () =>
  createSelector(
    selectConversationPageDomain,
    substate => substate,
  );

export default makeSelectConversationPage;
export {
  makeErrorSelector,
  makeIsLoadingSelector,
  makeListSelector,
  makeChatSelector,
  makeProspectSelector,
  makeSelectedProspectIdSelector,
};
