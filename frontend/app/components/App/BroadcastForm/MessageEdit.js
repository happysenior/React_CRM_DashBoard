import React, { useState } from 'react';
import './index.scss';
import { Button } from 'reactstrap';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const templateWords = [
  '{{FirstName}}',
  '{{MyFullName}}',
  '{{MyFirstName}}',
  '{{MyPhoneNumber}}',
  '{{Signature}}',
];

const templateWordDescriptions = [
  ` - Prospect's first name`,
  ` - You full name`,
  ` - Your first name`,
  ` - Your system phone number`,
  ` - Account signature. (edit at account settings)`,
  ` - Account signature. (edit at account settings)`,
];

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

  const paste = event => {
    event.persist();
    setState(prevState => {
      return {
        ...prevState,
        message: `${prevState.message}${event.target.innerText}`,
      };
    });
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
          You can double click to replace with user information on the subject
          and body:
        </div>
        <div className="h6 mb-3">
          You can copy and paste the following string to replace with user
          information on the subject and body:
        </div>

        {templateWords.map((x, k) => {
          return (
            <div className="d-flex mb-2" key={`template_word_${k}`}>
              <div className="code" onDoubleClick={paste}>
                {x}
              </div>
              <div>{templateWordDescriptions[k]}</div>
            </div>
          );
        })}
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
