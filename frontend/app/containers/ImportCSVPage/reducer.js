/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
import { SUBMIT_END, CSV_SUBMIT } from './constants';

export const initialState = {
  error: '',
  isSubmitting: false,
};

/* eslint-disable default-case, no-param-reassign */
const importCSVPageReducer = produce((draft, action) => {
  switch (action.type) {
    case CSV_SUBMIT:
      draft.error = '';
      draft.isSubmitting = true;
      break;
    case SUBMIT_END:
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
