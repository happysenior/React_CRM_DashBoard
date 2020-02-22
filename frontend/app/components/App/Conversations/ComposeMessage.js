import React from 'react';
import ComposeMessageWrapper from './ComposeMessageWrapper';
import ReactTooltip from 'react-tooltip';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import styled from 'styled-components';
import './index.scss';
import { PRIMARY_BLUE_DARK } from 'utils/colors';
import { Button } from 'reactstrap';

const TextAreaWrapper = styled.div`
  width: 100%;
`;

const styles = {
  primary: {
    background: `${PRIMARY_BLUE_DARK}`,
  },
};
const ComposeMessage = props => {
  return (
    <ComposeMessageWrapper>
      <ReactTooltip>Share booking link</ReactTooltip>
      <TextAreaWrapper>
        <div className="compose-message-tab">
          <div className="tab-selected">Email</div>
          <div>
            <div className="tab-no-selected">Text</div>
          </div>
        </div>
        <textarea
          placeholder="Write a message to AHMAD"
          rows="3"
          className="message-area"
          spellcheck="false"
        ></textarea>
        <div>
          <div>
            <div className="ComposeMessage__CalendarIconWrapper-j7mnxg-6 fDojJp">
              <CalendarTodayIcon />
            </div>
          </div>
        </div>
      </TextAreaWrapper>
      <Button style={styles.primary} onClick={() => {}}>
        sendas
      </Button>
    </ComposeMessageWrapper>
  );
};

export default ComposeMessage;
