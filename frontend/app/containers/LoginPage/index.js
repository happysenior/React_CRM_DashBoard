/**
 *
 * LoginPage
 *
 */

import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

// Import Components
import LoginForm from 'components/LoginForm';

import messages from './messages';

// Import Actions
import { isLoggedAction } from './actions';

const key = 'loginPage';

export default function LoginPage() {
  const dispatch = useDispatch();
  const isLogged = () => dispatch(isLoggedAction());

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    isLogged();
  }, []);

  return <LoginForm />;
}
