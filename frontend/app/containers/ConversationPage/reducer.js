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
  SELECT_PROSPECTS,
} from './constants';

export const initialState = {
  prospects: [],
  selectedProspectIds: [],
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
    case LOAD_PROSPECTS:
      draft.isLoading = true;
    case LOAD_PROSPECTS_SUCCESS:
      draft.isLoading = true;
      draft.prospects = action.payload.prospects;
      break;
    case SELECT_PROSPECTS:
      let prospectIds = action.payload.prospectIds;
      let selectedProspectIds = prospectIds.concat(selectedProspectIds);
      let draftSelectedProspectIds = draft.selectedProspectIds;
      draft.selectedProspectIds = selectedProspectIds.filter(item => {
        const belongToFirst = draftSelectedProspectIds.includes(item);
        const belongToSecond = prospectIds.includes(item);
        if (belongToFirst === belongToSecond) return false;
        else return true;
      });
    case LOCATION_CHANGE:
      draft.error = '';
      draft.isLoading = false;
      break;
  }
}, initialState);

export default prospectPageReducer;
