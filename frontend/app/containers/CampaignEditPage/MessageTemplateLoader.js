import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';
import './index.scss';

const templates = [
  {
    title: 'SMS Day 1 Florida',
    content: `Hey {{prospectFirstName}}. This is Karen with Premiere Metro Realty Corp. That was me that just called you. I've been trying to get ahold of you about your property at %property_address%. I would like to offer a REAL cash offer for your house. Please call me back when you can. Thanks!`,
  },
  {
    title: 'Day 1 Buyer Lead',
    content: `Hey {{prospectFirstName}}! This is {{myName}} with Dream Builders Home Group. Thanks for reaching out about our list of homes for sale! Please check your inbox for that list.	`,
  },
];

const MessageTemplateLoader = props => {

  const useTemplate = index => {
    props.updateEventProperty('content', templates[index].content);
  };
  return (
    <Modal
      isOpen={props.isOpen}
      toggle={props.toggleTemplateModal}
      centered={true}
      size="lg"
    >
      <ModalHeader toggle={props.toggleTemplateModal}>
        Select content from your messages
      </ModalHeader>
      <ModalBody>
        <div className="d-flex flex-column">
          {templates.map((x, k) => {
            return (
              <div className="template" key={`template_${k}`}>
                <div className="template-title">{x.title}</div>
                <div>
                  <div>{x.content}</div>
                  <Button
                    style={{ float: 'right' }}
                    onClick={() => {
                      useTemplate(k);
                    }}
                  >
                    Use
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default MessageTemplateLoader;
