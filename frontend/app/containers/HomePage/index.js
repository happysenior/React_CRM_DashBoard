/**
 *
 * HomePage
 *
 */

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/App/reducer';

// Import Actions
import { isLoggedAction } from './actions';

import saga from './saga';

export default function HomePage() {
  const dispatch = useDispatch();
  useInjectSaga({ key: 'homePage', saga });
  useInjectReducer({ key: 'appPage', reducer });
  
  const isLogged = () => dispatch(isLoggedAction());

  useEffect(() => {
    isLogged();
  }, []);

  return null;
}
