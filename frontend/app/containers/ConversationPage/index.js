import React, { Fragment } from 'react';

import Header from 'components/App/Header';
import Conversations from 'components/App/Conversations';

const key = 'conversationPage';

export default function ConversationPage(props) {
  return (
    <Fragment>
      <Header />
      <Conversations />
    </Fragment>
  );
}
