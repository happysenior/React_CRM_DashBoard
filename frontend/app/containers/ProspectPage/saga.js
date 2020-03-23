import React, { useReducer } from 'react';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { FormattedMessage } from 'react-intl';
import { push } from 'connected-react-router';
import * as HttpStatus from 'http-status-codes';
// Import Utils
import ApiEndpoint from 'utils/api';
import request from 'utils/request';

// Import Services
import AuthService from 'services/auth.service';

// Import Selectors

import {
  makePageSelector,
  makeFilterSelector,
  makeSelectedProspectIdsSelector,
  makeCheckAllSelector,
  makeSearchKeySelector,
} from './selectors';

// Import Actions

import { selectProspectSuccessAction } from 'containers/ConversationPage/actions';
import {
  loadProspectsSuccessAction,
  selectPageSuccessAction,
  loadProspectsAction,
  filterSelectAction,
  filterSelectSuccessAction,
  assignCampaignAction,
  searchKeySaveAction,
} from './actions';

// Import Constants

import {
  GO_SEND_BROADCAST,
  GO_IMPORT_CSV,
  LOAD_PROSPECTS,
  GO_CONVERSATION,
  SELECT_PAGE,
  FILTER_SEELCT,
  ASSIGN_CAMPAIGN,
  ASSIGN_STATUS,
  DELETE_PROSPECTS,
  SEARCH,
} from './constants';
import FilterDropdown from '../../components/App/ProspectList/FilterDropdown';
import { func } from 'prop-types';

export function* goSendBroadcast() {
  const auth = new AuthService();
  const isLogged = auth.loggedIn();

  if (isLogged) return yield put(push('/broadcast'));
}

export function* goImportCSV() {
  const auth = new AuthService();
  const isLogged = auth.loggedIn();

  if (isLogged) return yield put(push('/prospects/import'));
}

export function* goConversation({ payload: { prospectId } }) {
  const auth = new AuthService();
  const isLogged = auth.loggedIn();

  if (isLogged) {
    yield put(selectProspectSuccessAction(prospectId));
    yield put(push('/conversations'));
  }
}

export function* loadProspects() {
  const api = new ApiEndpoint();
  const auth = new AuthService();
  const token = auth.getToken();
  const requestURL = api.getLoadProspectsPath();
  const page = yield select(makePageSelector());
  try {
    const filters = yield select(makeFilterSelector());
    const searchKey = yield select(makeSearchKeySelector());
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        filters: filters,
        searchKey: '',
        page,
      }),
    });

    if (response.success) {
      yield put(loadProspectsSuccessAction(response));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* selectPage({ payload: { page } }) {
  try {
    yield put(selectPageSuccessAction(page));
    yield put(loadProspectsAction());
  } catch (error) {
    console.log(error);
  }
}

export function* filterSelect({ payload: { filters } }) {
  try {
    yield put(filterSelectSuccessAction(filters));
    yield put(loadProspectsAction());
  } catch (error) {
    console.log(error);
  }
}

export function* assignCampaign({ payload: { campaign, autoSequence } }) {
  const api = new ApiEndpoint();
  const auth = new AuthService();
  const token = auth.getToken();
  const requestURL = api.getAssignCampaignPath();
  try {
    const filters = yield select(makeFilterSelector());
    const selectedProspectIds = yield select(makeSelectedProspectIdsSelector());
    const checkAll = yield select(makeCheckAllSelector());
    const response = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        filters: filters,
        selectedProspectIds,
        checkAll,
        campaign,
        autoSequence,
      }),
    });

    if (response.success) {
      yield put(loadProspectsAction());
    }
  } catch (error) {
    console.log(error);
  }
}

export function* assignStatus({ payload: { status } }) {
  const api = new ApiEndpoint();
  const auth = new AuthService();
  const token = auth.getToken();
  const requestURL = api.getAssignStatusPath();
  try {
    const filters = yield select(makeFilterSelector());
    const selectedProspectIds = yield select(makeSelectedProspectIdsSelector());
    const checkAll = yield select(makeCheckAllSelector());
    const response = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        filters: filters,
        selectedProspectIds,
        checkAll,
        status,
      }),
    });

    if (response.success) {
      yield put(loadProspectsAction());
    }
  } catch (error) {
    console.log(error);
  }
}

export function* deleteProspects() {
  const api = new ApiEndpoint();
  const auth = new AuthService();
  const token = auth.getToken();
  const requestURL = api.getDeleteProspectsPath();
  try {
    const filters = yield select(makeFilterSelector());
    const selectedProspectIds = yield select(makeSelectedProspectIdsSelector());
    const checkAll = yield select(makeCheckAllSelector());
    const response = yield call(request, requestURL, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        filters: filters,
        selectedProspectIds,
        checkAll,
      }),
    });

    if (response.success) {
      yield put(loadProspectsAction());
    }
  } catch (error) {
    console.log(error);
  }
}

export function* search({ payload: { searchKey } }) {
  try {
    yield put(searchKeySaveAction(searchKey));
    yield put(loadProspectsAction());
  } catch (error) {
    console.log(error);
  }
}

export default function* prospectPageSaga() {
  yield takeLatest(GO_SEND_BROADCAST, goSendBroadcast);
  yield takeLatest(GO_IMPORT_CSV, goImportCSV);
  yield takeLatest(LOAD_PROSPECTS, loadProspects);
  yield takeLatest(GO_CONVERSATION, goConversation);
  yield takeLatest(SELECT_PAGE, selectPage);
  yield takeLatest(FILTER_SEELCT, filterSelect);
  yield takeLatest(ASSIGN_CAMPAIGN, assignCampaign);
  yield takeLatest(ASSIGN_STATUS, assignStatus);
  yield takeLatest(DELETE_PROSPECTS, deleteProspects);
  yield takeLatest(SEARCH, search);
}
