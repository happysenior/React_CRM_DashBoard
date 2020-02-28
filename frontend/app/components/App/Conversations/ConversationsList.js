import React from 'react';
import styled from 'styled-components';
import ProspectAvatar from './ProspectAvatar';
const ListWrapper = styled.div`
  flex: 1 1 0%;
  overflow: scroll;
  padding-top: 30px;
`;

const MarginTop30Wrapper = styled.div`
  margin-top: 30px;
`;

const ConversationListItemWrapper = styled.div`
  height: 80px;
  position: relative;
  cursor: pointer;
  display: grid;
  box-sizing: border-box;
  grid-template-rows: 24px 24px;
  grid-template-columns: 40px 1fr auto;
  grid-template-areas:
    'avatar name date'
    'avatar message badge';
  padding: 16px;
  gap: 0px 16px;
`;

const ConversationTitle = styled.div`
  font-size: 1rem;
  color: rgb(53, 65, 71);
  margin-bottom: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  grid-area: name / name / name / name;
  overflow: hidden;
  flex: 1 1 0%;
`;

const ConversationTime = styled.div`
  font-size: 0.75rem;
  grid-area: date / date / date / date;
`;

const ConversationSubTitle = styled.div`
  font-size: 0.875rem;
  color: rgb(153, 153, 153);
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
  flex: 1 1 0%;
  grid-area: message / message / message / message;
  overflow: hidden;
`;

const ConversationBadge = styled.div`
  font-size: 0.75rem;
  grid-area: badge / badge / badge / badge;
  width: 18px;
  height: 18px;
  background-color: red;
  font-weight: 400;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  transform: translate(25%, -25%);
  border-radius: 50%;
  color: white;
`;

import { roundFormatDate } from 'utils/helper';

const ConversationsList = props => {
  return (
    <ListWrapper>
      <MarginTop30Wrapper>
        {props.list
          ? props.list.map((item, index) => {
              const className =
                item.prospect._id === props.prospectId
                  ? 'selected-prospect'
                  : 'no-selected-prospect';
              return (
                <ConversationListItemWrapper
                  className={className}
                  key={`${item._id}_${item.prospect._id}`}
                  onClick={() => props.goConversation(item.prospect._id)}
                >
                  <ProspectAvatar
                    firstName={item.prospect.firstName}
                    lastName={item.prospect.lastName}
                    uid={item.prospect._id}
                    size={'40px'}
                    color={'#3399CC'}
                  />
                  <ConversationTitle>{`${item.prospect.firstName} ${item.prospect.lastName}`}</ConversationTitle>
                  <ConversationTime>
                    {roundFormatDate(new Date(item.createdAt))}
                  </ConversationTime>
                  <ConversationSubTitle>{item.message}</ConversationSubTitle>
                  {item.unreadMessage ? (
                    <ConversationBadge>{item.unreadMessage}</ConversationBadge>
                  ) : null}
                </ConversationListItemWrapper>
              );
            })
          : null}
      </MarginTop30Wrapper>
    </ListWrapper>
  );
};

export default ConversationsList;
