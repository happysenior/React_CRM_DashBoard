import React, { Fragment } from 'react';

import Header from 'components/App/Header';
import CampaignCreate from './CampaignCreate';

import ApiEndpoint from 'utils/api';
import AuthService from 'services/auth.service';

const key = 'campaignCreatePage';

export default function CampaignCreatePage(props) {
  return (
    <Fragment>
      <Header />
      <CampaignCreate />
    </Fragment>
  );
}
