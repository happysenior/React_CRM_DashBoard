import React, { Fragment } from 'react';

import Header from 'components/App/Header';
import Conversations from 'components/App/Conversations';

const key = 'conversationPage';

export default function ConversationPage(props) {
  const { match } = props;

  let { id } = match.params;


  return (
    <Fragment>
      <Header />
      <Conversations prospectId={id} />
    </Fragment>
  );
}
