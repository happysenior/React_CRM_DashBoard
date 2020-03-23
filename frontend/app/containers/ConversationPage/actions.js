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
  RECEIVE_NEW_MESSAGE,
  TEST,
  RELOAD_CONVERSATION,
  UPDATE_PROSPECT,
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

export function receiveNewMessageAction(message) {
  return {
    type: RECEIVE_NEW_MESSAGE,
    payload: {
      message,
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

export function reloadConversationAction() {
  return {
    type: RELOAD_CONVERSATION,
  };
}

export function updateProspectAction(field, value, prospectId) {
  return {
    type: UPDATE_PROSPECT,
    payload: {
      field,
      value,
      prospectId,
    },
  };
}
