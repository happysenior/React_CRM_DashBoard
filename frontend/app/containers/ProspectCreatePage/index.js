import React, { Fragment } from 'react';

import Header from 'components/App/Header';
import ProspectCreate from './ProspectCreate';

const key = 'prospectCreatePage';

export default function ProspectCreatePage(props) {
  return (
    <Fragment>
      <Header />
      <ProspectCreate />
    </Fragment>
  );
}
