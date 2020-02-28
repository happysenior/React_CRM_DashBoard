import React, { useState } from 'react';
import './index.scss';
import { Button } from 'reactstrap';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const MessageEdit = props => {
  const [state, setState] = useState({
    method: 'text',
    message: '',
  });

  const handleSend = () => {
    if (state.message != '') {
      props.broadcast(state.message, state.method);
    }
  };

  return (
    <div className="broadcast-confirm">
      <div className="broadcast-confirm-title">Broadcast Message</div>
      <div className="d-flex justify-content-start mb-5">
        <Button outline className="mr-3">
          <MailOutlineIcon />
          Email
        </Button>
        <Button outline className="select-method ">
          <TextsmsOutlinedIcon />
          Text message
        </Button>
      </div>
      <div className="broadcast-confirm-content">
        <div className="h6 mb-3">
          You can copy and paste the following string to replace with user
          information on the subject and body:
        </div>
        <div className="d-flex mb-2">
          <div className="code">
            {'{{'} FirstName {'}}'} -
          </div>
          <div>Prospect's first name</div>
        </div>
        <div className="d-flex mb-2">
          <div className="code">
            {'{{'} MyFullName {'}}'} -
          </div>
          <div>You full name</div>
        </div>
        <div className="d-flex mb-2">
          <div className="code">
            {'{{'} MyFirstName {'}}'} -
          </div>
          <div>Your first name</div>
        </div>
        <div className="d-flex mb-2">
          <div className="code">
            {'{{'} MyPhoneNumber {'}}'} -
          </div>
          <div>Your system phone number</div>
        </div>
        <div className="d-flex mb-2">
          <div className="code">
            {'{{'} Signature {'}}'} -
          </div>
          <div>Account signature. (edit at account settings)</div>
        </div>
      </div>
      <div className="d-flex flex-column mb-5">
        <div className="broadcast-message-title">Message</div>
        <textarea
          value={state.message}
          onChange={e => {
            setState({ ...state, message: e.target.value });
          }}
          className="broadcast-message"
        ></textarea>
      </div>
      <div className="d-flex justify-content-end">
        <Button outline className="broadcast-goback" onClick={props.goProspect}>
          Cancel
        </Button>
        <Button className="broadcast-continue" onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default MessageEdit;
