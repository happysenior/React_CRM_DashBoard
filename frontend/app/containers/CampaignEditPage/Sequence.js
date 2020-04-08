import React, { Fragment } from 'react';
import CreateSequence from './CreateSequence';
import SequenceEdit from './SequenceEdit';

const Sequence = props => {
  return props.sequence ? <CreateSequence /> : <SequenceEdit />;
};

export default Sequence;
