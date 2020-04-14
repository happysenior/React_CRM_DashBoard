import React from 'react';
import VoicemailEdit from './VoicemailEdit';
import SmsEdit from './SmsEdit';
import EmailEdit from './EmailEdit';

const EventDetail = props => {
  const event =
    props.selectedDay != null && props.selectedEvent != null
      ? props.sequence.days[props.selectedDay].events[props.selectedEvent]
      : null;

  return (
    <React.Fragment>
      <div className="col-md-5">
        {event == null ? (
          <div className="missing-events">
            When you create at least one event you will be able to set it up
            here.
          </div>
        ) : null}
        {event && event.type == 'voicemail' ? (
          <VoicemailEdit
            event={event}
            updateEventProperty={props.updateEventProperty}
            saveSequence={props.saveSequence}
            setEventImage={props.setImage}
            loadCampaign={props.loadCampaign}
          />
        ) : null}
        {event && event.type == 'sms' ? (
          <SmsEdit
            event={event}
            updateEventProperty={props.updateEventProperty}
            toggleTemplateModal={props.toggleTemplateModal}
            setEventImage={props.setImage}
            saveSequence={props.saveSequence}
            loadCampaign={props.loadCampaign}
          />
        ) : null}
        {event && event.type == 'email' ? (
          <EmailEdit
            event={event}
            updateEventProperty={props.updateEventProperty}
          />
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default EventDetail;
