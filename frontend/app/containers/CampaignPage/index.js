import React, { Fragment } from 'react';

import Header from 'components/App/Header';
import CampaignList from './CampaignList';

const key = 'campaignPage';

export default function CampaignPage(props) {
  return (
    <Fragment>
      <Header />
      <CampaignList />
    </Fragment>
  );
}
