import React, { useState, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import saga from 'containers/ImportCSVPage/saga';
import reducer from 'containers/ImportCSVPage/reducer';

import SelectCSV from './SelectCSV';
import MapColumns from './MapColumns';

const key = 'importCSVPage';

const ImportCSVForm = () => {
  const [step, setStep] = useState(0);

  const dispatch = useDispatch();
  useInjectReducer({ key, reducer });

  useInjectSaga({ key, saga });

  const goNextStep = () => {
    setStep(prevState => prevState + 1);
  };
  console.log(step);
  return (
    <div className="import-csv">
      <div className="back"></div>
      <div className="pt-5">
        {step === 0 ? <SelectCSV goNextStep={goNextStep} /> : <MapColumns />}
      </div>
    </div>
  );
};

export default ImportCSVForm;
