import React, { useState } from 'react';
import ComposeMessageWrapper from './ComposeMessageWrapper';
import ReactTooltip from 'react-tooltip';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import styled from 'styled-components';
import './index.scss';
import { PRIMARY_BLUE_DARK } from 'utils/colors';
import { Button } from 'reactstrap';
import { useDispatch } from 'react-redux';

const TextAreaWrapper = styled.div`
  width: 100%;
`;

const styles = {
  primary: {
    background: `${PRIMARY_BLUE_DARK}`,
    whiteSpace: 'nowrap',
  },
};
const ComposeMessage = props => {
  const [state, setState] = useState({
    message: '',
    method: 'text',
    emailCls: 'tab-no-selected',
    textCls: 'tab-selected',
  });

  const selectEmail = () => {
    setState({
      ...state,
      method: 'email',
      emailCls: 'tab-selected',
      textCls: 'tab-no-selected',
    });
  };

  const selectText = () => {
    setState({
      ...state,
      method: 'text',
      emailCls: 'tab-no-selected',
      textCls: 'tab-selected',
    });
  };

  const handleChange = e => {
    setState({ ...state, message: e.target.value });
  };

  const handleSendMessage = e => {
    props.sendMessage(state.message);
  };

  return (
    <ComposeMessageWrapper>
      <ReactTooltip>Share booking link</ReactTooltip>
      <TextAreaWrapper>
        <div className="compose-message-tab">
          <div className={state.emailCls} onClick={selectEmail}>
            Email
          </div>
          <div>
            <div className={state.textCls} onClick={selectText}>
              Text
            </div>
          </div>
        </div>
        <textarea
          placeholder="Write a message"
          rows="3"
          className="message-area"
          spellCheck="false"
          onChange={handleChange}
        ></textarea>
        <div>
          <div>
            <div className="ComposeMessage__CalendarIconWrapper-j7mnxg-6 fDojJp">
              <CalendarTodayIcon />
            </div>
          </div>
        </div>
      </TextAreaWrapper>
      <Button style={styles.primary} onClick={handleSendMessage}>
        Send
      </Button>
    </ComposeMessageWrapper>
  );
};

export default ComposeMessage;
