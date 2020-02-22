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
} from './constants';

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

export function loadProspectsSuccessAction(prospects) {
  return {
    type: LOAD_PROSPECTS_SUCCESS,
    payload: {
      prospects,
    },
  };
}

export function selectProspectsAction(prospectIds) {
  return {
    type: SELECT_PROSPECTS,
    payload: {
      prospectIds,
    },
  };
}
