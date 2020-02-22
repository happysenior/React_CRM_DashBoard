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
  background-color: rgba(12, 119, 248, 0.1);
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

const ConversationsList = props => {
  const name = 'AC';
  return (
    <ListWrapper>
      <MarginTop30Wrapper>
        <ConversationListItemWrapper>
          <ProspectAvatar name={name} size={'40px'} color={'#3399CC'} />
          <ConversationTitle>Adam becker</ConversationTitle>
          <ConversationTime>12:30 AM</ConversationTime>
          <ConversationSubTitle>
            https://b.contactsmarter.com/p/QSRzJKtyy5Pccu2EBpnQPc
          </ConversationSubTitle>
        </ConversationListItemWrapper>
      </MarginTop30Wrapper>
    </ListWrapper>
  );
};

export default ConversationsList;
