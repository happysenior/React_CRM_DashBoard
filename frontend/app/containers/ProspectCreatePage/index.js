import React, { Fragment } from 'react';

import Header from 'components/App/Header';
import MenuHeader from 'components/App/MenuHeader';

const key = 'prospectCreatePage';

export default function ProspectCreatePage(props) {
  return (
    <Fragment>
      <Header />
      <MenuHeader />
      <ProspectCreate />
    </Fragment>
  );
}
