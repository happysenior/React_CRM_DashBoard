import React, { useReducer } from 'react';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { FormattedMessage } from 'react-intl';
import { push } from 'connected-react-router';
import messages from 'containers/LoginPage/messages';
import * as HttpStatus from 'http-status-codes';
// Import Utils
import ApiEndpoint from 'utils/api';
import request from 'utils/request';
import axios from 'axios';

// Import Services
import AuthService from 'services/auth.service';

// Import Selectors

// Import Actions

import { submitEndAction } from './actions';

// Import Constants

import { CSV_SUBMIT } from './constants';
import { string } from 'prop-types';

export function* csvSubmit({ payload: { csvFile, match, campaign } }) {
  const api = new ApiEndpoint();
  const auth = new AuthService();
  const token = auth.getToken();
  const requestURL = api.getCSVSubmitPath();

  try {
    let csv = new FormData();
    csv.append('csvFile', csvFile);
    csv.append('match', JSON.stringify(match));
    csv.append('campaign', campaign);
    const response = yield axios.post(requestURL, csv, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    yield put(submitEndAction());
    yield put(push('/prospects'));
  } catch (error) {
    console.log(error);
  }
}

export default function* importProspectCSVPageSaga() {
  yield takeLatest(CSV_SUBMIT, csvSubmit);
}
