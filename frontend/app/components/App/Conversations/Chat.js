import React from 'react';
import ChatWrapper from './ChatWrapper';
import ChatHeaderWrapper from './ChatHeaderWrapper';
import ConversationMessages from './ConversationMessages';
import ConversationMessageWrapper from './ConversationMessageWrapper';
import ComposeMessage from './ComposeMessage';

const Chat = props => {
  const firstName = 'firstName';
  const lastName = 'lastName';
  return (
    <ChatWrapper>
      <ChatHeaderWrapper>
        <div>{firstName + ' ' + lastName}</div>
      </ChatHeaderWrapper>
      <ConversationMessageWrapper>
        <ConversationMessages />
      </ConversationMessageWrapper>
      <ComposeMessage />
    </ChatWrapper>
  );
};

export default Chat;
