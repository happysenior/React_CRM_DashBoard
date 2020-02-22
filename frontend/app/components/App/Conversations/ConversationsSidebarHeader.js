import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  position: absolute;
  background-color: white;
  width: 358px;
  z-index: 10;
  border-bottom: 1px solid rgb(229, 231, 236);
`;

const ContentWrapper = styled.div`
  font-size: 21px;
  line-height: 31px;
  font-weight: 500;
  color: rgb(53, 65, 71);
  padding: 17.5px 10px;
`;

const ConversationsSidebarHeader = () => {
  return (
    <HeaderWrapper>
      <ContentWrapper>Conversations</ContentWrapper>
    </HeaderWrapper>
  );
};

export default ConversationsSidebarHeader;
