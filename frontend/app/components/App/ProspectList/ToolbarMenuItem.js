import React from 'react';
import styled from 'styled-components';
import { PRIMARY_DARK, PRIMARY_BORDER_GREY } from 'utils/colors';

const ItemContainer = styled.div`
  padding: 7px 15px 7px 24px;
  font-size: 18px;
  height: 46px;
`;

const Title = styled.div`
  color: ${PRIMARY_DARK};
  font-size: 0.875rem;
  line-height: 1.3125rem;
  font-weight: 500;
`;

const Help = styled.div`
  color: ${PRIMARY_BORDER_GREY};
  font-size: 0.75rem;
  line-height: 1.375rem;
`;

export default function ToolbarMenuItem(props) {
  return (
    <ItemContainer>
      <Title>{props.title}</Title>
      <Help>{props.help}</Help>
    </ItemContainer>
  );
}
