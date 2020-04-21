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
  reloadConversationAction,
  updateProspectAction,
  changeLocalProspectAction,
  decreaseUnreadMessageAction,
} from 'containers/ConversationPage/actions';

import { readMessageAction } from 'containers/App/actions';
import {
  makeSelectedProspectIdSelector,
  makeListSelector,
  makeChatSelector,
  makeProspectSelector,
  makeReloadCountSelector,
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
  reloadCount: makeReloadCountSelector(),
});

const Conversations = props => {
  const [state, setState] = useState({
    reloadCount: 0,
  });

  const dispatch = useDispatch();

  useInjectSaga({ key, saga });

  useInjectReducer({ key, reducer });

  const sendMessage = message => {
    dispatch(sendMessageAction(message));
  };

  const { list, chat, prospect, selectedProspectId, reloadCount } = useSelector(
    stateSelector,
  );

  const goConversation = prospectId => {
    // for (let i = 0; i < list.length; i++) {
    //   if (prospectId == list[i].prospect._id) {
    //     if (list[i].unreadMessage)
    //       dispatch(readMessageAction(list[i].unreadMessage));
    //   }
    // }
    dispatch(selectProspectAction(prospectId));
  };

  const readMessage = () => {
    for (let i = 0; i < list.length; i++) {
      if (selectedProspectId == list[i].prospect._id) {
        if (list[i].unreadMessage > 0) {
          dispatch(readMessageAction(list[i].unreadMessage));
          dispatch(decreaseUnreadMessageAction(selectedProspectId));
        }
      }
    }
  };

  useEffect(() => {
    if (selectedProspectId) {
      goConversation(selectedProspectId);
    } else {
      dispatch(loadListAction());
    }
  }, []);

  useEffect(() => {
    if (state.reloadCount != reloadCount) {
      setState({ ...state, reloadCount });
      dispatch(reloadConversationAction());
    }
  });

  const changeProspectProperty = (field, value, prospectId) => {
    dispatch(updateProspectAction(field, value, prospectId));
  };

  const changeLocalProspectProperty = async property => {
    await dispatch(changeLocalProspectAction(property));
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
        <Chat
          chat={chat}
          prospect={prospect}
          sendMessage={sendMessage}
          readMessage={readMessage}
        />
        <ProspectInfo
          changeProspectProperty={changeProspectProperty}
          changeLocalProspectProperty={changeLocalProspectProperty}
        />
      </ConversationsRootWrapper>
    </ConversationsWrapper>
  );
};

export default Conversations;
