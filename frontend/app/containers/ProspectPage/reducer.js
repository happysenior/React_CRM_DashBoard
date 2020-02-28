/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
import {
  GO_SEND_BROADCAST,
  GO_IMPORT_CSV,
  LOAD_PROSPECTS,
  LOAD_PROSPECTS_SUCCESS,
  SELECT_PROSPECTS,
  GO_CONVERSATION,
  SET_CHECK_ALL,
} from './constants';

export const initialState = {
  prospects: [],
  selectedProspectIds: [],
  error: '',
  isLoading: false,
  checkAll: false,
};

/* eslint-disable default-case, no-param-reassign */
const prospectPageReducer = produce((draft, action) => {
  switch (action.type) {
    case GO_SEND_BROADCAST:
      draft.error = '';
      draft.isLoading = false;
      break;
    case GO_IMPORT_CSV:
      draft.error = '';
      draft.isLoading = false;
      break;
    case GO_CONVERSATION:
      draft.error = '';
      draft.isLoading = false;
      break;
    case LOAD_PROSPECTS:
      draft.isLoading = true;
      break;
    case LOAD_PROSPECTS_SUCCESS:
      draft.isLoading = true;
      draft.prospects = action.payload.prospects;
      break;
    case SELECT_PROSPECTS:
      draft.selectedProspectIds = action.payload.selectedProspectIds;
      break;
    case SET_CHECK_ALL:
      draft.checkAll = action.payload.checkAll;
    case LOCATION_CHANGE:
      draft.error = '';
      draft.isLoading = false;
      break;
  }
}, initialState);

export default prospectPageReducer;
