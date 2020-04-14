/*
 *
 * LoginPage actions
 *
 */

import { CSV_SUBMIT, SUBMIT_END } from './constants';

export function csvSubmitAction({ csvFile, match, campaign }) {
  return {
    type: CSV_SUBMIT,
    payload: {
      csvFile,
      match,
      campaign
    },
  };
}

export function submitEndAction() {
  return {
    type: SUBMIT_END,
  };
}
