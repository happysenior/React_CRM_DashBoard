import React from 'react';
import styled from 'styled-components';

import ProspectProfile from './ProspectProfile';

const ProspectInfoWrapper = styled.div`
  width: 320px;
  position: relative;
  border-left: 1px solid rgb(229, 231, 236);
  overflow: scroll;
  background-color: white;
`;

const ProspectInfoHeader = styled.div`
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
  border-bottom: 1px solid rgb(229, 231, 236);
  font-weight: 500;
`;

const ProspectSectionWrapper = styled.div`
  padding: 20px;
  border-bottom: 1px solid rgb(229, 231, 236);
`;

export default function ProspectInfo(props) {
  return (
    <ProspectInfoWrapper>
      <ProspectInfoHeader>Prospect Information</ProspectInfoHeader>
      <div>
        <ProspectSectionWrapper>
          <ProspectProfile
            prospect={props.prospect}
            changeProspectProperty={props.changeProspectProperty}
            changeLocalProspectProperty={props.changeLocalProspectProperty}
          />
        </ProspectSectionWrapper>
      </div>
    </ProspectInfoWrapper>
  );
}
