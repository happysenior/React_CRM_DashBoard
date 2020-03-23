/*
 *
 * LoginPage actions
 *
 */

import {
  GO_SEND_BROADCAST,
  GO_IMPORT_CSV,
  LOAD_PROSPECTS,
  LOAD_PROSPECTS_SUCCESS,
  SELECT_PROSPECTS,
  GO_CONVERSATION,
  SET_CHECK_ALL,
  SET_CHECK_PAGE,
  SELECT_PAGE,
  SELECT_PAGE_SUCCESS,
  FILTER_SEELCT,
  FILTER_SEELCT_SUCCESS,
  ASSIGN_CAMPAIGN,
  ASSIGN_STATUS,
  DELETE_PROSPECTS,
  SEARCH,
  SEARCH_KEY_SAVE,
  UPDATE_PROSPECT
} from './constants';
import { func } from 'prop-types';

export function goSendBroadcastAction() {
  return {
    type: GO_SEND_BROADCAST,
  };
}

export function goImportCSVAction() {
  return {
    type: GO_IMPORT_CSV,
  };
}

export function loadProspectsAction() {
  return {
    type: LOAD_PROSPECTS,
  };
}

export function loadProspectsSuccessAction(result) {
  return {
    type: LOAD_PROSPECTS_SUCCESS,
    payload: {
      result,
    },
  };
}

export function selectProspectsAction(prospectIds) {
  return {
    type: SELECT_PROSPECTS,
    payload: {
      selectedProspectIds: prospectIds,
    },
  };
}

export function goConversationAction(prospectId) {
  return {
    type: GO_CONVERSATION,
    payload: {
      prospectId,
    },
  };
}

export function setCheckAllAction(checkAll) {
  return {
    type: SET_CHECK_ALL,
    payload: {
      checkAll,
    },
  };
}

export function selectPageAction(page) {
  return {
    type: SELECT_PAGE,
    payload: {
      page,
    },
  };
}

export function selectPageSuccessAction(page) {
  return {
    type: SELECT_PAGE_SUCCESS,
    payload: {
      page,
    },
  };
}

export function setCheckedPageAction(checkedPages) {
  return {
    type: SET_CHECK_PAGE,
    payload: {
      checkedPages,
    },
  };
}

export function filterSelectAction(filters) {
  return {
    type: FILTER_SEELCT,
    payload: {
      filters,
    },
  };
}

export function filterSelectSuccessAction(filters) {
  return {
    type: FILTER_SEELCT_SUCCESS,
    payload: {
      filters,
    },
  };
}

export function assignCampaignAction(campaign, autoSequence) {
  return {
    type: ASSIGN_CAMPAIGN,
    payload: {
      campaign,
      autoSequence,
    },
  };
}

export function assignStatusAction(status) {
  return {
    type: ASSIGN_STATUS,
    payload: {
      status,
    },
  };
}

export function deleteProspectsAction() {
  return {
    type: DELETE_PROSPECTS,
  };
}

export function searchAction(searchKey) {
  return {
    type: SEARCH,
    payload: {
      searchKey,
    },
  };
}

export function searchKeySaveAction(searchKey) {
  return {
    type: SEARCH_KEY_SAVE,
    payload: {
      searchKey,
    },
  };
}

