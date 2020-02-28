/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
import {
  LOAD_LIST,
  LOAD_CHAT,
  LOAD_PROSPECT,
  LOAD_LIST_SUCCESS,
  LOAD_CHAT_SUCCESS,
  LOAD_PROSPECT_SUCCESS,
  SELECT_PROSPECT,
  SELECT_PROSPECT_SUCCESS,
  RECEIVE_NEW_MESSAGE,
  RELOAD_CONVERSATION_COUNT,
} from './constants';

export const initialState = {
  list: [],
  chat: [],
  prospect: null,
  selectedProspectId: null,
  error: '',
  isLoading: false,
  reloadCount: 0,
};

/* eslint-disable default-case, no-param-reassign */
const prospectPageReducer = produce((draft, action) => {
  switch (action.type) {
    case LOAD_LIST:
      draft.error = '';
      draft.isLoading = true;
      break;
    case LOAD_CHAT:
      draft.error = '';
      draft.isLoading = true;
      break;
    case LOAD_PROSPECT:
      draft.isLoading = true;
      break;
    case LOAD_LIST_SUCCESS:
      draft.list = action.payload.list;
      draft.isLoading = false;
      break;
    case LOAD_CHAT_SUCCESS:
      draft.chat = action.payload.chat;
      draft.isLoading = false;
      break;
    case LOAD_PROSPECT_SUCCESS:
      draft.isLoading = false;
      draft.prospect = action.payload.prospect;
      break;
    case SELECT_PROSPECT:
      // draft.selectedProspectId = action.payload.selectedProspectId;
      draft.list = draft.list.map((item, index) => {
        if (item.prospect._id == action.payload.selectedProspectId)
          return {
            ...item,
            unreadMessage: 0,
          };
        return item;
      });
      break;
    case SELECT_PROSPECT_SUCCESS:
      draft.selectedProspectId = action.payload.selectedProspectId;
      break;
    case RECEIVE_NEW_MESSAGE:
      console.log('reducer receive new message');
      break;
    case RELOAD_CONVERSATION_COUNT:
      draft.reloadCount = draft.reloadCount + 1;
      break;
    case LOCATION_CHANGE:
      draft.error = '';
      draft.isLoading = false;
      break;
  }
}, initialState);

export default prospectPageReducer;
