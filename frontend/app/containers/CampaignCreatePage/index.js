import React, { Fragment } from 'react';

import Header from 'components/App/Header';
import CampaignCreate from './CampaignCreate';

const key = 'campaignCreatePage';

export default function CampaignCreatePage(props) {
  return (
    <Fragment>
      <Header />
      <CampaignCreate />
    </Fragment>
  );
}
