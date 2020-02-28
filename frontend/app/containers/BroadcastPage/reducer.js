/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
import { BROADCAST } from './constants';

export const initialState = {
  error: '',
  isSubmitting: false,
};

/* eslint-disable default-case, no-param-reassign */
const importCSVPageReducer = produce((draft, action) => {
  switch (action.type) {
    case BROADCAST:
      draft.error = '';
      draft.isSubmitting = false;
      break;
    case LOCATION_CHANGE:
      draft.error = '';
      draft.isSubmitting = false;
      break;
  }
}, initialState);

export default importCSVPageReducer;
