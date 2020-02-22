import React from 'react';

import styled from 'styled-components';

const ProspectAvatarWrapper = styled.div`
  width: 40px;
  height: 40px;
  user-select: none;
  background-color: rgb(73, 242, 202);
  font-size: 14px;
  font-weight: 600;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  color: rgb(255, 255, 255);
  border-radius: 50%;
`;

const ProspectAvatar = props => {
  const style = {
    width: props.size,
    height: props.size,
    backgroundColor: props.color,
  };
  return (
    <ProspectAvatarWrapper style={style}>{props.name}</ProspectAvatarWrapper>
  );
};

export default ProspectAvatar;
