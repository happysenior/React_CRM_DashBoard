import React from 'react';
import ChatWrapper from './ChatWrapper';
import ChatHeaderWrapper from './ChatHeaderWrapper';
import ConversationMessages from './ConversationMessages';
import ConversationMessageWrapper from './ConversationMessageWrapper';
import ComposeMessage from './ComposeMessage';

const Chat = props => {
  return (
    <ChatWrapper>
      <ChatHeaderWrapper>
        <div>
          {props.prospect
            ? props.prospect.profile.firstName +
              ' ' +
              props.prospect.profile.lastName
            : null}
        </div>
      </ChatHeaderWrapper>
      <ConversationMessageWrapper>
        <ConversationMessages
          chat={props.chat}
          prospect={props.prospect}
          readMessage={props.readMessage}
        />
      </ConversationMessageWrapper>
      <ComposeMessage sendMessage={props.sendMessage} />
    </ChatWrapper>
  );
};

export default Chat;
