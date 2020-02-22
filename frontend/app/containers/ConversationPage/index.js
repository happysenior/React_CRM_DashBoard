import React, { Fragment } from 'react';

import Header from 'components/App/Header';
// import Conversations from 'components/App/Conversations';

const key = 'conversationPage';

export default function ConversationPage(props) {
  const { match } = props;

  let { id } = match.params;

  console.log(id);

  return (
    <Fragment>
      <Header />
      <div> {id} </div>
      {/* <Conversations /> */}
    </Fragment>
  );
}
