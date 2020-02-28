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

// Import Actions

import { selectProspectSuccessAction } from 'containers/ConversationPage/actions';
import { loadProspectsSuccessAction } from '../ProspectPage/actions';

// Import Constants

import {
  GO_SEND_BROADCAST,
  GO_IMPORT_CSV,
  LOAD_PROSPECTS,
  GO_CONVERSATION,
} from './constants';

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

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        filter: [],
        searchKey: '',
      }),
    });

    if (response.success) {
      yield put(loadProspectsSuccessAction(response.prospects));
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* prospectPageSaga() {
  yield takeLatest(GO_SEND_BROADCAST, goSendBroadcast);
  yield takeLatest(GO_IMPORT_CSV, goImportCSV);
  yield takeLatest(LOAD_PROSPECTS, loadProspects);
  yield takeLatest(GO_CONVERSATION, goConversation);
}
