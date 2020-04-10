import React, { Fragment } from 'react';

import Header from 'components/App/Header';
import SequenceSetting from './SequenceSetting';

const key = 'sequenceSettingPage';

export default function SequenceSettingPage(props) {
  return (
    <Fragment>
      <Header />
      <SequenceSetting history={props.history} match={props.match} />
    </Fragment>
  );
}
