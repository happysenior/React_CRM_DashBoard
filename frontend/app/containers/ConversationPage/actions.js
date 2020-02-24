/*
 *
 * LoginPage actions
 *
 */

import {
  LOAD_LIST,
  LOAD_CHAT,
  LOAD_PROSPECT,
  LOAD_LIST_SUCCESS,
  LOAD_CHAT_SUCCESS,
  LOAD_PROSPECT_SUCCESS,
  SELECT_PROSPECT,
  SELECT_PROSPECT_SUCCESS,
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
} from './constants';

export function loadListAction() {
  return {
    type: LOAD_LIST,
  };
}

export function loadListSuccessAction(list) {
  return {
    type: LOAD_LIST_SUCCESS,
    payload: {
      list,
    },
  };
}

export function loadChatAction() {
  return {
    type: LOAD_CHAT,
  };
}

export function loadChatSuccessAction(chat) {
  return {
    type: LOAD_CHAT_SUCCESS,
    payload: {
      chat,
    },
  };
}
export function loadProspectAction() {
  return {
    type: LOAD_PROSPECT,
  };
}

export function loadProspectSuccessAction(prospect) {
  return {
    type: LOAD_PROSPECT_SUCCESS,
    payload: {
      prospect,
    },
  };
}

export function selectProspectAction(prospectId) {
  return {
    type: SELECT_PROSPECT,
    payload: {
      prospectId,
    },
  };
}

export function selectProspectSuccessAction(selectedProspectId) {
  return {
    type: SELECT_PROSPECT_SUCCESS,
    payload: {
      selectedProspectId,
    },
  };
}

export function sendMessageAction(message) {
  return {
    type: SEND_MESSAGE,
    payload: {
      message,
    },
  };
}
