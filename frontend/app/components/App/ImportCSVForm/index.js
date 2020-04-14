import React, { useState } from 'react';

import SelectCSV from './SelectCSV';
import MapColumns from './MapColumns';

const ImportCSVForm = () => {
  const [step, setStep] = useState(0);
  const [csvFile, setCsvFile] = useState(null);
  const [campaign, setCampaign] = useState('');
  const goNextStep = () => {
    setStep(prevState => prevState + 1);
  };
  return (
    <div className="import-csv">
      <div className="back"></div>
      <div className="pt-5">
        {step === 0 ? (
          <SelectCSV
            goNextStep={goNextStep}
            setCsvFile={setCsvFile}
            setCampaign={setCampaign}
          />
        ) : (
          <MapColumns csvFile={csvFile} campaign={campaign} />
        )}
      </div>
    </div>
  );
};

export default ImportCSVForm;
