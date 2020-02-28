import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

import Header from 'components/App/Header';
import BraodCastForm from 'components/App/BroadcastForm';


export default function BroadcastPage(props) {
  return (
    <Fragment>
      <Header />
      <BraodCastForm />
    </Fragment>
  );
}
