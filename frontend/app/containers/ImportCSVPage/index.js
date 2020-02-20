import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

import Header from 'components/App/Header';
import ImportCSVForm from 'components/App/ImportCSVForm';

const key = 'importCSVPage';

export default function ImportCSVPage(props) {
  
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <Fragment>
      <Header />
      <ImportCSVForm />
    </Fragment>
  );
}
