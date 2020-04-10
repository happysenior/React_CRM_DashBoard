import React, { Fragment } from 'react';

import Header from 'components/App/Header';
import CampaignEdit from './CampaignEdit';

const key = 'campaignEditPage';

export default function CampaignEditPage(props) {
  return (
    <Fragment>
      <Header />
      <CampaignEdit />
    </Fragment>
  );
}
