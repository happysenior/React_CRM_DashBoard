import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';

import BroadcastConfirm from './BroadcastConfirm';
import MessageEdit from './MessageEdit';
import {
  goProspectAction,
  broadcastAction,
} from 'containers/BroadcastPage/actions';

import saga from 'containers/BroadcastPage/saga';

const BroadcastForm = () => {
  const [step, setStep] = useState(1);

  const dispatch = useDispatch();

  const goNextStep = () => {
    setStep(prevState => prevState + 1);
  };

  const goProspect = () => {
    dispatch(goProspectAction());
  };

  const broadcast = (message, method) => {
    dispatch(broadcastAction(message, method));
  };

  useInjectSaga({ key: 'broadcastPage', saga });

  return (
    <div className="import-csv">
      <div className="back"></div>
      <div className="pt-5 d-flex justify-content-center">
        {step === 0 ? (
          <BroadcastConfirm goNextStep={goNextStep} goProspect={goProspect} />
        ) : (
          <MessageEdit goProspect={goProspect} broadcast={broadcast} />
        )}
      </div>
    </div>
  );
};

export default BroadcastForm;
