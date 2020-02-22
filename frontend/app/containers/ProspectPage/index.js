import React, { Fragment } from 'react';

import Header from 'components/App/Header';
import MenuHeader from 'components/App/MenuHeader';
import ProspectList from 'components/App/ProspectList';

const key = 'prospectPage';

export default function ProspectPage(props) {
  return (
    <Fragment>
      <Header />
      <MenuHeader />
      <ProspectList />
    </Fragment>
  );
}
