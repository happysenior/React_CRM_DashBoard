import React from 'react';
import './index.scss';

const colors = [
  '#49F2CA',
  '#E36CDC',
  '#00B3FF',
  '#FF977C',
  '#87F8A9',
  '#00DCF9',
];

const ConversationMessages = props => {
  console.log('props chat, prospect');
  console.log(props.chat);
  console.log(props.prospect);
  return (
    <div>
      {props.chat && props.prospect
        ? props.chat.map((item, index) => {
            const name =
              props.prospect.profile.firstName.charAt(0) +
              props.prospect.profile.lastName.charAt(0);
            let colorIndex = 0;
            for (let i = 0; i < props.prospect.profile._id.length; i++) {
              colorIndex =
                (colorIndex * 16 + props.prospect.profile._id.charCodeAt(i)) %
                6;
            }

            if (item.outgoing) {
              return (
                <div className="outgoing" key={item._id}>
                  <div className="message">{item.message}</div>
                  <div className="message-date">
                    via {item.method}
                    <span> {item.createdAt}</span>
                  </div>
                  <div className="avatar">EE</div>
                </div>
              );
            } else {
              return (
                <div className="incoming">
                  <div className="message">{item.message}</div>
                  <div className="message-date">
                    via {item.method}
                    <span> {item.createdAt}</span>
                  </div>
                  <div
                    className="avatar"
                    style={{ backgroundColor: colors[colorIndex] }}
                  >
                    {name}
                  </div>
                </div>
              );
            }
          })
        : null}
    </div>
  );
};

export default ConversationMessages;
