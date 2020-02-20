/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
import { GO_SEND_BROADCAST } from './constants';

export const initialState = {
  csv: null,
  error: '',
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const importCSVPageReducer = produce((draft, action) => {
  switch (action.type) {
    case GO_SEND_BROADCAST:
      draft.error = '';
      draft.isLoading = false;
      break;
    case LOCATION_CHANGE:
      draft.error = '';
      draft.isLoading = false;
      break;
  }
}, initialState);

export default importCSVPageReducer;
