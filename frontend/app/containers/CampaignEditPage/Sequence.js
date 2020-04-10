import React, { Fragment } from 'react';
import CreateSequence from './CreateSequence';
import SequenceEdit from './SequenceEdit';

const Sequence = props => {
  return props.sequence ? (
    <SequenceEdit sequence={props.sequence} addDay={props.addDay} />
  ) : (
    <CreateSequence createSequence={props.createSequence} />
  );
};

export default Sequence;
