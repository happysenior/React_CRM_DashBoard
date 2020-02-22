import React from 'react';
import './index.scss';

const ConversationMessages = props => {
  return (
    <div>
      <div className="outgoing">
        <div className="message">Hi there</div>
        <div className="message-date">
          via text
          <span> Feb 19, 2020 at 3:33 PM</span>
        </div>
        <div class="avatar">EE</div>
      </div>
      <div className="incoming">
        <div className="message">Hi</div>
        <div class="message-date">
          via text
          <span> Feb 19, 2020 at 3:38 PM</span>
        </div>
        <div className="avatar">AF</div>
      </div>
    </div>
  );
};

export default ConversationMessages;
