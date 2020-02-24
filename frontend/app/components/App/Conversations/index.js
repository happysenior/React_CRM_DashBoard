import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/ConversationPage/reducer';
import saga from 'containers/ConversationPage/saga';
import {
  loadListAction,
  loadChatAction,
  loadProspectAction,
  selectProspectAction,
  sendMessageAction,
  goConversationAction,
} from 'containers/ConversationPage/actions';

import {
  makeSelectedProspectIdSelector,
  makeListSelector,
  makeChatSelector,
  makeProspectSelector,
} from 'containers/ConversationPage/selectors';

import ConversationsWrapper from './ConversationsWrapper';
import ConversationsRootWrapper from './ConversationsRootWrapper';
import ConversationsSidebarWrapper from './ConversationsSidebarWrapper';
import ConversationsSidebarHeader from './ConversationsSidebarHeader';
import Chat from './Chat';
import ProspectInfo from './ProspectInfo';
import ConversationsList from './ConversationsList';

const key = 'conversationPage';

const stateSelector = createStructuredSelector({
  list: makeListSelector(),
  chat: makeChatSelector(),
  prospect: makeProspectSelector(),
  selectedProspectId: makeSelectedProspectIdSelector(),
});

const Conversations = props => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useInjectSaga({ key, saga });

  useInjectReducer({ key, reducer });
  useEffect(() => {
    if (!loaded) {
      dispatch(selectProspectAction(props.prospectId));
      setLoaded(true);
    }
  }, []);

  const sendMessage = message => {
    dispatch(sendMessageAction(message));
  };

  const { list, chat, prospect, selectedProspectId } = useSelector(
    stateSelector,
  );

  const goConversation = prospectId => {
    dispatch(selectProspectAction(prospectId));
  };

  return (
    <ConversationsWrapper>
      <ConversationsSidebarWrapper>
        <ConversationsSidebarHeader />
        <ConversationsList
          list={list}
          prospectId={selectedProspectId}
          goConversation={goConversation}
        />
      </ConversationsSidebarWrapper>
      <ConversationsRootWrapper>
        <Chat chat={chat} prospect={prospect} sendMessage={sendMessage} />
        <ProspectInfo prospect={prospect} />
      </ConversationsRootWrapper>
    </ConversationsWrapper>
  );
};

export default Conversations;
