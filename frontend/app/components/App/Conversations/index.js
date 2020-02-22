import React from 'react';
import ConversationsWrapper from './ConversationsWrapper';
import ConversationsRootWrapper from './ConversationsRootWrapper';
import ConversationsSidebarWrapper from './ConversationsSidebarWrapper';
import ConversationsSidebarHeader from './ConversationsSidebarHeader';
import Chat from './Chat';
import ProspectInfo from './ProspectInfo';
import ConversationsList from './ConversationsList';

const Conversations = props => {
  return (
    <ConversationsWrapper>
      <ConversationsSidebarWrapper>
        <ConversationsSidebarHeader />
        <ConversationsList />
      </ConversationsSidebarWrapper>
      <ConversationsRootWrapper>
        <Chat />
        <ProspectInfo />
      </ConversationsRootWrapper>
    </ConversationsWrapper>
  );
};

export default Conversations;
