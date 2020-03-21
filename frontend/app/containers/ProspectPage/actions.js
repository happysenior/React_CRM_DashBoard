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

export function loadProspectsAction(filters) {
  console.log("loadprospection actions");
  console.log(filters);
  return {
    type: LOAD_PROSPECTS,
    payload: {
      filters,
    },
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
