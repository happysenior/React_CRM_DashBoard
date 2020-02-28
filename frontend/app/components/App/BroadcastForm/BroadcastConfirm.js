import React, { useState } from 'react';
import { PRIMARY_BLUE_DARK } from 'utils/colors';
import { Button } from 'reactstrap';
import './index.scss';

export default function BroadcastForm(props) {
  const prospectsNum = 312;
  return (
    <div className="broadcast-confirm">
      <div className="broadcast-confirm-title">Send Broadcast</div>
      <div className="broadcast-confirm-content">
        You are about to send a broadcast message to <span>{prospectsNum}</span>
        prospects. In the next screen you will be able to compose the message.
        Do you wish to proceed?
      </div>
      <div className="d-flex justify-content-end">
        <Button outline className="broadcast-goback" onClick={props.goProspect}>
          GO BACK
        </Button>
        <Button className="broadcast-continue" onClick={props.goNextStep}>
          CONTINUE
        </Button>
      </div>
    </div>
  );
}
