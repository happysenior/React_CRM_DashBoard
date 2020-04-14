import React, { Fragment } from 'react';
import CreateSequence from './CreateSequence';
import SequenceEdit from './SequenceEdit';

const Sequence = props => {
  return props.sequence ? (
    <SequenceEdit
      sequence={props.sequence}
      addDay={props.addDay}
      selectDay={props.selectDay}
      deleteDay={props.deleteDay}
      selectedDay={props.selectedDay}
      changeRunDay={props.changeRunDay}
      changeRunTime={props.changeRunTime}
      addEvent={props.addEvent}
      deleteEvent={props.deleteEvent}
      selectEvent={props.selectEvent}
      selectedEvent={props.selectedEvent}
      updateEventProperty={props.updateEventProperty}
      setImage={props.setImage}
      saveSequence={props.saveSequence}
      loadCampaign={props.loadCampaign}
    />
  ) : (
    <CreateSequence createSequence={props.createSequence} />
  );
};

export default Sequence;
