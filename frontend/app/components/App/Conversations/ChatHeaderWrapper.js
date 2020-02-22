import styled from 'styled-components';

const ChatHeaderWrapper = styled.div`
  background-color: rgb(255, 255, 255);
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  position: sticky;
  top: 0px;
  z-index: 10;
  padding: 20px;
  font-weight: 600;
  border-bottom: 1px solid rgb(229, 231, 236);
`;

export default ChatHeaderWrapper;
