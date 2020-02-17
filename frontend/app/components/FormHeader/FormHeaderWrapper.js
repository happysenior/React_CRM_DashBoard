import styled from 'styled-components';
import { TABLET_VIEWPORT_WIDTH } from 'utils/rwd';

const FormHeaderWrapper = styled.header`
  width: 100%;
  height: 65px;
  padding: 10px;
  text-align: center;
  @media screen and (min-width: ${TABLET_VIEWPORT_WIDTH}) {
    padding: 0 40px;
  }
`;

export default FormHeaderWrapper;
