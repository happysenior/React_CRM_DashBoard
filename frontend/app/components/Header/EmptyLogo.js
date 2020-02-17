import styled from 'styled-components';
import { PRIMARY_BLUE_DARK } from 'utils/colors';

const EmptyLogo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  margin-right: 10px;
  background-color: ${PRIMARY_BLUE_DARK};
  &:hover {
    cursor: pointer;
  }
`;

export default EmptyLogo;
