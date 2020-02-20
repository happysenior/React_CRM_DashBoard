/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
import { GO_SEND_BROADCAST, GO_IMPORT_CSV } from './constants';

export const initialState = {
  prospects: [],
  error: '',
  isLoading: false,
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
    case LOCATION_CHANGE:
      draft.error = '';
      draft.isLoading = false;
      break;
  }
}, initialState);

export default prospectPageReducer;
