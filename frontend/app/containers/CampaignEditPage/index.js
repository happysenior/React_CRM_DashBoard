import React, { Fragment } from 'react';

import Header from 'components/App/Header';
import CampaignEdit from './CampaignEdit';

const key = 'campaignEditPage';

export default function CampaignCreatePage(props) {
  return (
    <Fragment>
      <Header />
      <CampaignEdit />
    </Fragment>
  );
}
