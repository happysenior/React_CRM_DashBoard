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
  makeErrorSelector,
  makeIsLoadingSelector,
  makeListSelector,
  makeChatSelector,
  makeProspectSelector,
  makeSelectedProspectIdSelector,
} from './selectors';

// Import Actions
import {
  loadListSuccessAction,
  loadChatSuccessAction,
  loadProspectSuccessAction,
  loadListAction,
  loadChatAction,
  loadProspectAction,
  selectProspectAction,
  selectProspectSuccessAction,
} from './actions';

// Import Constants
import {
  LOAD_LIST,
  LOAD_CHAT,
  LOAD_PROSPECT,
  LOAD_LIST_SUCCESS,
  LOAD_CHAT_SUCCESS,
  LOAD_PROSPECT_SUCCESS,
  SELECT_PROSPECT,
  SEND_MESSAGE,
  GO_CONVERSATION,
  RECEIVE_NEW_MESSAGE,
  RELOAD_CONVERSATION,
  UPDATE_PROSPECT,
} from './constants';
import { func } from 'prop-types';

export function* loadList() {
  const auth = new AuthService();
  const isLogged = auth.loggedIn();
  const token = auth.getToken();
  const api = new ApiEndpoint();
  if (!isLogged) return yield put(push('/login'));

  const requestURL = api.getLoadConversationListPath();
  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.success) yield put(loadListSuccessAction(response.list));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function* loadChat() {
  const auth = new AuthService();
  const isLogged = auth.loggedIn();
  const token = auth.getToken();
  const api = new ApiEndpoint();

  if (!isLogged) return yield put(push('/login'));
  const selectedProspectId = yield select(makeSelectedProspectIdSelector());
  if (!selectedProspectId) return;
  const requestURL = api.getLoadConversationChatPath(selectedProspectId);
  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.success) yield put(loadChatSuccessAction(response.chat));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function* loadProspect() {
  const auth = new AuthService();
  const token = auth.getToken();
  const api = new ApiEndpoint();
  const isLogged = auth.loggedIn();

  if (!isLogged) return yield put(push('/login'));

  const selectedProspectId = yield select(makeSelectedProspectIdSelector());
  if (!selectedProspectId) return;

  const requestURL = api.getLoadConversationProspectPath(selectedProspectId);

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.success)
      yield put(loadProspectSuccessAction(response.prospect));
  } catch (error) {
    console.log(error);
  }
}

export function* selectProspect({ payload: { prospectId } }) {
  try {
    const auth = new AuthService();
    const token = auth.getToken();
    const api = new ApiEndpoint();

    const requestURL = api.getMarkAsReadConversationPath(prospectId);

    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    yield put(selectProspectSuccessAction(prospectId));
    yield put(loadListAction());
    yield put(loadChatAction());
    yield put(loadProspectAction());
  } catch (error) {
    console.log(error);
  }
}

export function* sendMessage({ payload: { message } }) {
  const auth = new AuthService();
  const token = auth.getToken();
  const api = new ApiEndpoint();
  const isLogged = auth.loggedIn();

  if (!isLogged) return yield put(push('/login'));

  const selectedProspectId = yield select(makeSelectedProspectIdSelector());
  if (!selectedProspectId) return;
  const requestURL = api.getSendMessagePath(selectedProspectId);

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message,
      }),
    });

    if (response.success) {
      yield put(selectProspectAction(selectedProspectId));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* receiveNewMessage() {
  yield put(loadChatAction());
}

export function* reloadConversation() {
  yield put(loadListAction());
  yield put(loadChatAction());
  yield put(loadProspectAction());
}

export function* updateProspect({ payload: { field, value, prospectId } }) {
  const auth = new AuthService();
  const token = auth.getToken();
  const api = new ApiEndpoint();
  const isLogged = auth.loggedIn();

  if (!isLogged) return yield put(push('/login'));

  const requestURL = api.getChangeProspectPropertyPath(prospectId);

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        field,
        value,
      }),
    });

    if (response.success) {
      yield put(selectProspectAction(prospectId));
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* conversationPageSaga() {
  yield takeLatest(SELECT_PROSPECT, selectProspect);
  yield takeLatest(LOAD_LIST, loadList);
  yield takeLatest(LOAD_CHAT, loadChat);
  yield takeLatest(LOAD_PROSPECT, loadProspect);
  yield takeLatest(SEND_MESSAGE, sendMessage);
  yield takeLatest(RECEIVE_NEW_MESSAGE, receiveNewMessage);
  yield takeLatest(RELOAD_CONVERSATION, reloadConversation);
  yield takeLatest(UPDATE_PROSPECT, updateProspect);
}
