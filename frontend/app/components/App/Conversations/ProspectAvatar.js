import React from 'react';

import styled from 'styled-components';

const ProspectAvatarWrapper = styled.div`
  width: 40px;
  height: 40px;
  user-select: none;
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

const colors = [
  '#49F2CA',
  '#E36CDC',
  '#00B3FF',
  '#FF977C',
  '#87F8A9',
  '#00DCF9',
];
const ProspectAvatar = props => {
  const name = props.firstName.charAt(0) + props.lastName.charAt(0);
  let index = 0;
  for (let i = 0; i < props.uid.length; i++) {
    index = (index * 16 + props.uid.charCodeAt(i)) % 6;
  }

  const style = {
    width: props.size,
    height: props.size,
    backgroundColor: colors[index],
  };
  
  return <ProspectAvatarWrapper style={style}>{name}</ProspectAvatarWrapper>;
};

export default ProspectAvatar;
