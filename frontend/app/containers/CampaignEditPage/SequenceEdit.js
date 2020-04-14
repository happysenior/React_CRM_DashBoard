import React, { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { Button, ButtonGroup } from 'reactstrap';
import EmailIcon from '@material-ui/icons/Email';
import CallIcon from '@material-ui/icons/Call';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Days from 'components/App/Sequences/Days';
import Events from 'components/App/Sequences/Events';
import EventDetail from 'components/App/Sequences/EventDetail';
import MessageTemplateLoader from './MessageTemplateLoader';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const IOSSwitch = withStyles(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const SequenceEdit = props => {
  const classes = useStyles();

  const [templateModalOpen, setTemplateModalOpen] = useState(false);

  const toggleTemplateModal = () => {
    setTemplateModalOpen(prevState => {
      return !prevState;
    });
  };

  let history = useHistory();

  const goSetting = sequenceId => {
    history.push(`/sequences/${sequenceId}`);
  };

  return (
    <div className="row pt-3">
      <div className="col-md-6 d-flex">
        <h2 data-sequence="1220" className="sequence sequence-title">
          Three
        </h2>
        <IOSSwitch checked={true} onChange={() => {}} name="checkedB" />
      </div>
      <div className="col-md-6">
        <div className="text-right pt-4">
          {props.sequence ? (
            <Button
              outline
              color="secondary"
              className="campaign-btn"
              size="sm"
              onClick={() => {
                goSetting(props.sequence._id);
              }}
            >
              <SettingsIcon fontSize="small" />
              <span>Sequence settings</span>
            </Button>
          ) : null}
        </div>
      </div>
      <div className="col-md-12 mb-4">
        {/* Sequence Time Zone: <strong>America/New York</strong> - Current time
        <em>Apr 6th 2020, 12:20 pm</em> */}
      </div>
      <Days
        addDay={props.addDay}
        deleteDay={props.deleteDay}
        selectDay={props.selectDay}
        days={props.sequence.days}
        selectedDay={props.selectedDay}
      />
      <Events
        selectedDay={props.selectedDay}
        sequence={props.sequence}
        addEvent={props.addEvent}
        deleteEvent={props.deleteEvent}
        selectEvent={props.selectEvent}
        changeRunDay={props.changeRunDay}
        changeRunTime={props.changeRunTime}
        selectedEvent={props.selectedEvent}
      />

      <EventDetail
        sequence={props.sequence}
        selectedDay={props.selectedDay}
        selectedEvent={props.selectedEvent}
        updateEventProperty={props.updateEventProperty}
        toggleTemplateModal={toggleTemplateModal}
        setImage={props.setImage}
        saveSequence={props.saveSequence}
        loadCampaign={props.loadCampaign}
      />
      <MessageTemplateLoader
        updateEventProperty={props.updateEventProperty}
        isOpen={templateModalOpen}
        toggleTemplateModal={toggleTemplateModal}
      />
    </div>
  );
};

export default SequenceEdit;
